import {Transfer} from "../database";
import BaseController from "./BaseController";
import {Context} from "koa";
import {Op} from "sequelize";

class TransferController extends BaseController<Transfer> {
    constructor() {
        super({model: Transfer})
    }

    async list(ctx: Context) {
        ctx.rest(await this.model.findAndCountAll(Object.assign({
            limit: 10,
            where: {[Op.or]: [{from: ctx.request.body.address}, {to: ctx.request.body.address}]}
        }, ctx.request.body)))
    }
}

export default new TransferController();
