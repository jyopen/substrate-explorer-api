import {httpLog} from "../utils";
import {Context} from "koa";

export default async function responseHandler(ctx: Context, next) {
    ctx.rest = function (data) {
        ctx.body = {
            code: 0,
            msg: 'success',
            data
        }
    }

    try {
        await next();
    } catch (e) {
        httpLog.error(ctx.method, ctx.url, ctx.ip, ctx.request.query, ctx.request.body, e);
        const status = e.status || 200;
        ctx.body = {
            code: e.code || 1,
            msg: e.message || 'Internal Server Error'
        };
        ctx.status = status;
    }
}
