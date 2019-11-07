import React, { Component, createRef } from 'react'
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
          <span className="Header__title">Blockchains Tools</span>
        </div>
      </div>
    )
  }
}

export default Header