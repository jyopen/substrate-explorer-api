import {Model, DataTypes} from "sequelize";
import {getApi, sequelize} from "../../connect";

export default class Account extends Model {
    public accountId: string;
    public accountNonce: number;
    public availableBalance: string;
    public freeBalance: string;
    public frozenFee: string;
    public frozenMisc: string;
    public isVesting: boolean;
    public lockedBalance: string;
    public reservedBalance: string;
    public vestedBalance: string;
    public vestingTotal: string;
    public votingBalance: string;
    public lockedBreakdown: string;
    public accountIndex: string | null;
    public identity: string;
    public nickname: string | null;

    static async upsertInfo(accountId) {
        const api = await getApi();
        let [balancesAll, accountInfo] = await Promise.all([api.derive.balances.all(accountId), api.derive.accounts.info(accountId)]);
        balancesAll = JSON.parse(JSON.stringify(balancesAll));
        accountInfo = JSON.parse(JSON.stringify(accountInfo));
        this.upsert({
            ...balancesAll, ...accountInfo,
            identity: JSON.stringify(accountInfo.identity),
            lockedBreakdown: JSON.stringify(balancesAll.lockedBreakdown)
        })
    }

}
export const accountAttributes = {
    accountId: {
        type: DataTypes.STRING(48),
        primaryKey: true
    },
    accountNonce: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    availableBalance: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    freeBalance: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    frozenFee: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0'
    }, frozenMisc: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    isVesting: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    lockedBalance: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    reservedBalance: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    vestedBalance: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    votingBalance: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    lockedBreakdown: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    accountIndex: DataTypes.STRING,
    nickname: DataTypes.STRING,
    identity: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: {}
    },
};
Account.init(accountAttributes, {sequelize, timestamps: false});
