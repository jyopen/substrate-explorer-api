import {Transfer} from "../database";
import BaseController from "./BaseController";
import {Context} from "koa";
import {Op} from "sequelize";

class TransferController extends BaseController {
    constructor() {
        super({model: Transfer})
    }

    async list(ctx: Context) {
        let newVar = await this.model.findAndCountAll(Object.assign({
            limit: 10,
            where: {[Op.or]: [{from: ctx.request.body.address}, {to: ctx.request.body.address}]}
        }, ctx.request.body));
        ctx.rest({
            ...ctx.request.body,
            ...newVar
        })
    }

}

export default new TransferController();
