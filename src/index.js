import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import App from './App'
import RLP from 'components/RLP'
import PrivateKeyToPublicKey from 'components/PrivateKeyToPublicKey'
import BigNumberToHex from 'components/BigNumberToHex'
import ContractAddress from 'components/ContractAddress'
import store from './store'

import './index.scss'

const history = syncHistoryWithStore(browserHistory, store)

export const renderRoutes = (rootComponent) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={rootComponent}>
        <Route path="/rlp" component={RLP} />
        <Route path="/key" component={PrivateKeyToPublicKey} />
        <Route path="/bignumber" component={BigNumberToHex} />
        <Route path="/contractAddress" component={ContractAddress} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(renderRoutes(App), document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App').default
    ReactDOM.render(renderRoutes(NextApp), document.getElementById('root'))
    console.log('Hot module replaced..')
  })
}
