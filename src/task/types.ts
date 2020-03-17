import {Block, Event, Log, Transaction} from "../database";

export type SingleData = {
    events: Event[],
    transactions: Transaction[],
    logs: Log[],
    block: Block,
}

