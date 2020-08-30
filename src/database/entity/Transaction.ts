import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../connect";

export default class Transaction extends Model {
    public id!: string;
    public blockNumber!: number;
    public section!: string;
    public method!: string;
    public indexes!: number;
    public eventCount!: number;
    public timestamp!: number;
    public tip!: string;
    public nonce!: number | null;
    public isSigned!: boolean;
    public status!: boolean;
    public signature!: string;
    public args!: string;
    public hash!: string;
    public signer!: string | null;
    public callIndex!: number;
    public encodedLength!: number;
    public type!: number;
    public version!: number;
    public era!: string | null;
}

Transaction.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    blockNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false
    },
    indexes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eventCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tip: {
        type: DataTypes.STRING,
    },
    nonce: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isSigned: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    signature: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    callIndex: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    encodedLength: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    hash: {
        type: new DataTypes.STRING(66)
    },
    signer: {
        type: new DataTypes.STRING(48)
    },
    args: {
        type: new DataTypes.TEXT('medium'),
        allowNull: false,
    },
    era: {
        type: new DataTypes.TEXT('medium')
    },
}, {sequelize, timestamps: false});
