import {ApiPromise, WsProvider} from "@polkadot/api";
import {RegistryTypes} from '@polkadot/types/types';
import {seal, edgeware} from '../types';
require('dotenv').config();
type Options = {
    url: string,
    types?: RegistryTypes
}

const PROVIDER: Map<string, Options> = new Map<string, Options>();

PROVIDER.set('seal', {
    url: 'wss://dapp.sealchain.io:9443/',
    types: seal
});
PROVIDER.set('kusama', {
    url: 'wss://kusama-rpc.polkadot.io/'
});
PROVIDER.set('edgeware', {
    url: 'wss://mainnet1.edgewa.re',
    types: edgeware
});
PROVIDER.set('local', {
    url: 'ws://127.0.0.1:9944/',
});
PROVIDER.set('dev', {
    url: 'wss://dev-node.substrate.dev:9944',
});
const NODE_NAME = process.env.NODE_NAME;
if (!NODE_NAME || !PROVIDER.has(NODE_NAME)) {
    console.error('节点信息不存在', NODE_NAME);
    process.exit(1)
}
const apiConfig = PROVIDER.get(NODE_NAME);


export async function createApi(): Promise<ApiPromise> {
    try {
        const api = await ApiPromise.create({
            provider: new WsProvider(apiConfig.url),
            types: apiConfig.types
        });
        const [
            properties,
            _systemChain,
            _systemName,
            _systemVersion,
        ] = await Promise.all([
            api.rpc.system.properties(),
            api.rpc.system.chain(),
            api.rpc.system.name(),
            api.rpc.system.version(),
        ]);
        const tokenSymbol = properties.tokenSymbol.unwrapOr('DEV').toString();
        const systemChain = _systemChain ? _systemChain.toString() : 'unknown';
        console.log(
            'api: found chain',
            'Version:', _systemVersion.toString(),
            'Chain:', systemChain,
            'Name:', _systemName.toString(),
            'Symbol:', tokenSymbol,
            JSON.stringify(properties),
        );
        return api;
    } catch (e) {
        console.error('节点连接失败', apiConfig.url, e);
        throw new Error(e)
    }
}
