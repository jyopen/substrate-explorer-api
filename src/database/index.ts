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

// Validator.hasMany(Block, {
//     sourceKey: "accountId",
//     foreignKey: "author",
//     as: 'blocks'
// });
// Block.belongsTo(Validator, {foreignKey: 'author', as: 'validator'});
//
// Block.hasMany(Event, {sourceKey: "number", foreignKey: "blockNumber", as: 'events'});
// Block.hasMany(Transaction, {
//     sourceKey: "number",
//     foreignKey: "blockNumber",
//     as: 'transactions',
//     foreignKeyConstraint: false
// });
// Block.hasMany(Log, {sourceKey: "number", foreignKey: "blockNumber", as: 'logs'});
// Block.hasMany(Transfer, {sourceKey: "number", foreignKey: "blockNumber", as: 'transfers'});
// Account.hasMany(Transaction, {sourceKey: "accountId", foreignKey: "signer"});
// Account.hasMany(Transfer, {sourceKey: "accountId", foreignKey: "from", as: "Receipt"});
// Account.hasMany(Transfer, {sourceKey: "accountId", foreignKey: "to", as: "Sender"});
//
// Transaction.belongsTo(Block, {foreignKey: 'blockNumber'});
// Event.belongsTo(Block, {foreignKey: 'blockNumber'});
// Log.belongsTo(Block, {foreignKey: 'blockNumber'});
// Transaction.belongsTo(Account, {
//     targetKey: "accountId",
//     // foreignKey: {allowNull: true, name: "signer"},
//     // foreignKeyConstraint: false
// });
// Transfer.belongsTo(Account, {targetKey: "accountId", foreignKey: "from", as: "Sender"});
// Transfer.belongsTo(Account, {targetKey: "accountId", foreignKey: "to", as: "Receipt"});
// Transfer.belongsTo(Block, {foreignKey: "blockNumber"});

export {
    Block,
    Dictionary,
    MetaData,
    Log,
    Transfer,
    Transaction,
    Account,
    Validator,
    Event
}
