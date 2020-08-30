import {Context} from "koa";
import {Model, ModelCtor} from "sequelize";


class BaseController<M extends Model> {

    protected model: ModelCtor<M>;

    constructor({model}: { model: ModelCtor<M> }) {
        this.model = model
    }

    async get(ctx: Context) {
        let {id} = ctx.params;
        const block = await this.model.findByPk(id);
        if (!block) throw new Error('block not found');
        ctx.rest(block);
    }

    async list(ctx: Context) {
        ctx.rest(await this.model.findAndCountAll(Object.assign({limit: 10}, ctx.request.body)))
    }
}

export default BaseController;
