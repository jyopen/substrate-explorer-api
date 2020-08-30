import Event from "../entity/Event";
import Transfer from '../entity/Transfer'

Event.beforeCreate(async (event, {transaction}) => {
    if (event.section === 'balances' && event.method === 'Transfer') {
        const args = JSON.parse(event.args);
        const {id, blockNumber, timestamp, relatedHash} = event;
        await Transfer.create({
            from: args[0].value,
            to: args[1].value,
            value: args[2].value,
            fees: args[3] ? args[3].value : '0',
            id,
            blockNumber,
            timestamp,
            hash: relatedHash
        }, {transaction})
    }
});
