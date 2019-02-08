import BigNumberToHexMarkdown from 'templates/BigNumberToHex.md'
import marked from 'marked'

const linkToTitle = {
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
    markdown: '',
  },
  '/bignumber': {
    title: 'NUMBER TO HEX',
    markdown: BigNumberToHexMarkdown,
  },
  '/contractAddress': {
    title: 'CONTRACT ADDRESS',
    markdown: '',
  },
  '/keccak256': {
    title: 'KECCAK256',
    markdown: '',
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
    markdown: '',
  },
}

export default linkToTitle
