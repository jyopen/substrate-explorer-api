import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../connect";

export default class Log extends Model {
    public id!: string;
    public blockNumber!: number;
    public indexes!: number;
    public timestamp!: number;
    public type!: string;
    public args!: string;
}

Log.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    blockNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    indexes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    args: {
        type: new DataTypes.TEXT('medium'),
        allowNull: false
    },
}, {sequelize, timestamps: false});
