import {mapperEvents, mapperLogs, mapperTransactions} from "../mapper/dataMapper";
import {Block} from "../database";
import {HeaderExtended} from "@polkadot/api-derive";
import {EventRecord, SignedBlock} from "@polkadot/types/interfaces";
import {logger, sleep} from "../utils";
import {getApi, REDIS} from "../connect";
import {REDIS_KEY} from "../constant";

const FETCH_SIZE = 200;

async function getBlockData(blockNumber: number): Promise<[string, HeaderExtended, EventRecord[], SignedBlock]> {
    const api = await getApi();
    const hash = await api.rpc.chain.getBlockHash(blockNumber);
    return Promise.all([
        Promise.resolve(hash.toString()),
        api.derive.chain.getHeader(hash),
        api.query.system.events.at(hash),
        api.rpc.chain.getBlock(hash)
    ])
}


/**
 * 死循环获取链上区块的数据
 * @returns {Promise<void>}
 */
export async function fetchDataTask() {
    const bestNumber = await REDIS.GET_NUMBER(REDIS_KEY.BEST_NUMBER);
    const localNumber = await Block.max('number');
    if (localNumber >= bestNumber) {
        await sleep();
    } else {
        const index = isNaN(localNumber) ? 0 : localNumber + 1;
        if (bestNumber - 5 > index) {
            await batchFetchData(index, Math.min(index + FETCH_SIZE, bestNumber));
        } else {
            await fetchSingleBlockData(index)
        }
    }
    setTimeout(() => fetchDataTask(), 200)
}

async function batchFetchData(start, end) {
    const array = [];
    for (let i = start; i <= end; i += 1) {
        array.push(i);
    }
    const _time = Date.now();
    await Promise.all(array.map(number => fetchSingleBlockData(number)));
    logger.info('batchFetchData:' + start + '-' + end, Date.now() - _time);
}


export async function fetchSingleBlockData(blockNumber: number) {
    const cacheKey = `${REDIS_KEY.BLOCK_DATA}-${blockNumber}`;
    if (await REDIS.EXISTS(cacheKey)) {
        return;
    }
    const _time = Date.now();
    try {
        const [hash, _header, _events, block] = await getBlockData(blockNumber);
        const header = block.block.header;
        const extrinsics = block.block.extrinsics;
        const logs = mapperLogs(header.digest.logs, blockNumber);
        const events = mapperEvents(_events, extrinsics, blockNumber);
        const transactions = await mapperTransactions(extrinsics, events, blockNumber);
        const timestampTx = transactions.filter(t => t.section === 'timestamp' && t.method === 'set')[0];
        const timestamp = timestampTx ? JSON.parse(timestampTx.args)[0].value : 0;
        events.forEach(t => t.timestamp = timestamp);
        transactions.forEach(t => t.timestamp = timestamp);
        logs.forEach(t => t.timestamp = timestamp);
        const singleBlockData = {
            block: Block.build({
                number: blockNumber,
                hash,
                stateRoot: header.stateRoot.toString(),
                extrinsicsRoot: header.extrinsicsRoot.toString(),
                parentHash: header.parentHash.toString(),
                author: _header.author ? _header.author.toString() : null,
                logCount: logs.length,
                justification: block.justification.toString(),
                eventCount: events.length,
                extrinsicCount: transactions.length,
                inherentsCount: transactions.filter(t => !t.isSigned).length,
                transactionCount: transactions.filter(t => t.isSigned).length,
                timestamp,
                size: block.block.encodedLength
            }),
            events,
            transactions,
            logs,
        };
        await REDIS.SET(cacheKey, JSON.stringify(singleBlockData));
        const max = await REDIS.GET_NUMBER(REDIS_KEY.MAX_BLOCK);
        if (blockNumber > max) {
            await REDIS.SET_NUMBER(REDIS_KEY.MAX_BLOCK, blockNumber);
        }
    } catch (e) {
        logger.error('fetch block error:', blockNumber, e);
    }
    logger.info('fetchBlock:' + blockNumber, Date.now() - _time)
}
