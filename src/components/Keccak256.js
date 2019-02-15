import React, { Component } from 'react'
import cx from 'classnames'
import keccak256 from 'keccak256'
import { fromEvent, merge } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'

import ArrowDown from 'components/ArrowDown'
import { putSubscriptions, unsubscribeAll, onlyWhenDesktop } from 'utils/stream'

import './Keccak256.scss'

type Props = {

}

class Keccak256 extends Component<Props> {
  state = {
    keccakOutput: '',
    changeTarget: {},
  }

  subscriptions = []

  componentDidMount() {
    this.initInputChangeStreams()
    this.initActiveStreams()
    this.initDeactiveStreams()
  }

  initInputChangeStreams = () => {
    // Input Change Streams
    const keccakInputChange$ = fromEvent(this.$keccakInput, 'input').pipe(
        map(e => e.target.value)
      )

    putSubscriptions(
      this.subscriptions,
      keccakInputChange$.subscribe((input) => {
        this.setState({
          keccakOutput: input && keccak256(input).toString('hex'),
        })
      })
    )
  }

  initActiveStreams = () => {
    const keccakInputFocus$ = fromEvent(this.$keccakInput, 'focus')
    const keccakInputMouseEnter$ = onlyWhenDesktop(fromEvent(this.$keccakInput, 'mouseenter'))
    const keccakInputActive$ = merge(keccakInputFocus$, keccakInputMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            keccakOutput: true,
          }
        })
      })
    )

    putSubscriptions(
      this.subscriptions,
      keccakInputActive$.subscribe()
    )
  }

  initDeactiveStreams = () => {
    const blur$ = fromEvent(this.$keccakInput, 'blur')
    const mouseleave$ = fromEvent(this.$keccakInput, 'mouseleave')

    const deactive$ = merge(blur$, mouseleave$).pipe(
      filter((e) => document.activeElement !== e.fromElement),
      tap(() => {
        this.setState({
          changeTarget: {},
        })
      })
    )

    putSubscriptions(
      this.subscriptions,
      deactive$.subscribe()
    )
  }

  componentWillUnmount() {
    unsubscribeAll(this.subscriptions)
  }

  render() {
    const { changeTarget, keccakOutput } = this.state
    return (
      <div className="Keccak256">
        <div className="Keccak256__inputWrapper">
          <label className="Keccak256__label">Input:</label>
          <input
            className="Keccak256__keccakInput"
            ref={($keccakInput) => this.$keccakInput = $keccakInput}
          />
        </div>
        <ArrowDown visible={changeTarget.keccakOutput} />
        <div className="Keccak256__inputWrapper">
          <label className="Keccak256__label">Output:</label>
          <input
            className={cx('Keccak256__keccakOutput', {
              'Keccak256__keccakOutput--changeTarget': changeTarget.keccakOutput,
            })}
            readOnly
            value={keccakOutput}
          />
        </div>
      </div>
    )
  }
}

export default Keccak256
