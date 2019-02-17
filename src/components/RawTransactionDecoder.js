import React, { Component } from 'react'
import cx from 'classnames'
import keccak256 from 'keccak256'
import { fromEvent, merge, Subject } from 'rxjs'
import { map, filter, tap, takeUntil } from 'rxjs/operators'
const { RLP: rlp, bytes } = require('eth-lib')

import Arrow from 'components/Arrow'
import { onlyWhenDesktop } from 'utils/stream'

import './RawTransactionDecoder.scss'

type Props = {

}

class RawTransactionDecoder extends Component<Props> {
  destroy$ = new Subject()

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
  }

  initInputChangeStreams = () => {
    // Input Change Streams
    const rawTransactionHexChange$ = fromEvent(this.$rawTransactionHex, 'input').pipe(
        map(e => e.target.value),
        takeUntil(this.destroy$),
      )

    rawTransactionHexChange$.subscribe((hex) => {
      let decodedOutput

      try {
        decodedOutput = rlp.decode(hex)
        if (decodedOutput instanceof Array && decodedOutput.length !== 0) {
          const [nonce, gasPrice, gasLimit, to, value, data, v, r, s] = decodedOutput
          this.setState({
            nonce: new BigNumber(nonce).toString(10) + ` (${(nonce)})`,
            gasPrice: new BigNumber(gasPrice).toString(10) + ` (${(gasPrice)})`,
            gasLimit: new BigNumber(gasLimit).toString(10) + ` (${(gasLimit)})`,
            to,
            value: value !== '0x'
              ? new BigNumber(value).toString(10) + ` (${(value)})`
              : '0x',
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

  render() {
    const {
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

    const decodedOutput = { nonce, gasPrice, gasLimit, to, value, data, v, r, s }

    return (
      <div className="RawTransactionDecoder">
        <div className="RawTransactionDecoder__inputWrapper">
          <label className="RawTransactionDecoder__label">Raw Tx:</label>
          <textarea
            className="RawTransactionDecoder__rawTxInput"
            ref={($rawTransactionHex) => this.$rawTransactionHex = $rawTransactionHex}
          />
        </div>
        <Arrow down />
        {Object
            .keys(decodedOutput)
            .map((key) => {
              return (
                <div className="RawTransactionDecoder__inputWrapper">
                  <label className="RawTransactionDecoder__label">{key}:</label>
                  <input
                    className={cx('RawTransactionDecoder__decodedOutput')}
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

export default RawTransactionDecoder
