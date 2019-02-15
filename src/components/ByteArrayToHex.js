import React, { Component } from 'react'
import cx from 'classnames'
import { fromEvent, merge } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'
import BigNumber from 'bignumber.js'

import Arrow from 'components/Arrow'
import { putSubscriptions, unsubscribeAll } from 'utils/stream'
import { parseHex } from 'utils/hex'

import './ByteArrayToHex.scss'

type Props = {

}

class ByteArrayToHex extends Component<Props> {
  state = {
    changeTarget: {},
    removeTarget: {},
  }

  subscriptions = []

  initInputChangeStreams = () => {
    // Input Change Streams
    const byteArrayChange$ = fromEvent(this.$byteArray, 'input').pipe(
      map(e => {
        if (!e.target.value) return []

        try {
          const arrayRegex = /^\[.*\]$/g
          const hasArrayParenthesis = arrayRegex.test(e.target.value)

          if (hasArrayParenthesis) {
            return eval(e.target.value)
          }

          const onlyCommaRegex = /^([0-9]{1,3},\s?)*([0-9]{1,3})$/g
          const hasOnlyCommas = onlyCommaRegex.test(e.target.value)

          if (hasOnlyCommas) {
            return eval(`[${e.target.value}]`)
          }

          const spaceBasedArrayRegex = /^([0-9]{1,3}\s)*([0-9]{1,3})$/g
          const isSpaceBasedArray = spaceBasedArrayRegex.test(e.target.value)

          if (isSpaceBasedArray) {
            return eval(`[${e.target.value.replace(/ /gi, ',')}]`)
          }

          return []
        } catch (e) {
          return []
        }
      })
    )

    const hexChange$ = fromEvent(this.$hex, 'input').pipe(
      map(e => {
        if (!e.target.value) return ''

        const hexString = e.target.value.startsWith('0x')
          ? e.target.value
          : '0x' + e.target.value

        return hexString
      })
    )

    putSubscriptions(
      this.subscriptions,
      byteArrayChange$.subscribe((byteArray) => {
        const hex = byteArray.map(num => {
            const hexNum = num.toString(16)
            return hexNum.length === 2
              ? hexNum
              : '0' + hexNum
            }).join('')

        this.$hex.value = hex && ('0x' + hex)
      }),
      hexChange$.subscribe((hexString) => {
        this.$byteArray.value = hexString
          ? JSON.stringify(parseHex(hexString)).replace(/,/gi, ', ') // replace add space between commas.
          : ''
      })
    )
  }

  initActiveStreams = () => {
    const byteArrayFocus$ = fromEvent(this.$byteArray, 'focus')
    const byteArrayMouseEnter$ = fromEvent(this.$byteArray, 'mouseenter')
    const byteArrayActive$ = merge(byteArrayFocus$, byteArrayMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            hex: true,
          }
        })
      })
    )

    const hexFocus$ = fromEvent(this.$hex, 'focus')
    const hexMouseEnter$ = fromEvent(this.$hex, 'mouseenter')
    const hexActive$ = merge(hexFocus$, hexMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            byteArray: true,
          },
        })
      })
    )

    putSubscriptions(
      this.subscriptions,
      byteArrayActive$.subscribe(),
      hexActive$.subscribe(),
    )
  }

  initDeactiveStreams = () => {
    const blur$ = merge(
      fromEvent(this.$byteArray, 'blur'),
      fromEvent(this.$hex, 'blur')
    )
    const mouseleave$ = merge(
      fromEvent(this.$byteArray, 'mouseleave'),
      fromEvent(this.$hex, 'mouseleave')
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
    const { changeTarget } = this.state
    return (
      <div className="ByteArrayToHex">
        <div className="ByteArrayToHex__inputWrapper">
          <label className="ByteArrayToHex__label">Number:</label>
          <input
            className={cx('ByteArrayToHex__byteArray', {
              'ByteArrayToHex__byteArray--changeTarget': changeTarget.byteArray,
            })}
            ref={($byteArray) => this.$byteArray = $byteArray}
            placeholder="usage i) [11, 20, 33, 45]         usage ii) 11 20 33 45          usage iii) 11, 20, 33, 45"
          />
        </div>
        <Arrow
          up={changeTarget.byteArray}
          down={changeTarget.hex}
        />
        <div className="ByteArrayToHex__inputWrapper">
          <label className="ByteArrayToHex__label">Hex:</label>
          <input
            className={cx('ByteArrayToHex__hex', {
              'ByteArrayToHex__hex--changeTarget': changeTarget.hex
            })}
            ref={($hex) => this.$hex = $hex}
            placeholder="0x0b14212d or 0b14212d"
          />
        </div>
      </div>
    )
  }
}

export default ByteArrayToHex
