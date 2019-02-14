import BigNumber from 'bignumber.js'
import keccak256 from 'keccak256'
import secp256k1 from 'utils/elliptic'
import { toHex, fromHex } from 'utils/utf8'
const rlp = require('rlp')
const ethLib = require('eth-lib')
const bs58 = require('bs58')

window.BigNumber = BigNumber

window.keccak256 = keccak256

window.utf8 = {
  fromHex,
  toHex,
}

window.rlp = rlp

window.secp256k1 = secp256k1

window.ethLib = ethLib

window.bs58 = bs58
