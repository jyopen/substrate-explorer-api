import {sequelize} from "../src/connect";
import "../src/database"
import {logger} from "../src/utils";


sequelize.sync({force: true})
    .then(() => logger.info('数据库同步成功'))
    .then(() => {
    })
    .catch((e: Error) => logger.error('数据库同步失败', e))
    .finally(() => {
        process.exit(0)
    });
