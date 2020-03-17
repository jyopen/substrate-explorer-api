import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../connect";

export default class Transfer extends Model {
    public id: string;
    public value: string;
    public timestamp: number;
    public blockNumber: number;
    public fees: string;
    public from: string;
    public to: string;
    public hash: string;
}

Transfer.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    blockNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fees: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    hash: {
        type: new DataTypes.STRING(66),
        allowNull: false
    },
    from: {
        type: new DataTypes.STRING(48)
    },
    to: {
        type: new DataTypes.STRING(48)
    },
}, {sequelize, timestamps: false});
