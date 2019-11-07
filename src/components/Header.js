import React, { Component, createRef } from 'react'
import { browserHistory } from 'react-router'
import { Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'

import './Header.scss'

type Props = {
  
}

class Header extends Component<Props> {
  destroy$ = new Subject()

  componentWillUnmount() {
    this.destroy$.next(true)
  }

  render() {
    return (
      <div className="Header">
        <div className="Header__left">
          <span 
            className="Header__title"
            onClick={() => browserHistory.push('/')}
          >
            Blockchains Tools
          </span>
        </div>
      </div>
    )
  }
}

export default Header