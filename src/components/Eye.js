import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

import './Eye.scss'

class Eye extends Component<Props> {
  subscription = null

  componentDidMount() {
    const { pathname } = this.props
    const mouseMove$ = fromEvent(document, 'mousemove').pipe(
      map(e => ({
        x: e.clientX * 100 / window.innerWidth - 40 + '%',
        y: e.clientY * 100 / window.innerHeight + 30 + '%',
      }))
    )

    this.subscription = mouseMove$.subscribe(({ x, y }) => {
      this.$eyeBallLeft.style.left = x
      this.$eyeBallLeft.style.top = y
      this.$eyeBallLeft.style.transform = "translate(-" + x + ",-" + y + ")"

      const { pathname } = browserHistory.getCurrentLocation()

      const dangerPaths = ['/key', '/rawTransactionEncoder']

      if (dangerPaths.includes(pathname)) {
        this.$eyeBallLeft.style.borderColor = '#E67C64'
      } else {
        this.$eyeBallLeft.style.borderColor = '#47443c'
      }

      if (x < '25%') {
        this.$eyeBallLeft.style.width = 60 + 'px'
        this.$eyeBallLeft.style.height = 60 + 'px'
      } else {
        this.$eyeBallLeft.style.width = 50 + 'px'
        this.$eyeBallLeft.style.height = 50 + 'px'
      }
    })
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  render() {
    return (
      <Fragment>
        <div className="Eye Eye--left">
          <div className="Eye__eye">
            <div
              className="Eye__eyeBall"
              ref={($eyeBall) => this.$eyeBallLeft = $eyeBall}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Eye
