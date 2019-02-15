import React, { Component } from 'react'
const rlp = require('rlp')
const { bytes } = require('eth-lib')
import cx from 'classnames'
import { fromEvent, merge, Subject, empty } from 'rxjs'
import { map, filter, tap, takeUntil } from 'rxjs/operators'

import Arrow from 'components/Arrow'
import { putSubscriptions, unsubscribeAll, onlyWhenDesktop } from 'utils/stream'

import './RLP.scss'

type Props = {

}

class RLP extends Component<Props> {
  destroy$ = new Subject()

  state = {
    changeTarget: {},
    removeTarget: {},
  }

  subscriptions = []

  initInputChangeStreams = () => {
    // Input Change Streams
    const decodedChange$ = fromEvent(this.$decoded, 'input').pipe(
      map(e => {
        if (!e.target.value) return ''
        try {
          const encoded = rlp.encode(eval(e.target.value))
          return '0x' + encoded.reduce((acc, cur) => {
            acc += Number(cur).toString(16)
            return acc
          }, '')
        } catch (e) {
          return ''
        }
      }),
      takeUntil(this.destroy$)
    )

    const encodedChange$ = fromEvent(this.$encoded, 'input').pipe(
      map(e => {
        if (!e.target.value) return ''
        try {
          const isHex = e.target.value.startsWith('0x')

          const decoded = isHex
            ? rlp.decode(this.hexToUint8Array(e.target.value))
            : rlp.decode(eval(e.target.value))
          const decodedAsHex = decoded instanceof Array
            ? decoded.map(item => this.Uint8ArrayToHex(item))
            : this.Uint8ArrayToHex(decoded)

          const decodedAsAscii = decodedAsHex instanceof Array
            ? '[' + decodedAsHex.map((item, idx) => '"' + this.hexToAscii(item) + '"') + ']'
            : '"' + this.hexToAscii(decodedAsHex) + '"'

          return {
            decodedAsAscii,
            decoded: decodedAsHex instanceof Array
              ? '0x' + decodedAsHex.join('')
              : decodedAsHex
          }
        } catch (e) {
          return {
            decoded: '',
            decodedAsAscii: '',
          }
        }

        return e.target.value
      }),
      takeUntil(this.destroy$)
    )

    decodedChange$.subscribe((encoded) => {
      this.$encoded.value = bytes.fromNat(encoded)
      this.setState({
        decodedAsHex: '',
      })
    }),
    encodedChange$.subscribe(({ decoded, decodedAsAscii }) => {
      this.$decoded.value = decodedAsAscii || ''
      this.setState({
        decodedAsHex: decoded,
      })
    })
  }

  hexToUint8Array = (hex) => {
    const cleanhex = hex.replace('0x', '')
    return new Uint8Array(cleanhex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
  }

  Uint8ArrayToHex = (array) => {
    return [...array].reduce((acc, cur) => (acc += Number(cur).toString(16), acc), '')
  }

  hexToAscii = (hexx) => {
    var hex  = hexx.toString()
    var str = ''
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
    }
    return str
  }

  initActiveStreams = () => {
    const decodedFocus$ = fromEvent(this.$decoded, 'focus')
    const decodedMouseEnter$ = onlyWhenDesktop(fromEvent(this.$decoded, 'mouseenter'))
    const decodedActive$ = merge(decodedFocus$, decodedMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            encoded: true,
          }
        })
      })
    )

    const encodedFocus$ = fromEvent(this.$encoded, 'focus')
    const encodedMouseEnter$ = onlyWhenDesktop(fromEvent(this.$encoded, 'mouseenter'))
    const encodedActive$ = merge(encodedFocus$, encodedMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            decoded: true,
          },
        })
      })
    )

    putSubscriptions(
      this.subscriptions,
      decodedActive$.subscribe(),
      encodedActive$.subscribe(),
    )
  }

  initDeactiveStreams = () => {
    const blur$ = merge(
      fromEvent(this.$decoded, 'blur'),
      fromEvent(this.$encoded, 'blur')
    )
    const mouseleave$ = merge(
      fromEvent(this.$decoded, 'mouseleave'),
      fromEvent(this.$encoded, 'mouseleave')
    )

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
      deactive$.subscribe(),
    )
  }

  componentDidMount() {
    this.initInputChangeStreams()
    this.initActiveStreams()
    this.initDeactiveStreams()
  }

  componentWillUnmount() {
    unsubscribeAll(this.subscriptions)
  }

  render() {
    const { changeTarget, decodedAsHex } = this.state
    return (
      <div className="RLP">
        <div className="RLP__inputWrapper">
          <label className="RLP__label">Decoded(Raw):</label>
          <input
            className={cx('RLP__decoded', {
              'RLP__decoded--changeTarget': changeTarget.decoded,
            })}
            ref={($decoded) => this.$decoded = $decoded}
            placeholder={`i) "dog"        ii) ["dog", "cat"]`}
          />
          {decodedAsHex && <p className="RLP__decodedAsAscii">Hex: {decodedAsHex}</p>}
        </div>
        <Arrow
          up={changeTarget.decoded}
          down={changeTarget.encoded}
        />
        <div className="RLP__inputWrapper">
          <label className="RLP__label">Encoded:</label>
          <input
            className={cx('RLP__encoded', {
              'RLP__encoded--changeTarget': changeTarget.encoded
            })}
            ref={($encoded) => this.$encoded = $encoded}
            placeholder={`i) 0x83646f67        ii) 0xc883646f6783636174`}
          />
        </div>
      </div>
    )
  }
}

export default RLP
