import React, { Component, createRef } from 'react'
import cx from 'classnames'
import { Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'

import IntroductionMD from 'templates/Introduction.md'

import './Landing.scss'

type Props = {
  
}

class Landing extends Component<Props> {
  destroy$ = new Subject()

  state = {}

  componentDidMount() {

  }

  componentWillUnmount() {
    this.destroy$.next(true)
  }

  render() {
    
    return (
      <div className="Landing">
        <div className="Landing__header">
          <p className="Landing__title">Welcome</p>
          <img className="Landing__logo" src="/static/images/favicon@256.png" />
        </div>
        <div 
          className="Landing__description"
          dangerouslySetInnerHTML={{
            __html: IntroductionMD,
          }}
        />
      </div>
    )
  }
}

export default Landing