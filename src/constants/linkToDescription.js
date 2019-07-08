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
import RLPMarkdown from 'templates/RLP.md'
import WeiConverterMarkdown from 'templates/WeiConverter.md'
import RawTransactionEncoderMarkdown from 'templates/RawTransactionEncoder.md'
import RawTransactionDecoderMarkdown from 'templates/RawTransactionDecoder.md'
import PebConverterMarkdown from 'templates/PebConverter.md'
import KeyGenerateMarkdown from 'templates/KeyGenerate.md'

const linkToDescription = {
  '/': {
    title: 'Welcome to Blockchain Tools!',
    markdown: '',
  },
  '/rlp': {
    title: 'RLP',
    markdown: RLPMarkdown,
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
    title: 'RAW TX ENCODER',
    markdown: RawTransactionEncoderMarkdown,
  },
  '/rawTransactionDecoder': {
    title: 'RAW TX DECODER',
    markdown: RawTransactionDecoderMarkdown,
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
  '/weiConverter': {
    title: 'WEI CONVERTER',
    markdown: WeiConverterMarkdown,
  },
  '/pebConverter': {
    title: 'PEB CONVERTER',
    markdown: PebConverterMarkdown,
  },
  '/humanreadableAddress': {
    title: 'HUMAN-READABLE ADDRESS',
    markdown: UTF8Markdown,
  },
  '/klayRawTransactionDecoder': {
    title: 'RAW TX DECODER',
    markdown: RawTransactionDecoderMarkdown,
  },
  '/feeDelegate': {
    title: 'FEE DELEGATE',
    markdown: RawTransactionDecoderMarkdown,
  },
  '/keygenerate': {
    title: 'KEY GENERATE',
    markdown: KeyGenerateMarkdown,
  },
}

export default linkToDescription
