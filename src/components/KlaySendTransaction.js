import React, { Component, createRef } from 'react'
import { Subject, merge } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'

import Bloc, { DEFAULT_GAS_LIMIT, TRANSACTION_STATUS } from './KlaySendTransaction.bloc'

import './KlaySendTransaction.scss'

type Props = {
  
}

const inputs = [
  { name: 'to', label: 'To' },
  { name: 'value', label: 'Value' },
  { name: 'data', label: 'Data' },
  { name: 'gasLimit', label: 'Gas Limit', defaultValue: DEFAULT_GAS_LIMIT },
]

class KlaySendTransaction extends Component<Props> {
  destroy$ = new Subject()

  bloc = new Bloc()

  componentDidMount() {
    merge(
      // inputs
      this.bloc.from$,
      this.bloc.to$,
      this.bloc.value$,
      this.bloc.data$,
      this.bloc.gasLimit$,
      
      // outputs
      this.bloc.transactionStatus$,
      this.bloc.result$,
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.destroy$.next(true)
  }
  
  send = () => {
    this.bloc.sendTransaction()
  }
  
  renderResult = () => {
    switch (this.bloc.transactionStatus$.value) {
      case TRANSACTION_STATUS.TRANSACTION_HASH:
        return `SENDING: ${this.bloc.result$.value}`
      case TRANSACTION_STATUS.RECEIPT:
        return `RECEIPT: ${this.bloc.result$.value}`
      case TRANSACTION_STATUS.ERROR:
        return `ERROR: ${this.bloc.result$.value}`
    }
  }

  render() {
    const isJetstreamIntegrated = this.bloc.isJetstreamIntegrated$.value
    
    return (
      <div className="KlaySendTransaction">
        {!isJetstreamIntegrated && (
          <div className="KlaySendTransaction__pleaseInstall">
            Please install&nbsp;
            <a 
              target="_blank"
              className="KlaySendTransaction__link" 
              href="https://jetstream.world"
            >
              Jetstream
            </a>
            &nbsp;and integrate Klaytn wallet
          </div>
        )}
        <div className="KlaySendTransaction__inputWrapper">
          <label className="KlaySendTransaction__label">From:</label>
          <input
            value={this.bloc.from$.value}
            onChange={() => {}}
            className="KlaySendTransaction__input"
            disabled={!isJetstreamIntegrated}
          />
        </div>
        {inputs.map(({ label, name, defaultValue }) => {
          return (
            <div key={name} className="KlaySendTransaction__inputWrapper">
              <label className="KlaySendTransaction__label">{label}:</label>
              <input
                defaultValue={defaultValue}
                name={name}
                onChange={this.bloc.handleChange}
                className="KlaySendTransaction__input"
                disabled={!isJetstreamIntegrated}
              />
            </div>  
          )
        })}
        <button 
          className="KlaySendTransaction__sendButton"
          disabled={!isJetstreamIntegrated}
          onClick={this.send}
        >
          Send
        </button>
        {this.bloc.transactionStatus$.value && (
          <div className="KlaySendTransaction__result">
            {this.renderResult()}
          </div>
        )}
      </div>
    )
  }
}

export default KlaySendTransaction