import {sequelize} from "../../connect";
import Account, {accountAttributes} from "./Account";
import {DataTypes} from "sequelize";

export default class Validator extends Account {
    public countNominators: number;

}
export const attributes = {
    ...accountAttributes,
    countNominators: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

};
Validator.init(attributes, {sequelize, timestamps: false});
