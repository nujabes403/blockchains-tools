import marked from 'marked'

import BigNumberToHexMarkdown from 'templates/BigNumberToHex.md'
import ContractAddressMarkdown from 'templates/ContractAddress.md'
import Keccak256Markdown from 'templates/Keccak256.md'
import PrivateKeyToAddressMarkdown from 'templates/PrivateKeyToAddress.md'
import UTF8Markdown from 'templates/UTF8.md'
import Base58Markdown from 'templates/Base58.md'
import Ed25519Markdown from 'templates/Ed25519.md'
import ByteArrayToHexMarkdown from 'templates/ByteArrayToHex.md'
import SoliditySha3Markdown from 'templates/SoliditySha3.md'

const linkToDescription = {
  '/': {
    title: 'Welcome to Blockchain Tools!',
    markdown: '',
  },
  '/rlp': {
    title: 'RLP',
    markdown: '',
  },
  '/key': {
    title: 'PRIVATE KEY TO ADDRESS',
    markdown: PrivateKeyToAddressMarkdown,
  },
  '/bignumber': {
    title: 'NUMBER TO HEX',
    markdown: BigNumberToHexMarkdown,
  },
  '/contractAddress': {
    title: 'CONTRACT ADDRESS',
    markdown: ContractAddressMarkdown,
  },
  '/keccak256': {
    title: 'KECCAK256',
    markdown: Keccak256Markdown,
  },
  '/rawTransactionEncoder': {
    title: 'RAW TRANSACTION ENCODER',
    markdown: '',
  },
  '/rawTransactionDecoder': {
    title: 'RAW TRANSACTION DECODER',
    markdown: '',
  },
  '/utf8': {
    title: 'UTF8',
    markdown: UTF8Markdown,
  },
  '/base58': {
    title: 'BASE58',
    markdown: Base58Markdown,
  },
  '/ed25519': {
    title: 'ED25519',
    markdown: Ed25519Markdown,
  },
  '/byteArrayToHex': {
    title: 'BYTE ARRAY TO HEX',
    markdown: ByteArrayToHexMarkdown,
  },
  '/soliditySha3': {
    title: 'SOLIDITY SHA3',
    markdown: SoliditySha3Markdown,
  },
}

export default linkToDescription
