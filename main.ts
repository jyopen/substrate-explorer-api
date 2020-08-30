import Koa from "koa";
import koaBody from "koa-body";
import router from "./src/router";
import {httpLog} from "./src/utils";
import applyGraphql from './src/graphql'
// import './src/task'

const app = new Koa();
const PORT = 3111;
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());
applyGraphql(app, PORT);
httpLog.info('服务进程开启', PORT)
