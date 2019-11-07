import { BehaviorSubject, merge } from 'rxjs'

export default class {
  constructor() {
    this.view$ = new BehaviorSubject('landing')
    
    this.stateChanged$ = merge(
      this.view$
    )
  }
  
  changeView = (view) => {
    this.view$.next(view)
  }
}