import {Event, Log, Transaction} from "../database";
import {Vec} from "@polkadot/types";
import {u8aToBn} from "@polkadot/util";
import {DigestItem, EventRecord, Extrinsic} from "@polkadot/types/interfaces";
import {getApi} from "../connect";

export function mapperLogs(list: Vec<DigestItem>, blockNumber: number): Log[] {
    return list.map((log, i) => {
        return Log.build({
            id: `${blockNumber}-${i}`,
            blockNumber,
            indexes: i,
            type: log.type,
            args: JSON.stringify(log.value)
        })
    })
}

export function mapperEvents(list: EventRecord[], extrinsics: Vec<Extrinsic>, blockNumber: number): Event[] {
    return list.map((event, i) => {
        const {section, method, index, data, typeDef} = event.event;
        const extrinsicIndex = event.phase.isApplyExtrinsic ? event.phase.asApplyExtrinsic.toNumber() : null;
        return Event.build({
            id: `${blockNumber}-${i}`,
            blockNumber,
            extrinsicIndex,
            section,
            method,
            eventIndex: u8aToBn(index).toNumber(),
            indexes: i,
            args: JSON.stringify(data.map((t, i) => ({...typeDef[i], value: t}))),
            topics: JSON.stringify(event.topics),
            relatedHash: extrinsicIndex > -1 && extrinsics[extrinsicIndex] ? extrinsics[extrinsicIndex].hash.toHex() : null
        })
    })
}


export async function mapperTransactions(list: Vec<Extrinsic>, events: Event[], blockNumber: number): Promise<Transaction[]> {
    const api = await getApi()
    return list.map((t, i) => {
        const {method, section} = api.findCall(t.callIndex);
        const extrinsic = JSON.parse(t.toString());
        const {era, signer, nonce} = extrinsic.signature;
        const relatedEvents = events.filter(event => event.extrinsicIndex === i);
        const status = relatedEvents.filter(event => event.section === 'system' && event.method === 'ExtrinsicFailed').length === 0;
        return Transaction.build({
            id: `${blockNumber}-${i}`,
            callIndex: u8aToBn(t.callIndex).toNumber(),
            indexes: i,
            section,
            method,
            signer: signer,
            hash: t.hash.toHex(),
            isSigned: t.isSigned,
            blockNumber,
            nonce,
            tip: t.tip.toString(),
            args: JSON.stringify(t.args.map(t => ({value: t.toJSON(), type: t.toRawType()}))),
            status,
            signature: t.signature.toString(),
            era: JSON.stringify(era),
            type: t.type,
            version: t.version,
            encodedLength: t.encodedLength,
            eventCount: relatedEvents.length
        })
    });
}

