import marked from 'marked'

import BigNumberToHexMarkdown from 'templates/BigNumberToHex.md'
import ContractAddressMarkdown from 'templates/ContractAddress.md'
import Keccak256Markdown from 'templates/Keccak256.md'
import PrivateKeyToAddressMarkdown from 'templates/PrivateKeyToAddress.md'
import UTF8Markdown from 'templates/UTF8.md'

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
}

export default linkToDescription
