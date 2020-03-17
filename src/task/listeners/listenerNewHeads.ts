import {getApi, REDIS} from "../../connect";
import {REDIS_KEY} from "../../constant";
import {logger} from "../../utils";

export default async function () {
    const api = await getApi();
    return await api.rpc.chain.subscribeNewHeads((header) => {
        const number = header.number.toNumber();
        logger.info('NewHeadsNumber', number);
        REDIS.SET_NUMBER(REDIS_KEY.BEST_NUMBER, number);
    });
}
