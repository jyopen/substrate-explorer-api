import {Block} from "../database";
import BaseController from "./BaseController";
import {Context} from "koa";
import {REDIS} from "../connect";
import {REDIS_KEY} from "../constant";

class BlockController extends BaseController<Block> {
    constructor() {
        super({model: Block})
    }

    async list(ctx: Context) {
        const finalizedNumber = await REDIS.GET_NUMBER(REDIS_KEY.FINALIZED_NUMBER);
        const newVar = await Block.findAndCountAll<Block>(Object.assign({limit: 10}, ctx.request.body));
        ctx.rest({
            count: newVar.count,
            rows: (newVar.rows as Block[]).map(block => ({
                ...block.toJSON(),
                finalized: block.number <= finalizedNumber
            }))
        })
    }
}

export default new BlockController();
