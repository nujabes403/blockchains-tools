import React, { Component, createRef } from 'react'
import { Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'

import './Ad.scss'

type Props = {
  
}

class Ad extends Component<Props> {
  destroy$ = new Subject()

  componentWillUnmount() {
    this.destroy$.next(true)
  }

  render() {
    return (
      <div 
        className="Ad" 
        onClick={() => {
          window.open("https://jetstream.world")
        }}
      >
        <p className="Ad__description">
          All Klaytn Developers’
          Essential Chrome Extension
        </p>
        <img className="Ad__image" src="/static/images/logo-jetstream.svg" />
      </div>
    )
  }
}

export default Ad