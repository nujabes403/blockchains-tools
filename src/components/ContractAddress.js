import React, { Component } from 'react'
import cx from 'classnames'
import { fromEvent, merge, combineLatest } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'
import keccak256 from 'keccak256'
const rlp = require('rlp')

import ArrowDown from 'components/ArrowDown'
import { putSubscriptions, unsubscribeAll } from 'utils/stream'

import './ContractAddress.scss'

type Props = {

}

class ContractAddress extends Component<Props> {
  state = {
    changeTarget: {},
  }

  subscriptions = []

  initInputChangeStreams = () => {
    // Input Change Streams
    const senderChange$ = fromEvent(this.$sender, 'input').pipe(
      map(e => {
        if (!e.target.value) return ''
        const sender = e.target.value.startsWith('0x')
          ? e.target.value
          : '0x' + e.target.value
        return sender
      })
    )

    const nonceChange$ = fromEvent(this.$nonce, 'input').pipe(
      map(e => {
        if (!e.target.value) return ''
        return Number(e.target.value)
      })
    )

    const anyChange$ = combineLatest(
      senderChange$,
      nonceChange$,
    )

    putSubscriptions(
      this.subscriptions,
      anyChange$.subscribe(([sender, nonce]) => {
        this.setState({
          contractAddress: sender !== undefined && nonce !== undefined
            ? '0x' + keccak256(rlp.encode([sender, nonce])).toString('hex').slice(-40)
            : ''
        })
      })
    )
  }

  initActiveStreams = () => {
    const senderFocus$ = fromEvent(this.$sender, 'focus')
    const senderMouseEnter$ = fromEvent(this.$sender, 'mouseenter')
    const senderActive$ = merge(senderFocus$, senderMouseEnter$)

    const nonceFocus$ = fromEvent(this.$nonce, 'focus')
    const nonceMouseEnter$ = fromEvent(this.$nonce, 'mouseenter')
    const nonceActive$ = merge(nonceFocus$, nonceMouseEnter$)

    putSubscriptions(
      this.subscriptions,
      merge(senderActive$, nonceActive$)
        .subscribe(() => {
          this.setState({
            changeTarget: {
              contractAddress: true,
            },
          })
        })
    )
  }

  initDeactiveStreams = () => {
    const blur$ = merge(
      fromEvent(this.$sender, 'blur'),
      fromEvent(this.$nonce, 'blur')
    )
    const mouseleave$ = merge(
      fromEvent(this.$sender, 'mouseleave'),
      fromEvent(this.$nonce, 'mouseleave')
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
    const { changeTarget, contractAddress } = this.state
    return (
      <div className="ContractAddress">
        <div className="ContractAddress__inputWrapper">
          <label className="ContractAddress__label">Sender address:</label>
          <input
            className={cx('ContractAddress__sender')}
            ref={($sender) => this.$sender = $sender}
          />
        </div>
        <div className="ContractAddress__inputWrapper">
          <label className="ContractAddress__label">Nonce:</label>
          <input
            className={cx('ContractAddress__nonce')}
            ref={($nonce) => this.$nonce = $nonce}
          />
        </div>
        <ArrowDown visible={changeTarget.contractAddress} />
        <div className="ContractAddress__inputWrapper">
          <label className="ContractAddress__label">Contaract address:</label>
          <input
            className={cx('ContractAddress__contractAddress', {
              'ContractAddress__contractAddress--changeTarget': changeTarget.contractAddress,
            })}
            ref={($contractAddress) => this.$contractAddress = $contractAddress}
            value={contractAddress}
            readOnly
          />
        </div>
      </div>
    )
  }
}

export default ContractAddress
