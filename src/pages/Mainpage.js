import React, { Component, createRef } from 'react'
import { browserHistory } from 'react-router'
import { Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import SectionDescription from 'components/SectionDescription'

import MainpageBloc from './Mainpage.bloc'

import './Mainpage.scss'

type Props = {
  
}

class Mainpage extends Component<Props> {
  destroy$ = new Subject()

  bloc = new MainpageBloc()

  componentDidMount() {
    this.bloc.stateChanged$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.destroy$.next(true)
  }

  render() {
    const { children } = this.props
    
    const currentPathname = browserHistory.getCurrentLocation().pathname
    
    return (
      <div className="Mainpage">
        <div className="Mainpage__header">
          <Header />
        </div>
        <div className="Mainpage__side">
          <Sidebar />
        </div>
        <div className="Mainpage__view">
          <SectionDescription
            hasModal={currentPathname !== '/'}
            pathname={currentPathname}
            className="App__sectionDescription"
          />
          {children}
        </div>
      </div>
    )
  }
}

export default Mainpage