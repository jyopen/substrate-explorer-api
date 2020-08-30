import {sequelize} from "../../connect";
import Account, {accountAttributes} from "./Account";
import {DataTypes, Transaction} from "sequelize";

export default class Validator extends Account {
    public countNominators!: number;

    static async upsertCount(accountId: string, transaction?: Transaction) {
        let ins = await this.findByPk(accountId, {transaction, lock: true});
        if (!ins) {
            await this.upsertInfo(accountId, transaction);
        }
        await Validator.increment('countNominators', {
            transaction, where: {
                accountId
            }
        });
    }
}
export const attributes = {
    ...accountAttributes,
    countNominators: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

};
Validator.init(attributes, {sequelize, timestamps: false});
