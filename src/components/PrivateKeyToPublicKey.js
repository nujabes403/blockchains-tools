import React, { Component } from 'react'
import cx from 'classnames'
import { fromEvent, merge } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'
import keccak256 from 'keccak256'

import Input from 'components/Input'
import ec from 'utils/elliptic'

import './PrivateKeyToPublicKey.scss'

type Props = {

}

class PrivateKeyToPublicKey extends Component<Props> {
  state = {
    publicAddress: '',
    focused: '',
    changeTarget: {},
    removeTarget: {},
  }

  initInputChangeStreams = () => {
    // Input Change Streams
    const privateKeyChange$ = fromEvent(this.$privateKey, 'input').pipe(
        map(e => e.target.value.replace('0x', ''))
      )

    const publicKeyChange$ = merge(
      privateKeyChange$.pipe(
        map(pvkey => {
          try {
            const publicKeyInstance = ec.keyFromPrivate(pvkey).getPublic()
            const publicKey = '0x' + publicKeyInstance.getX().toString(16) + publicKeyInstance.getY().toString(16)
            return publicKey
          } catch (e) {
            console.log(e, 'e')
            return ''
          }
        })
      ),
      fromEvent(this.$publicKey, 'input').pipe(
        tap(this.clearPrivateKey),
        map(e => e.target.value),
      )
    )

    publicKeyChange$.subscribe(pbkeyRaw => {
        if (this.$publicKey.value !== pbkeyRaw) this.$publicKey.value = pbkeyRaw
        const pbkey = pbkeyRaw.startsWith('0x') ? pbkeyRaw : '0x' + pbkeyRaw
        this.setState({
          publicAddress: '0x' + keccak256(pbkey).toString('hex').slice(-40),
        })
      })
  }

  initActiveStreams = () => {
    const privateKeyFocus$ = fromEvent(this.$privateKey, 'focus')
    const privateKeyMouseEnter$ = fromEvent(this.$privateKey, 'mouseenter')
    const privateKeyActive$ = merge(privateKeyFocus$, privateKeyMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            publicKey: true,
            publicAddress: true,
          }
        })
      })
    )

    const publicKeyFocus$ = fromEvent(this.$publicKey, 'focus')
    const publicKeyMouseEnter$ = fromEvent(this.$publicKey, 'mouseenter')
    const publicKeyActive$ = merge(publicKeyFocus$, publicKeyMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            publicAddress: true,
          },
          removeTarget: {
            privateKey: true,
          }
        })
      })
    )

    privateKeyActive$.subscribe()
    publicKeyActive$.subscribe()
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

    deactive$.subscribe()
  }

  clearPrivateKey = () => {
    this.$privateKey.value = ''
  }

  componentDidMount() {
    this.initInputChangeStreams()
    this.initActiveStreams()
    this.initDeactiveStreams()
  }

  render() {
    const { publicAddress, changeTarget, removeTarget } = this.state
    return (
      <div className="PrivateKeyToPublicKey">
        <input
          className={cx('privateKey', {
            'privateKey--changeTarget': changeTarget.privateKey,
            'privateKey--removeTarget': removeTarget.privateKey,
          })}
          ref={($privateKey) => this.$privateKey = $privateKey}
        />
        <input
          className={cx('publicKey', {
            'publicKey--changeTarget': changeTarget.publicKey
          })}
          ref={($publicKey) => this.$publicKey = $publicKey}
        />
        <p
          className={cx('publicAddress', {
            'publicAddress--changeTarget': changeTarget.publicAddress,
          })}
          ref={($publicAddress) => this.$publicAddress = $publicAddress}
        >
          public address: {publicAddress}
        </p>
      </div>
    )
  }
}

export default PrivateKeyToPublicKey
