import Koa from "koa";
import router from "./src/router";
import {httpLog} from "./src/utils";

const app = new Koa();
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3001);
httpLog.info('服务进程开启', 3001)
