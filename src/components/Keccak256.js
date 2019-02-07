import React, { Component } from 'react'
import cx from 'classnames'
import keccak256 from 'keccak256'
import { fromEvent, merge } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'

import './Keccak256.scss'

type Props = {

}

window.keccak256 = keccak256

class Keccak256 extends Component<Props> {
  state = {
    keccakOutput: '',
    changeTarget: {},
  }

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

    keccakInputChange$.subscribe((input) => {
      console.log(keccak256(input), 'keccak256(input)', input, typeof input)
      this.setState({
        keccakOutput: input && keccak256(input).toString('hex'),
      })
    })
  }

  initActiveStreams = () => {
    const keccakInputFocus$ = fromEvent(this.$keccakInput, 'focus')
    const keccakInputMouseEnter$ = fromEvent(this.$keccakInput, 'mouseenter')
    const keccakInputActive$ = merge(keccakInputFocus$, keccakInputMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            keccakOutput: true,
          }
        })
      })
    )

    keccakInputActive$.subscribe()
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

    deactive$.subscribe()
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
