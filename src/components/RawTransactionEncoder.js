import React, { Component } from 'react'
import cx from 'classnames'
import keccak256 from 'keccak256'
import { fromEvent, merge } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'
const { RLP: rlp, bytes } = require('eth-lib')

import './RawTransactionEncoder.scss'

type Props = {

}

class RawTransactionEncoder extends Component<Props> {
  state = {
    nonce: '',
    gasPrice: '',
    gasLimit: '',
    to: '',
    data: '',
    v: '',
    r: '',
    s: '',
    changeTarget: {},
  }

  componentDidMount() {
    this.initInputChangeStreams()
    this.initActiveStreams()
    this.initDeactiveStreams()
  }

  initInputChangeStreams = () => {
    // Input Change Streams
    const rawTransactionHexChange$ = fromEvent(this.$rawTransactionHex, 'input').pipe(
        map(e => e.target.value)
      )

    rawTransactionHexChange$.subscribe((hex) => {
      let decodedOutput

      try {
        decodedOutput = rlp.decode(hex)
        if (decodedOutput instanceof Array && decodedOutput.length !== 0) {
          const [nonce, gasPrice, gasLimit, to, value, data, v, r, s] = decodedOutput
          this.setState({
            nonce,
            gasPrice,
            gasLimit,
            to,
            value,
            data,
            v,
            r,
            s,
          })
        }
      } catch (e) {
        console.log(e, 'err')
        this.setState({
          nonce: '',
          gasPrice: '',
          gasLimit: '',
          to: '',
          value: '',
          data: '',
          v: '',
          r: '',
          s: '',
        })
      }
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
    const {
      changeTarget,
      nonce,
      gasPrice,
      gasLimit,
      to,
      value,
      data,
      v,
      r,
      s,
    } = this.state

    const decodedOutput = {
      nonce,
      gasPrice,
      gasLimit,
      to,
      value,
      data,
      v,
      r,
      s,
    }

    return (
      <div className="RawTransactionEncoder">
        <div className="RawTransactionEncoder__inputWrapper">
          <label className="RawTransactionEncoder__label">Input:</label>
          <textarea
            className="RawTransactionEncoder__rawTxInput"
            ref={($rawTransactionHex) => this.$rawTransactionHex = $rawTransactionHex}
          />
        </div>
        {Object
            .keys(decodedOutput)
            .map((key) => {
              return (
                <div className="RawTransactionEncoder__inputWrapper">
                  <label className="RawTransactionEncoder__label">{key}:</label>
                  <input
                    className={cx('RawTransactionEncoder__decodedOutput')}
                    readOnly
                    value={decodedOutput[key]}
                  />
                </div>
              )
            })
          }
      </div>
    )
  }
}

export default RawTransactionEncoder
