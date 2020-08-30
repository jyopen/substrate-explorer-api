import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../connect";

export default class Event extends Model {
    public id!: string;
    public blockNumber!: number;
    public section!: string;
    public method!: string;
    public indexes!: number;
    public eventIndex!: number;
    public timestamp!: number;
    public extrinsicIndex!: number | null;
    public relatedHash!: string | null;
    public args!: string;
    public topics!: string;
}

Event.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    blockNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    section: {
        type: DataTypes.STRING
    },
    method: {
        type: DataTypes.STRING
    },
    indexes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eventIndex: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    extrinsicIndex: {
        type: DataTypes.INTEGER
    },
    timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    relatedHash: {
        type: new DataTypes.STRING(66)
    },
    args: {
        type: new DataTypes.TEXT('medium'),
        allowNull: false
    },
    topics: {
        type: new DataTypes.TEXT('long')
    },
}, {sequelize, timestamps: false});
