export const menuItems = {
  'GENERAL': [
    { title: 'KECCAK256', link: '/keccak256?l=GENERAL' },
    { title: 'NUMBER TO HEX', link: '/bignumber?l=GENERAL' },
    { title: 'BYTE ARRAY TO HEX', link: '/byteArrayToHex?l=GENERAL' },
    { title: 'RLP', link: '/rlp?l=GENERAL' },
    { title: 'UTF8', link: '/utf8?l=GENERAL' },
    { title: 'BASE58', link: '/base58?l=GENERAL' },
    { title: 'ED25519', link: '/ed25519?l=GENERAL' },
  ],
  'ETH': [
    { title: 'KECCAK256', link: '/keccak256?l=ETH' },
    { title: 'CONTRACT ADDRESS', link: '/contractAddress?l=ETH' },
    { title: 'PRIVATEKEY TO ADDRESS', link: '/key?l=ETH' },
    { title: 'RAW TRANSACTION ENCODER', link: '/rawTransactionEncoder?l=ETH' },
    { title: 'RAW TRANSACTION DECODER', link: '/rawTransactionDecoder?l=ETH' },
    { title: 'SOLIDITY SHA3', link: '/soliditySha3?l=ETH' },
    { title: 'WEI CONVERTER', link: '/weiConverter?l=ETH' },
  ],
  'KLAY': [
    { title: 'PEB CONVERTER', link: '/pebConverter?l=KLAY' },
    { title: 'HUMAN-READABLE ADDRESS', link: '/humanreadableAddress?l=KLAY' },
    { title: 'PRIVATEKEY TO ADDRESS', link: '/key?l=KLAY' },
    { title: 'KECCAK256', link: '/keccak256?l=KLAY' },
    { title: 'RAW TRANSACTION DECODER', link: '/klayRawTransactionDecoder?l=KLAY' },
  ]
}

export const bookLabels = ['GENERAL', 'ETH', 'KLAY']
