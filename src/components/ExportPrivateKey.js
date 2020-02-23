import React, { Component, createRef } from 'react'
import cx from 'classnames'
import { Subject, merge } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'

import Bloc from './ExportPrivateKey.bloc'

import './ExportPrivateKey.scss'

type Props = {
  
}

class ExportPrivateKey extends Component<Props> {
  destroy$ = new Subject()

  bloc = new Bloc()

  componentDidMount() {
    merge(
      this.bloc.encryptedFile$,
      this.bloc.password$,
      this.bloc.privateKey$,
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.destroy$.next(true)
  }

  render() {
    return (
      <div className="ExportPrivateKey">
        <div className="ExportPrivateKey__inputWrapper">
          <label className="ExportPrivateKey__label">Jetstream Encrypted File:</label>
          <input
            type="file" 
            onChange={this.bloc.importFile}
            className={cx('ExportPrivateKey__file')}
          />
        </div>
        
        <div className="ExportPrivateKey__inputWrapper">
          <label className="ExportPrivateKey__label">File Password:</label>
          <input
            type="password"
            onChange={this.bloc.passwordChange}
            className={cx('ExportPrivateKey__password')}
          />
        </div>
        
        {this.bloc.privateKey$.value && (
          <div className="ExportPrivateKey__inputWrapper">
            <label className="ExportPrivateKey__label">Private Key:</label>
            <input
              value={this.bloc.privateKey$.value}
              className={cx('ExportPrivateKey__password')}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ExportPrivateKey