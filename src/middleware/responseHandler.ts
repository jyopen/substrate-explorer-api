export default async function responseHandler(ctx, next) {
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
        const status = e.status || 200;
        ctx.body = {
            code: e.code || 1,
            msg: e.message || 'Internal Server Error'
        };
        ctx.status = status;
    }
}
