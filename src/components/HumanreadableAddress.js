import React, { Component } from 'react'
import cx from 'classnames'
import { fromEvent, merge } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'

import Arrow from 'components/Arrow'
import { toHex, fromHex } from 'utils/utf8'
import { putSubscriptions, unsubscribeAll, onlyWhenDesktop } from 'utils/stream'

import './HumanreadableAddress.scss'

type Props = {

}

class HumanreadableAddress extends Component<Props> {
  state = {
    changeTarget: {},
    removeTarget: {},
  }

  subscriptions = []

  initInputChangeStreams = () => {
    // Input Change Streams
    const humanreadableChange$ = fromEvent(this.$humanreadableString, 'input').pipe(
      map(e => e.target.value)
    )

    const hexChange$ = fromEvent(this.$hex, 'input').pipe(
      map(e => {
        return e.target.value.startsWith('0x')
          ? e.target.value
          : '0x' + e.target.value
      })
    )

    putSubscriptions(
      this.subscriptions,
      humanreadableChange$.subscribe((humanreadableString) => {
        this.$hex.value = '0x' + toHex(humanreadableString).padEnd(20 * 2, '0')
      }),
      hexChange$.subscribe((hex) => {
        this.$humanreadableString.value = fromHex(hex)
      })
    )
  }

  initActiveStreams = () => {
    const humanreadableStringFocus$ = fromEvent(this.$humanreadableString, 'focus')
    const humanreadableStringMouseEnter$ = onlyWhenDesktop(fromEvent(this.$humanreadableString, 'mouseenter'))
    const humanreadableStringActive$ = merge(humanreadableStringFocus$, humanreadableStringMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            hex: true,
          }
        })
      })
    )

    const hexFocus$ = fromEvent(this.$hex, 'focus')
    const hexMouseEnter$ = onlyWhenDesktop(fromEvent(this.$hex, 'mouseenter'))
    const hexActive$ = merge(hexFocus$, hexMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            humanreadableString: true,
          },
        })
      })
    )

    putSubscriptions(
      this.subscriptions,
      humanreadableStringActive$.subscribe(),
      hexActive$.subscribe()
    )
  }

  initDeactiveStreams = () => {
    const blur$ = merge(
      fromEvent(this.$humanreadableString, 'blur'),
      fromEvent(this.$hex, 'blur')
    )
    const mouseleave$ = merge(
      fromEvent(this.$humanreadableString, 'mouseleave'),
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
      deactive$.subscribe()
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
      <div className="HumanreadableAddress">
        <div className="HumanreadableAddress__inputWrapper">
          <label className="HumanreadableAddress__label">Human-readable string:</label>
          <input
            className={cx('HumanreadableAddress__humanreadableString', {
              'HumanreadableAddress__humanreadableString--changeTarget': changeTarget.humanreadableString,
            })}
            ref={($humanreadableString) => this.$humanreadableString = $humanreadableString}
          />
        </div>
        <Arrow
          up={changeTarget.humanreadableString}
          down={changeTarget.hex}
        />
        <div className="HumanreadableAddress__inputWrapper">
          <label className="HumanreadableAddress__label">Human-readable address in HEX:</label>
          <input
            className={cx('HumanreadableAddress__hex', {
              'HumanreadableAddress__hex--changeTarget': changeTarget.hex
            })}
            ref={($hex) => this.$hex = $hex}
          />
        </div>
      </div>
    )
  }
}

export default HumanreadableAddress
