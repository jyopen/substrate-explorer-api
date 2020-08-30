import {Sequelize} from 'sequelize';

require('dotenv').config();
const {DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, NODE_NAME} = process.env;
export default new Sequelize(`${DB_NAME!}`, DB_USERNAME!, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
})
