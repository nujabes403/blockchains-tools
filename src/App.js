import React, { Component, Fragment, createRef } from 'react'
import cx from 'classnames'
import { fromEvent, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import Mainpage from 'pages/Mainpage'

import Header from 'components/Header'
import SectionDescription from 'components/SectionDescription'
import Modal from 'components/Modal'

import './App.scss'

type Props = {
  isLoading: boolean,
  children: React.DOM,
}

class App extends Component<Props> {
  $app = createRef()
  
  destroy$ = new Subject()
  
  state = {
    isLoading: true,
  }
  
  componentDidMount() {
    fromEvent(window, 'load').pipe(
      takeUntil(this.destroy$),
    ).subscribe((e) => {
      this.setState({
        isLoading: false,
      })
    })
  }
  
  componentWillUnmount() {
    this.destroy$.next(true)
  }

  render() {
    const { isLoading } = this.state
    const { children, location } = this.props

    return !isLoading && (
      <div ref={this.$app} className="App">
        <Modal />
        <Mainpage children={children} />
      </div>
    )
  }
}

export default App
