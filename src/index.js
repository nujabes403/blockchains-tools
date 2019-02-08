import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App'
import RLP from 'components/RLP'
import PrivateKeyToPublicKey from 'components/PrivateKeyToPublicKey'
import BigNumberToHex from 'components/BigNumberToHex'
import ContractAddress from 'components/ContractAddress'
import Keccak256 from 'components/Keccak256'
import RawTransactionEncoder from 'components/RawTransactionEncoder'
import RawTransactionDecoder from 'components/RawTransactionDecoder'
import UTF8 from 'components/UTF8'

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
  If there is no tool you are looking for, please make an issue or PR to following github link.
  https://github.com/nujabes403/blockchains-tools
  `, 'background:#73c8a9;color:#fff;font-size:12px;padding:4px;')

export const renderRoutes = (rootComponent) => (
  <Router history={history}>
    <Route path="/" component={rootComponent}>
      <Route path="/rlp" component={RLP} />
      <Route path="/key" component={PrivateKeyToPublicKey} />
      <Route path="/bignumber" component={BigNumberToHex} />
      <Route path="/contractAddress" component={ContractAddress} />
      <Route path="/keccak256" component={Keccak256} />
      <Route path="/rawTransactionEncoder" component={RawTransactionEncoder} />
      <Route path="/rawTransactionDecoder" component={RawTransactionDecoder} />
      <Route path="/utf8" component={UTF8} />
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
