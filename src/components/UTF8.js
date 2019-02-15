import React, { Component } from 'react'
import cx from 'classnames'
import { fromEvent, merge } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'

import Arrow from 'components/Arrow'
import { toHex, fromHex } from 'utils/utf8'
import { putSubscriptions, unsubscribeAll, onlyWhenDesktop } from 'utils/stream'

import './UTF8.scss'

type Props = {

}

class UTF8 extends Component<Props> {
  state = {
    changeTarget: {},
    removeTarget: {},
  }

  subscriptions = []

  initInputChangeStreams = () => {
    // Input Change Streams
    const utf8Change$ = fromEvent(this.$utf8, 'input').pipe(
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
      utf8Change$.subscribe((utf8String) => {
        this.$hex.value = toHex(utf8String)
      }),
      hexChange$.subscribe((hex) => {
        this.$utf8.value = fromHex(hex)
      })
    )
  }

  initActiveStreams = () => {
    const utf8Focus$ = fromEvent(this.$utf8, 'focus')
    const utf8MouseEnter$ = onlyWhenDesktop(fromEvent(this.$utf8, 'mouseenter'))
    const utf8Active$ = merge(utf8Focus$, utf8MouseEnter$).pipe(
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
            utf8: true,
          },
        })
      })
    )

    putSubscriptions(
      this.subscriptions,
      utf8Active$.subscribe(),
      hexActive$.subscribe()
    )
  }

  initDeactiveStreams = () => {
    const blur$ = merge(
      fromEvent(this.$utf8, 'blur'),
      fromEvent(this.$hex, 'blur')
    )
    const mouseleave$ = merge(
      fromEvent(this.$utf8, 'mouseleave'),
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
      <div className="UTF8">
        <div className="UTF8__inputWrapper">
          <label className="UTF8__label">String(UTF8):</label>
          <input
            className={cx('UTF8__utf8', {
              'UTF8__utf8--changeTarget': changeTarget.utf8,
            })}
            ref={($utf8) => this.$utf8 = $utf8}
          />
        </div>
        <Arrow
          up={changeTarget.utf8}
          down={changeTarget.hex}
        />
        <div className="UTF8__inputWrapper">
          <label className="UTF8__label">Hex:</label>
          <input
            className={cx('UTF8__hex', {
              'UTF8__hex--changeTarget': changeTarget.hex
            })}
            ref={($hex) => this.$hex = $hex}
          />
        </div>
      </div>
    )
  }
}

export default UTF8
