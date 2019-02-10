import React, { Component, Fragment } from 'react'

import Header from 'components/Header'
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
          <div className="App__section">
            <SectionDescription
              hasModal={location.pathname !== '/'}
              pathname={location.pathname}
              className="App__sectionDescription"
            />
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
