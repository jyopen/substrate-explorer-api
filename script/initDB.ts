import {sync} from "../src/database";


sync(true)
    .then(() => console.log('数据库同步成功'))
    .then(() => {
    })
    .catch((e) => console.log('数据库同步失败', e))
    .finally(() => {
        process.exit(0)
    });
