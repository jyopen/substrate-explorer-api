export default {
    TokenId: "u32",
    RawAmount: "u128",
    HashAlgorithm: {
        _enum: [
            'MD5',
            'SHA1',
            'SHA2_224',
            'SHA2_256',
            'SHA2_384',
            'SHA2_512',
            'SHA512_224',
            'SHA512_256',
            'SHA3_224',
            'SHA3_256',
            'SHA3_384',
            'SHA3_512',
            'BLAKE2b_256',
            'BLAKE2b_384',
            'BLAKE2b_512',
            'Keccak_256',
            'Keccak_512'
        ]
    },
    Address: "AccountId",
    BasicToken: {
        symbol: 'Text',
        name: 'Text',
        total_supply: 'u128',
        decimals: 'u8',
        owner: 'AccountId'
    },
    SimpleToken: {
        symbol: 'Text',
        name: 'Text',
        total_supply: 'u128',
        granularity: 'u128',
        redeemable: 'bool',
        mintable: 'bool',
        owner: 'AccountId'
    }
}
