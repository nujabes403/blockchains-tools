import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
const isMobile = require('ismobilejs')

import App from './App'
import Introduction from 'components/Introduction'
import RLP from 'components/RLP'
import PrivateKeyToPublicKey from 'components/PrivateKeyToPublicKey'
import BigNumberToHex from 'components/BigNumberToHex'
import ContractAddress from 'components/ContractAddress'
import Keccak256 from 'components/Keccak256'
import RawTransactionEncoder from 'components/RawTransactionEncoder'
import RawTransactionDecoder from 'components/RawTransactionDecoder'
import UTF8 from 'components/UTF8'
import Base58 from 'components/Base58'
import Ed25519 from 'components/Ed25519'
import ByteArrayToHex from 'components/ByteArrayToHex'
import SoliditySha3 from 'components/SoliditySha3'
import WeiConverter from 'components/WeiConverter'
// KLAY-specific
import PebConverter from 'components/PebConverter'
import HumanreadableAddress from 'components/HumanreadableAddress'
import KlayRawTransactionDecoder from 'components/KlayRawTransactionDecoder'
import FeeDelegate from 'components/FeeDelegate'
import KeyGenerate from 'components/KeyGenerate'

window.isMobile = isMobile

// injectLibraries
import 'utils/injectLibraries'

import './index.scss'

const history = browserHistory

// console
console.info(`%cYou can use following libraries in this console..
  - BigNumber: window.BigNumber
  - Keccak256: window.keccak256
  - UTF8: window.utf8
  - RLP: window.rlp
  - secp256k1: window.secp256k1
  - eth-lib: window.ethLib
  - base58: window.bs58
  - ed25519: window.nacl
  If there is no tool you are looking for, please make an issue or PR to following github link.
  https://github.com/nujabes403/blockchains-tools
  `, 'background:#73c8a9;color:#fff;font-size:12px;padding:4px;')

export const renderRoutes = (rootComponent) => (
  <Router history={history}>
    <Route path="/" component={rootComponent}>
      <IndexRoute component={Introduction} />
      <Route path="/rlp" component={RLP} />
      <Route path="/key" component={PrivateKeyToPublicKey} />
      <Route path="/bignumber" component={BigNumberToHex} />
      <Route path="/contractAddress" component={ContractAddress} />
      <Route path="/keccak256" component={Keccak256} />
      <Route path="/rawTransactionEncoder" component={RawTransactionEncoder} />
      <Route path="/rawTransactionDecoder" component={RawTransactionDecoder} />
      <Route path="/utf8" component={UTF8} />
      <Route path="/base58" component={Base58} />
      <Route path="/ed25519" component={Ed25519} />
      <Route path="/byteArrayToHex" component={ByteArrayToHex} />
      <Route path="/soliditySha3" component={SoliditySha3} />
      <Route path="/weiConverter" component={WeiConverter} />
      <Route path="/pebConverter" component={PebConverter} />
      <Route path="/humanreadableAddress" component={HumanreadableAddress} />
      <Route path="/klayRawTransactionDecoder" component={KlayRawTransactionDecoder} />
      <Route path="/feeDelegate" component={FeeDelegate} />
      <Route path="/keygenerate" component={KeyGenerate} />
    </Route>
  </Router>
)

ReactDOM.render(renderRoutes(App), document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App').default
    ReactDOM.render(renderRoutes(NextApp), document.getElementById('root'))
    console.log('Hot module replaced..')
  })
}
