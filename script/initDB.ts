import {sync} from "../src/database";
import {logger} from "../src/utils";


sync(true)
    .then(() => logger.info('数据库同步成功'))
    .then(() => {
    })
    .catch((e) => logger.error('数据库同步失败', e))
    .finally(() => {
        process.exit(0)
    });
