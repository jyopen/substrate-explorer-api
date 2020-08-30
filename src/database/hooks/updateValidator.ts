import Block from "../entity/Block";
import Validator from '../entity/Validator'

Block.beforeCreate(async (t, {transaction}) => {
    if (t.author) {
        await Validator.upsertCount(t.author, transaction)
    }
});
