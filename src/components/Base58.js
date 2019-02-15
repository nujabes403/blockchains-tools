import React, { Component } from 'react'
import cx from 'classnames'
import { fromEvent, merge } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'
import bs58 from 'bs58'

import Arrow from 'components/Arrow'
import { putSubscriptions, unsubscribeAll, onlyWhenDesktop } from 'utils/stream'

import './Base58.scss'

type Props = {

}

class Base58 extends Component<Props> {
  state = {
    changeTarget: {},
    removeTarget: {},
  }

  subscriptions = []

  initInputChangeStreams = () => {
    // Input Change Streams
    const encodeStart$ = fromEvent(this.$decoded, 'input').pipe(
      map(e => {
        try {
          if (e.target.value.startsWith('0x')) {
            const hexBuffer = Buffer.from(e.target.value.replace('0x', ''), 'hex')
            return bs58.encode(hexBuffer)
          } else {
            const normalBuffer = Buffer.from(e.target.value)
            return bs58.encode(normalBuffer)
          }
        } catch (err) {
          if (err.message === 'Invalid hex string') {
            const buffer = Buffer.from(e.target.value.replace('0x', ''))
            return bs58.encode(buffer)
          }

          console.log(e)
          return ''
        }
      })
    )

    const decodeStart$ = fromEvent(this.$encoded, 'input').pipe(
      map(e => {
        return bs58.decode(e.target.value).toString('hex')
      })
    )

    putSubscriptions(
      this.subscriptions,
      encodeStart$.subscribe((encoded) => {
        this.$encoded.value = encoded
      }),
      decodeStart$.subscribe((decoded) => {
        this.$decoded.value = decoded
      })
    )
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
    const { changeTarget } = this.state
    return (
      <div className="Base58">
        <div className="Base58__inputWrapper">
          <label className="Base58__label">Raw (Base58 Decoded):</label>
          <input
            className={cx('Base58__decoded', {
              'Base58__decoded--changeTarget': changeTarget.decoded,
            })}
            ref={($decoded) => this.$decoded = $decoded}
          />
        </div>
        <Arrow
          up={changeTarget.decoded}
          down={changeTarget.encoded}
        />
        <div className="Base58__inputWrapper">
          <label className="Base58__label">Base58 Encoded:</label>
          <input
            className={cx('Base58__encoded', {
              'Base58__encoded--changeTarget': changeTarget.encoded
            })}
            ref={($encoded) => this.$encoded = $encoded}
          />
        </div>
      </div>
    )
  }
}

export default Base58
