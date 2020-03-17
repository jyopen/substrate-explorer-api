import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../connect";

export default class Dictionary extends Model {
    public key: string;
    public value: string | null;
    public describe: string;
}

Dictionary.init({
    key: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    describe: {
        type: DataTypes.STRING,
    },
    value: {
        type: new DataTypes.TEXT('medium'),
    },
}, {sequelize, timestamps: false});
