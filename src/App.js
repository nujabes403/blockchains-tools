import React, { Component, Fragment, createRef } from 'react'
import cx from 'classnames'

import Mainpage from 'pages/Mainpage'

import Header from 'components/Header'
import SectionDescription from 'components/SectionDescription'
import Menu from 'components/Menu'
import MobileMenu from 'components/MobileMenu'
import Modal from 'components/Modal'

import './App.scss'

type Props = {
  isLoading: boolean,
  children: React.DOM,
}

class App extends Component<Props> {
  $app = createRef()
  
  state = {
    isLoading: true,
  }

  render() {
    const { children, location } = this.props

    return (
      <div ref={this.$app} className="App">
        <Mainpage children={children} />
      </div>
    )
  }
}

export default App
