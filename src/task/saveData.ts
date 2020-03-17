import {logger, sleep} from "../utils";
import {SingleData} from "./types";
import {REDIS, sequelize} from "../connect";
import {Block, Event, Log, Transaction} from "../database";
import {REDIS_KEY} from "../constant";

export async function saveDataTask() {
    const localNumber = await Block.max('number');
    const bestNumber = await REDIS.GET_NUMBER(REDIS_KEY.BEST_NUMBER);
    if (!bestNumber || localNumber >= bestNumber) {
        await sleep(100);
    } else {
        const index = isNaN(localNumber) ? 0 : localNumber + 1;
        await saveSingleBlockData(index);
    }
    saveDataTask();
}

export async function saveSingleBlockData(blockNumber) {
    const cacheKey = `${REDIS_KEY.BLOCK_DATA}-${blockNumber}`;
    const blockData = <SingleData>(JSON.parse(await REDIS.GET(cacheKey)));
    if (!blockData) return sleep();
    const {block, events, transactions, logs} = blockData;
    const _time = Date.now();
    const transaction = await sequelize.transaction();
    try {
        await Promise.all([
            Block.create(block, {transaction}).catch((e) => Promise.reject('Block:插入失败' + e)),
            Promise.all(events.map(t => Event.create(t, {transaction}).catch((e) => Promise.reject('Event:插入失败' + e)))),
            Promise.all(transactions.map(t => Transaction.create(t, {transaction}).catch((e) => Promise.reject('Extrinsic:插入失败' + e)))),
            Promise.all(logs.map(t => Log.create(t, {transaction}).catch((e) => Promise.reject('Log:插入失败' + e)))),
            // createMetaData(metadata, blockNumber, transaction)
        ]);
        await transaction.commit();
        await REDIS.DEL(cacheKey);
    } catch (e) {
        await transaction.rollback();
        logger.error('保存block失败', blockNumber, e);
        throw new Error(e)
    }
    logger.info('saveBlock:', blockNumber, Date.now() - _time);
}
