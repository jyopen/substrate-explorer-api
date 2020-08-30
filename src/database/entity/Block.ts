import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../connect";

export default class Block extends Model {
    public number!: number;
    public logCount!: number;
    public extrinsicCount!: number;
    public transferCount!: number;
    public size!: number;
    public eventCount!: number;
    public timestamp!: number;
    public parentHash!: string | null;
    public author!: string | null;
    public hash!: string;
    public stateRoot!: string;
    public extrinsicsRoot!: string;
}

Block.init({
    number: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    logCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    extrinsicCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transferCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eventCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    parentHash: new DataTypes.STRING(66),
    author: new DataTypes.STRING(48),
    hash: {
        type: new DataTypes.STRING(66),
        primaryKey: true,
        allowNull: false
    },
    stateRoot: {
        type: new DataTypes.STRING(66),
        allowNull: false
    },
    extrinsicsRoot: {
        type: new DataTypes.STRING(66),
        allowNull: false
    },
}, {sequelize, timestamps: false, comment: "区块数据"});
