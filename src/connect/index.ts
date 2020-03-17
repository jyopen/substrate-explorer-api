import ApiPromise from "@polkadot/api/promise";
import {createApi} from "./createApi";
import sequelize from './sequelize'
import REDIS from './redis'

let api: Promise<ApiPromise>;


export function getApi(): Promise<ApiPromise> {
    if (!api) {
        api = createApi();
    }
    return api
}

export {
    sequelize,
    REDIS
}
