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

import './index.scss'

const history = browserHistory

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
