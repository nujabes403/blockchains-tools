import React, { Component } from 'react'
import cx from 'classnames'
import keccak256 from 'keccak256'
import { fromEvent, merge, Subject } from 'rxjs'
import { map, filter, tap, takeUntil } from 'rxjs/operators'
const { RLP: rlp, bytes } = require('eth-lib')

import Arrow from 'components/Arrow'
import { onlyWhenDesktop } from 'utils/stream'
import { rawTxTypeMap, recoverRawTx } from 'utils/rawTx'
import { isValidUTF8String, fromHex, toHex } from 'utils/utf8'

import './KlayRawTransactionDecoder.scss'

type Props = {

}

class KlayRawTransactionDecoder extends Component<Props> {
  destroy$ = new Subject()

  state = {
    result: {},
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
        
        if (hex.replace('0x', '') === '') {
          this.setState({ result: {} })
          return
        }
        
        const txTypeCandidate = hex.replace('0x', '').slice(0, 2)
        
        this.setState({
          result: {
            txType: rawTxTypeMap[txTypeCandidate] || 'Legacy Transaction',
            ...recoverRawTx(hex),
          },
        })
    })
  }
  
  processTxValue = (key, value) => {
    const rawHexShowList = [
      'txType', 
      'from', 
      'to', 
      'feePayer', 
      'signature', 
      'signatures', 
      'v', 
      'r', 
      's', 
      'data', 
      'humanReadable', 
      'senderSignature', 
      'feePayerSignature', 
      'accountKey'
    ]
    
    const humanReadableCandidateList = ['from', 'to', 'feePayer']
    
    value = (humanReadableCandidateList.indexOf(key) !== -1 && fromHex(value) !== '')
    ? `${value} (${fromHex(value)})`
    : value
    
    const shouldShowAsRawHex = rawHexShowList.indexOf(key) !== -1
    
    return shouldShowAsRawHex 
      ? value 
      : new BigNumber(value === '0x' ? 0 : value).toString(10) + ` (${value})`
  }

  render() {
    const { result } = this.state

    return (
      <div className="KlayRawTransactionDecoder">
        <div className="KlayRawTransactionDecoder__inputWrapper">
          <label className="KlayRawTransactionDecoder__label">Raw Tx:</label>
          <textarea
            className="KlayRawTransactionDecoder__rawTxInput"
            ref={($rawTransactionHex) => this.$rawTransactionHex = $rawTransactionHex}
          />
        </div>
        <Arrow down />
        {Object
            .entries(result)
            .map(([key, value]) => {
              

              
              return (
                <div key={key} className="KlayRawTransactionDecoder__inputWrapper">
                  <label className="KlayRawTransactionDecoder__label">{key}:</label>
                  <input
                    className={cx('KlayRawTransactionDecoder__decodedOutput')}
                    readOnly
                    value={this.processTxValue(key, value)}
                  />
                </div>
              )
            })
          }
      </div>
    )
  }
}

export default KlayRawTransactionDecoder
