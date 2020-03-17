import {getApi, REDIS} from "../../connect";
import {REDIS_KEY} from "../../constant";
import {logger} from "../../utils";

export default async function () {
    const api = await getApi();
    return await api.rpc.chain.subscribeFinalizedHeads((header) => {
        const number = header.number.toNumber();
        logger.info('FinalizedHeadsNumber', number);
        REDIS.SET_NUMBER(REDIS_KEY.FINALIZED_NUMBER, number);
    });
}
