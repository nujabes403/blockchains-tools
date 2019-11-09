import { Subject, BehaviorSubject, merge } from 'rxjs'

export const DEFAULT_GAS_LIMIT = '1000000'

export const TRANSACTION_STATUS = {
  'TRANSACTION_HASH': 1,
  'RECEIPT': 2,
  'ERROR': 3,
}

export default class {
  constructor() {
    const isJetstreamIntegrated = !!window.jet
    
    this.isJetstreamIntegrated$ = new BehaviorSubject(isJetstreamIntegrated)
    // inputs
    this.from$ = new BehaviorSubject('')
    this.to$ = new BehaviorSubject('')
    this.value$ = new BehaviorSubject('')
    this.data$ = new BehaviorSubject('0x')
    this.gasLimit$ = new BehaviorSubject(DEFAULT_GAS_LIMIT)
    
    // output
    this.transactionStatus$ = new BehaviorSubject(false)
    this.result$ = new BehaviorSubject(false)
    
    // fill 'from'
    if (isJetstreamIntegrated) {
      window.jet.klay.getAddress().then((address) => {
        this.from$.next(address)
      })
    }
  }
  
  handleChange = (e) => {
    switch (e.target.name) {
      case 'to': 
        this._toChange(e.target.value)
        break
      case 'value': 
        this._valueChange(e.target.value)
        break
      case 'data': 
        this._dataChange(e.target.value)
        break
      case 'gasLimit': 
        this._gasLimitChange(e.target.value)
        break
    }
  }
  
  sendTransaction = () => {
    if (!this.isJetstreamIntegrated$.value) return
    
    return window.jet.klay.sendTransaction({
      to: this.to$.value,
      value: this.value$.value,
      data: this.data$.value,
      gas: this.gasLimit$.value,
    })
      .on('transactionHash', (transactionHash) => {
        console.log(transactionHash, 'transactionHash')
        this.transactionStatus$.next(TRANSACTION_STATUS.TRANSACTION_HASH)
        this.result$.next(transactionHash)
      })
      .on('receipt', (receipt) => {
        console.log(receipt, 'receipt')
        this.transactionStatus$.next(TRANSACTION_STATUS.RECEIPT)
        this.result$.next(JSON.stringify(receipt))
      })
      .on('error', (error) => {
        console.log(error, 'error')
        this.transactionStatus$.next(TRANSACTION_STATUS.ERROR)
        this.result$.next(error && error.message)
      })
  }
  
  _toChange = (to) => {
    this.to$.next(to)
  }
  
  _valueChange = (value) => {
    this.value$.next(value)
  }
  
  _dataChange = (data) => {
    this.data$.next(data)
  }
  
  _gasLimitChange = (gasLimit) => {
    this.gasLimit$.next(gasLimit)
  }
}