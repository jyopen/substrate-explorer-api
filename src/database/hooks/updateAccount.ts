import Transaction from "../entity/Transaction";
import Account from '../entity/Account'

const ACCOUNT_TYPES = ['AccountId', 'AccountIdOf', 'Address', 'AuthorityId', 'LookupSource', 'LookupTarget', 'SessionKey', 'ValidatorId'];

Transaction.beforeCreate(async (t, {transaction}) => {
    const accounts: string[] = [];
    if (t.isSigned) {
        accounts.push(t.signer!);
    }
    (JSON.parse(t.args) as [{ type: string, value: string }]).forEach(t => {
        if (ACCOUNT_TYPES.includes(t.type)) {
            accounts.push(t.value)
        }
    });
    await Promise.all(accounts.map(accountId => Account.upsertInfo(accountId, transaction)))
});
