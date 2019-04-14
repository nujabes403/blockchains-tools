import React, { Component } from 'react'
import { Subject, fromEvent, of } from 'rxjs'
import { map, tap, take, takeUntil, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

import KlayRawTransactionDecoder from 'components/KlayRawTransactionDecoder'
import { feeDelegateLambdaURL } from 'constants/url'
import { caver } from 'utils/caver'

import './FeeDelegate.scss'

type Props = {
  
}

const generateRandomFeeDelegatedRawTx = (feedAddress, toAddress) => {
  const rawTxcandidate = [
    randomTxType1, 
    randomTxType2, 
    randomTxType3, 
    randomTxType4, 
    randomTxType5, 
    randomTxType6,
  ]
  const idx = parseInt((Math.random() * 1000) % rawTxcandidate.length)
  
  return rawTxcandidate[idx](feedAddress, toAddress)
}

const randomTxType1 = (feedAddress, toAddress) => ({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
  from: feedAddress,
  to: toAddress,
  data: `0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029`,
  gas: '3000000',
})

const randomTxType2 = (feedAddress, toAddress) => ({
  type: 'FEE_DELEGATED_VALUE_TRANSFER',
  from: feedAddress,
  to: toAddress,
  value: (parseInt(Math.random() * 1000) % 20) + 1,
  gas: '3000000',
})

const randomTxType3 = (feedAddress, toAddress) => ({
  type: 'FEE_DELEGATED_VALUE_TRANSFER_MEMO',
  from: feedAddress,
  to: toAddress,
  value: (parseInt(Math.random() * 1000) % 20) + 1,
  data: '0xec82aced86a0ec8b9c',
  gas: '3000000',
})

const randomTxType4 = (feedAddress, toAddress) => ({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
  from: feedAddress,
  to: toAddress,
  feeRatio: (parseInt(Math.random() * 1000) % 100) + 1,
  data: `0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029`,
  gas: '3000000',
})

const randomTxType5 = (feedAddress, toAddress) => ({
  type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
  from: feedAddress,
  to: toAddress,
  value: (parseInt(Math.random() * 1000) % 20) + 1,
  feeRatio: (parseInt(Math.random() * 1000) % 100) + 1,
  data: `0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029`,
  gas: '3000000',
})

const randomTxType6 = (feedAddress, toAddress) => ({
  type: 'FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO',
  from: feedAddress,
  to: toAddress,
  value: (parseInt(Math.random() * 1000) % 20) + 1,
  feeRatio: (parseInt(Math.random() * 1000) % 100) + 1,
  data: '0xeab980ed9b88ec9dbc',
  gas: '3000000',
})

class FeeDelegate extends Component<Props> {
  destroy$ = new Subject()
  
  state = {
    rawTx: '',
    receipt: null,
    isLoading: false,
    isGenerating: false,
    errorMessage: '',
  }
  
  componentDidMount() {
    fromEvent(this.decoderComp.$rawTransactionHex, 'input').pipe(
      tap((e) => {
        this.setState({
          rawTx: e.target.value,
          hasError: false,
          errorMessage: '',
        })
      }),
      takeUntil(this.destroy$),
    ).subscribe()
  }
  
  requestFeeDelegate = () => {
    const { rawTx } = this.state
    if (!rawTx) return
    
    this.setState({
      isLoading: true,
      receipt: null,
    })
    
    try {
      ajax.getJSON(feeDelegateLambdaURL + '/' + rawTx).pipe(
        map((receipt) => {
          console.log(receipt, 'receipt')
          this.setState({
            receipt: receipt,
            isLoading: false,
            hasError: false,
            errorMessage: '',
          })
        }),
        catchError((err) => {
          console.log(err, 'err')
          this.setState({
            receipt: null,
            isLoading: false,
            hasError: true,
            errorMessage: err && JSON.stringify(err.response),
          })
          
          return of('no more request')
        }),
        take(1),
      ).subscribe()
    } catch (e) {
      console.log(e, 'e')
      this.setState({
        receipt: null,
        isLoading: false,
        hasError: true,
      })
    }
  }
  
  genRandomFeeDelegateRawTx = async () => {
    this.setState({
      receipt: null,
      hasError: false,
      errorMessage: '',
      isGenerating: true,
    })
    const { address: feedAddress, privateKey } = caver.klay.accounts.create()
    const { address: toAddress } = caver.klay.accounts.create()
    
    await fetch(`https://baobab.klaytnwallet.com/api/faucet/?address=${feedAddress}`)
    
    const senderTransaction = generateRandomFeeDelegatedRawTx(feedAddress, toAddress)

    const { rawTransaction } = await caver.klay.accounts.signTransaction(senderTransaction, privateKey)
    
    this.decoderComp.$rawTransactionHex.value = rawTransaction
    this.decoderComp.$rawTransactionHex.dispatchEvent(new Event('input'))
    
    setTimeout(() => {
      this.setState({
        isGenerating: false,
      })
    }, 0)
  }
  
  render() {
    const { errorMessage, rawTx, receipt, hasError, isGenerating, isLoading } = this.state
    
    return (
      <div className="FeeDelegate">
        <p className="FeeDelegate__notice">Note: "FEE DELEGATE" tool only works when Klaytn baobab network is online.</p>
        <button
          className="FeeDelegate__genButton"
          onClick={this.genRandomFeeDelegateRawTx}
          disabled={isGenerating}
        >
          Generate random FEE_DELEGATED_XXX Raw Transaction
        </button>
        <button 
          className="FeeDelegate__requestButton"
          onClick={this.requestFeeDelegate}
          disabled={isLoading}
        >
          Request fee delegate
        </button>
        {(isGenerating || isLoading) && (
          <img
            className="FeeDelegate__loading" 
            src="/static/images/network-indicator.svg" 
          />
        )}
        {hasError && <div className="FeeDelegate__error">Error occurred. {errorMessage}</div>}
        {!hasError && receipt && (
          <div className="FeeDelegate__receipt">
            <p className="FeeDelegate__receiptHeader">Receipt: </p>
            {Object.entries(receipt).map(([fieldName, fieldValue]) => {
              return (
                <div className="FeeDelegate__receiptField">
                  {fieldName}: {fieldValue} {fieldName === 'txHash' && (
                    <a
                      target="_blank"
                      className="FeeDelegate__scopeLink" 
                      href={`https://baobab.klaytnscope.com/tx/${fieldValue}`}
                    >
                      Check Detail
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        )}
        <KlayRawTransactionDecoder title="Sender's rawTx" ref={(comp) => this.decoderComp = comp} />
      </div>
    )
  }
}

export default FeeDelegate