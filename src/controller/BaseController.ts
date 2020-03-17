import {Context} from "koa";

class BaseController {

    model;

    constructor({model}) {
        this.model = model
    }

    async get(ctx: Context) {
        let {id} = ctx.params;
        const block = await this.model.findByPk(id);
        if (!block) throw new Error('block not found');
        ctx.rest(block);
    }

    async list(ctx: Context) {
        let newVar = await this.model.findAndCountAll(Object.assign({limit: 10}, ctx.request.body));
        ctx.rest({
            ...ctx.request.body,
            ...newVar
        })
    }
}

export default BaseController;
