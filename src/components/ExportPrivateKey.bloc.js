import { BehaviorSubject } from 'rxjs'
import { caver } from 'utils/caver'

export default class {
  constructor() {
    this.encryptedFile$ = new BehaviorSubject(null)
    this.password$ = new BehaviorSubject('')
    this.privateKey$ = new BehaviorSubject('')
  }
  
  importFile = (e) => {
    let json
    
    const file = e.target.files[0] // FileList object

    // files is a FileList of File objects. List some properties.
    var reader = new FileReader()

    // Closure to capture the file information.
    reader.onload = (e) => {
      try {
        json = JSON.parse(e.target.result)
        this.encryptedFile$.next(json && json['KLAYTN'])
      } catch (ex) {
        alert('Invalid file')
      }
    }
    
    reader.readAsText(file)
  }
  
  passwordChange = (e) => {
    this.password$.next(e.target.value)
    
    try {
      const walletInstance = caver.klay.accounts.decrypt(this.encryptedFile$.value, this.password$.value)
      this.privateKey$.next(walletInstance && walletInstance.privateKey)
      this.password$.next('')
    } catch (e) {
      console.log(e, '*e')
    }
    
  }
}