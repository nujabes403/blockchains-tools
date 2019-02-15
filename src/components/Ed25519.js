import React, { Component } from 'react'
import cx from 'classnames'
import nacl from 'tweetnacl'
import { fromEvent, merge } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'

import ArrowDown from 'components/ArrowDown'
import { putSubscriptions, unsubscribeAll } from 'utils/stream'

import './Ed25519.scss'

type Props = {

}

class Ed25519 extends Component<Props> {
  state = {
    publicKey: '',
    changeTarget: {},
  }

  subscriptions = []

  componentDidMount() {
    this.initInputChangeStreams()
    this.initActiveStreams()
    this.initDeactiveStreams()
  }

  initInputChangeStreams = () => {
    // Input Change Streams
    const privateKeyChange$ = fromEvent(this.$privateKey, 'input').pipe(
        map(e => {
          const privateKey = e.target.value.replace('0x', '')
          try {
            return Buffer.from(privateKey, 'hex')
          } catch (e) {
            return privateKey
          }
        })
      )

    putSubscriptions(
      this.subscriptions,
      privateKeyChange$.subscribe((input) => {
        try {
          const publicKey = '0x' +
          [...nacl.sign.keyPair.fromSecretKey(input).publicKey]
            .map(num => {
              const hexNum = num.toString(16)
              return hexNum.length === 2
                ? hexNum
                : '0' + hexNum
            })
            .join('')
          this.setState({
            publicKey: publicKey,
          })
        } catch (e) {
          this.setState({
            publicKey: ''
          })
          return ''
        }
      })
    )
  }

  initActiveStreams = () => {
    const privateKeyFocus$ = fromEvent(this.$privateKey, 'focus')
    const privateKeyMouseEnter$ = fromEvent(this.$privateKey, 'mouseenter')
    const privateKeyActive$ = merge(privateKeyFocus$, privateKeyMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            publicKey: true,
          }
        })
      })
    )

    putSubscriptions(
      this.subscriptions,
      privateKeyActive$.subscribe()
    )
  }

  initDeactiveStreams = () => {
    const blur$ = fromEvent(this.$privateKey, 'blur')
    const mouseleave$ = fromEvent(this.$privateKey, 'mouseleave')

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

  componentWillUnmount() {
    unsubscribeAll(this.subscriptions)
  }

  render() {
    const { changeTarget, publicKey } = this.state
    return (
      <div className="Ed25519">
        <div className="Ed25519__inputWrapper">
          <label className="Ed25519__label">Private key:</label>
          <input
            className="Ed25519__privateKey"
            ref={($privateKey) => this.$privateKey = $privateKey}
          />
        </div>
        <ArrowDown visible={changeTarget.publicKey} />
        <div className="Ed25519__inputWrapper">
          <label className="Ed25519__label">Public key:</label>
          <input
            className={cx('Ed25519__publicKey', {
              'Ed25519__publicKey--changeTarget': changeTarget.publicKey,
            })}
            readOnly
            value={publicKey}
          />
        </div>
      </div>
    )
  }
}

export default Ed25519
