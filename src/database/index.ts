import Block from './entity/Block'
import Dictionary from './entity/Dictionary'
import Event from './entity/Event'
import Transaction from './entity/Transaction'
import MetaData from './entity/MetaData'
import Account from './entity/Account'
import Log from './entity/Log'
import Validator from './entity/Validator'
import Transfer from './entity/Transfer'
import './hooks'

function sync(force) {
    return Promise.all([
        Block.sync({force}),
        Dictionary.sync({force}),
        Event.sync({force}),
        Transaction.sync({force}),
        MetaData.sync({force}),
        Log.sync({force}),
        Account.sync({force}),
        Transfer.sync({force}),
        Validator.sync({force}),
    ])
}

export {
    Block,
    Dictionary,
    MetaData,
    Log,
    Transfer,
    Transaction,
    Account,
    Validator,
    Event,
    sync
}
