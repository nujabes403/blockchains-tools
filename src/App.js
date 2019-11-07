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
        {/*
          <div className="App__link">
            <a target="blank" href="https://t.me/jetstreamworld">
            <img src="/static/images/telegram.png" />
            </a>
          </div>
        */}
      </div>
    )

    // return (
    //   <Fragment>
    //     <Modal />
    //     <div className="App">
    //       <Header className="App__header" />
    //       <Menu className="App__menu hide-mobile" />
    //       <MobileMenu className="App__menu hide-desktop" />
    //       <div className={cx('App__section', {
    //         'App__section--introduction': location.pathname === '/',
    //       })}
    //       >
    //         <SectionDescription
    //           hasModal={location.pathname !== '/'}
    //           pathname={location.pathname}
    //           className="App__sectionDescription"
    //         />
    //         {children}
    //       </div>
    //     </div>
    //   </Fragment>
    // )
  }
}

export default App
