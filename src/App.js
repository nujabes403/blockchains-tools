import React, { Component, Fragment } from 'react'

import Header from 'components/Header'
import Eye from 'components/Eye'
import SectionDescription from 'components/SectionDescription'
import Menu from 'components/Menu'
import Modal from 'components/Modal'

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
    const { children, location } = this.props

    return (
      <Fragment>
        <Modal />
        <div className="App">
          <Eye pathname={location.pathname} />
          <SectionDescription
            pathname={location.pathname}
            className="App__sectionDescription"
          />
          <div className="App__section">
            {children}
          </div>
          <div className="App__menu">
            <Menu />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App
