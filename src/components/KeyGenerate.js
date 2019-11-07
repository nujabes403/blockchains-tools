import React, { Component } from 'react'
import cx from 'classnames'
import { fromEvent, merge, Subject } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'
import keccak256 from 'keccak256'
import nacl from 'tweetnacl'
import base58 from 'bs58'

import Input from 'components/Input'
import ArrowDown from 'components/ArrowDown'
import ec from 'utils/elliptic'
import { putSubscriptions, unsubscribeAll, onlyWhenDesktop } from 'utils/stream'

import './KeyGenerate.scss'

type Props = {

}

class KeyGenerate extends Component<Props> {
  state = {
    focused: '',
    changeTarget: {},
    removeTarget: {},
  }

  subscriptions = []

  privateKeySubject = new Subject()

  initInputChangeStreams = () => {
    // Input Change Streams
    const privateKeyChange$ = merge(
      fromEvent(this.$privateKey, 'input').pipe(
        map((e) => e.target.value),
      ),
      this.privateKeySubject.pipe(
        tap((privateKey) => {
          this.$privateKey.value = privateKey
        })
      ),
    )

    const publicKeyChange$ = merge(
      privateKeyChange$.pipe(
        map(pvkey => {
          if (!pvkey) return ''
          const priKeyBytes = base58.decode(pvkey)
          
          const kp = nacl.sign.keyPair.fromSeed(priKeyBytes.slice(0, 32))
          const seckey = Buffer.from(kp.secretKey.buffer)
          const pubkey = seckey.slice(seckey.length / 2)
          
          return base58.encode(pubkey)
        })
      ),
      fromEvent(this.$publicKey, 'input').pipe(
        tap(this.clearPrivateKey),
        map(e => e.target.value),
      )
    )
    
    putSubscriptions(
      this.subscriptions,
      publicKeyChange$.subscribe(pbkeyRaw => {
          if (this.$publicKey.value !== pbkeyRaw) this.$publicKey.value = pbkeyRaw
        })
    )
  }

  initActiveStreams = () => {
    const privateKeyFocus$ = fromEvent(this.$privateKey, 'focus')
    const privateKeyMouseEnter$ = onlyWhenDesktop(fromEvent(this.$privateKey, 'mouseenter'))
    const privateKeyActive$ = merge(privateKeyFocus$, privateKeyMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            publicKey: true,
          }
        })
      })
    )

    const publicKeyFocus$ = fromEvent(this.$publicKey, 'focus')
    const publicKeyMouseEnter$ = onlyWhenDesktop(fromEvent(this.$publicKey, 'mouseenter'))
    const publicKeyActive$ = merge(publicKeyFocus$, publicKeyMouseEnter$).pipe(
      tap(() => {
        this.setState({
          removeTarget: {
            privateKey: true,
          }
        })
      })
    )

    putSubscriptions(
      this.subscriptions,
      privateKeyActive$.subscribe(),
      publicKeyActive$.subscribe()
    )
  }

  initDeactiveStreams = () => {
    const blur$ = merge(
      fromEvent(this.$privateKey, 'blur'),
      fromEvent(this.$publicKey, 'blur')
    )
    const mouseleave$ = merge(
      fromEvent(this.$privateKey, 'mouseleave'),
      fromEvent(this.$publicKey, 'mouseleave')
    )

    const deactive$ = merge(blur$, mouseleave$).pipe(
      filter((e) => document.activeElement !== e.fromElement),
      tap(() => {
        this.setState({
          changeTarget: {},
          removeTarget: {},
        })
      })
    )

    putSubscriptions(
      this.subscriptions,
      deactive$.subscribe()
    )
  }

  clearPrivateKey = () => {
    this.$privateKey.value = ''
  }

  genPrivateKey = () => {
    const kp = nacl.sign.keyPair()
    
    const seckey = Buffer.from(kp.secretKey.buffer)
    // this.pubkey = this.seckey.slice(this.seckey.length / 2)
    // this.id = base58.encode(this.pubkey)
    
    const generatedPrivateKey = base58.encode(seckey)
    this.privateKeySubject.next(generatedPrivateKey)
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
    const { changeTarget, removeTarget } = this.state
    return (
      <div className="KeyGenerate">
        <button className="KeyGenerate__generateButton" onClick={this.genPrivateKey}>Generate!</button>
        <div className="KeyGenerate__inputWrapper KeyGenerate__inputWrapper--privateKey">
          <label className="KeyGenerate__label">Private key:</label>
          <input
            className={cx('KeyGenerate__privateKey', {
              'KeyGenerate__privateKey--changeTarget': changeTarget.privateKey,
              'KeyGenerate__privateKey--removeTarget': removeTarget.privateKey,
            })}
            ref={($privateKey) => this.$privateKey = $privateKey}
          />
        </div>
        <ArrowDown visible={changeTarget.publicKey} />
        <div className="KeyGenerate__inputWrapper KeyGenerate__inputWrapper--publicKey">
          <label className="KeyGenerate__label">Public key:</label>
          <textarea
            className={cx('KeyGenerate__publicKey', {
              'KeyGenerate__publicKey--changeTarget': changeTarget.publicKey
            })}
            ref={($publicKey) => this.$publicKey = $publicKey}
          />
        </div>
      </div>
    )
  }
}

export default KeyGenerate
