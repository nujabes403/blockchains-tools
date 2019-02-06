import React, { Component } from 'react'
import cx from 'classnames'
import { fromEvent, merge } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'
import BigNumber from 'bignumber.js'

import './BigNumberToHex.scss'

type Props = {

}

class BigNumberToHex extends Component<Props> {
  state = {
    changeTarget: {},
    removeTarget: {},
  }

  initInputChangeStreams = () => {
    // Input Change Streams
    const bignumberChange$ = fromEvent(this.$bignumber, 'input').pipe(
      map(e => {
        if (!e.target.value) return ''

        return new BigNumber(e.target.value).toString(16)
      })
    )

    const hexChange$ = fromEvent(this.$hex, 'input').pipe(
      map(e => {
        if (!e.target.value) return ''

        const decimalBignumber = e.target.value.startsWith('0x')
          ? e.target.value
          : '0x' + e.target.value

        return new BigNumber(decimalBignumber).toString(10)
      })
    )

    bignumberChange$.subscribe((hex) => {
      this.$hex.value = hex
    })

    hexChange$.subscribe((decimalBignumber) => {
      this.$bignumber.value = decimalBignumber
    })
  }

  initActiveStreams = () => {
    const bignumberFocus$ = fromEvent(this.$bignumber, 'focus')
    const bignumberMouseEnter$ = fromEvent(this.$bignumber, 'mouseenter')
    const bignumberActive$ = merge(bignumberFocus$, bignumberMouseEnter$).pipe(
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
            bignumber: true,
          },
        })
      })
    )

    bignumberActive$.subscribe()
    hexActive$.subscribe()
  }

  initDeactiveStreams = () => {
    const blur$ = merge(
      fromEvent(this.$bignumber, 'blur'),
      fromEvent(this.$hex, 'blur')
    )
    const mouseleave$ = merge(
      fromEvent(this.$bignumber, 'mouseleave'),
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

    deactive$.subscribe()
  }

  componentDidMount() {
    this.initInputChangeStreams()
    this.initActiveStreams()
    this.initDeactiveStreams()
  }

  render() {
    const { changeTarget } = this.state
    return (
      <div className="BigNumberToHex">
        <div className="BigNumberToHex__inputWrapper">
          <label className="BigNumberToHex__label">Bignumber:</label>
          <input
            className={cx('BigNumberToHex__bignumber', {
              'BigNumberToHex__bignumber--changeTarget': changeTarget.bignumber,
            })}
            ref={($bignumber) => this.$bignumber = $bignumber}
          />
        </div>
        <div className="BigNumberToHex__inputWrapper">
          <label className="BigNumberToHex__label">Hex:</label>
          <input
            className={cx('BigNumberToHex__hex', {
              'BigNumberToHex__hex--changeTarget': changeTarget.hex
            })}
            ref={($hex) => this.$hex = $hex}
          />
        </div>
      </div>
    )
  }
}

export default BigNumberToHex
