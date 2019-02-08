import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Header from 'components/Header'
import Menu from 'components/Menu'

import './App.scss'

type Props = {
  isLoading: boolean,
  children: React.DOM,
}

class App extends Component<Props> {
  state = {
    isLoading: true,
  }

  render() {
    const { children } = this.props

    return (
      <div className="App">
        <div className="App__section">
          {children}
        </div>
        <div className="App__menu">
          <Menu />
        </div>
      </div>
    )
  }
}

export default App
