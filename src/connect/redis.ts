import redis from 'redis'

const {promisify} = require("util");
require('dotenv').config();
const NODE_NAME = process.env.NODE_NAME;
const client = redis.createClient({prefix: `substrate-${NODE_NAME}`});
const GET = promisify(client.GET).bind(client);
const SET = promisify(client.SET).bind(client);
const HGET = promisify(client.HGET).bind(client);
const HGETALL = promisify(client.HGETALL).bind(client);
const HMSET = promisify(client.HMSET).bind(client);
const DEL = promisify(client.DEL).bind(client);
const EXISTS = promisify(client.EXISTS).bind(client);

type Client = {
    GET: (key: string) => Promise<string | null>,
    GET_NUMBER: (key: string) => Promise<number>,
    SET_NUMBER: (key: string, value: number | string) => Promise<string>,
    SET: (key: string, value: string) => Promise<string>,
    DEL: (key: string) => Promise<number>,
    EXISTS: (key: string) => Promise<boolean>,
}
const REDIS: Client = {
    GET,
    GET_NUMBER: (key) => GET(key).then(res => res ? parseInt(res) : 0),
    SET_NUMBER: (key, value) => SET(key, String(value)),
    SET,
    DEL,
    EXISTS: (key: string) => EXISTS(key).then(res => res === 1)
}

export default REDIS;
