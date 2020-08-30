import {logger, httpLogger, httpLog} from './logger'


export {
    logger,
    httpLogger,
    httpLog
}

export function sleep(time = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}
