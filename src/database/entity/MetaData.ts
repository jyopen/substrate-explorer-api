import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../connect";

export default class MetaData extends Model {
    public id: string;
    public version: string;
    public blockNumber: number;
    public classify: string;
    public index: number;
    public section: string;
    public type: string | null;
    public value: string | null;
    public name: string;
    public args: string | null;
    public documentation: string;
}

MetaData.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    version: {
        type: DataTypes.STRING,
        allowNull: false
    },
    blockNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    classify: {
        type: DataTypes.STRING,
        allowNull: false
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: DataTypes.STRING,
    value: DataTypes.STRING,
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    args: DataTypes.STRING,
    documentation: DataTypes.TEXT,
}, {sequelize, timestamps: false});
