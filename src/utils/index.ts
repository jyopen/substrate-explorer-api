import {createHash} from 'crypto'
import logger from './logger'


export {
    logger
}

/**
 * MD5值加密
 * @param value
 * @returns {string}
 */
export function md5(value: string): string {
    return createHash('md5').update(value).digest('hex')
}


/**
 * 下划线转驼峰
 * @param name
 * @returns {string}
 */
function toHump(name: string): string {
    return name.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
}

export function sleep(time = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}
