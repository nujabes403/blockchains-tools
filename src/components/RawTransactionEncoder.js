import React, { Component, createRef } from 'react'
import cx from 'classnames'
import BigNumber from 'bignumber.js'
import { of, fromEvent, merge, combineLatest, Subject, BehaviorSubject, empty } from 'rxjs'
import { map, filter, tap, startWith, takeUntil } from 'rxjs/operators'
const { RLP: rlp, account: Account, hash: Hash, nat: Nat, bytes } = require('eth-lib')

import Arrow from 'components/Arrow'
import { onlyWhenDesktop } from 'utils/stream'

import './RawTransactionEncoder.scss'

type Props = {

}

class RawTransactionEncoder extends Component<Props> {
  destroy$ = new Subject()
  signMaterial$ = new BehaviorSubject()
  signatureCreated$ = new Subject()

  $rawTransactionHex = createRef()

  state = {
    changeTarget: {},
    hasSignature: true,
  }

  componentDidMount() {
    this.initTxParamChangeStreams()
    this.initPrivateKeyChangeStreams()
    this.initActiveStreams()
    this.initDeactiveStreams()
  }

  initTxParamChangeStreams = () => {

    const txParamCommonObservable = ($elem) => {
      return fromEvent($elem, 'input').pipe(
        map(e => {
          return e.target.value
            ? '0x' + new BigNumber(e.target.value).toString(16)
            : '0x'
        }),
        startWith('0x'),
      )
    }

    const txSignatureParamCommonObservable = ($elem) => {
      return fromEvent($elem, 'input').pipe(
        map(e => {
          if (!e.target.value) return '0x'
          return e.target.value.startsWith('0x')
            ? e.target.value
            : '0x' + e.target.value
        }),
        startWith('0x'),
      )
    }

    const toChange$ = fromEvent(this.$to, 'input').pipe(
      map(e => {
        return e.target.value.startsWith('0x')
          ? e.target.value
          : '0x' + e.target.value
      }),
      startWith('0x'),
    )

    const txParameterChange$ = combineLatest(
      txParamCommonObservable(this.$nonce),
      txParamCommonObservable(this.$gasPrice),
      txParamCommonObservable(this.$gasLimit),
      toChange$,
      txParamCommonObservable(this.$value),
      txParamCommonObservable(this.$data),
      txParamCommonObservable(this.$chainId),
      merge(
        this.signatureCreated$.pipe(
            map(([v, r, s]) => v),
            tap(v => {
              this.$v.value = v
            })
          ),
        txSignatureParamCommonObservable(this.$v)
      ),
      merge(
        this.signatureCreated$.pipe(
            map(([v, r, s]) => r),
            tap((r) => {
              this.$r.value = r
            })
          ),
        txSignatureParamCommonObservable(this.$r)
      ),
      merge(
        this.signatureCreated$.pipe(
            map(([v, r, s]) => s),
            tap((s) => {
              this.$s.value = s
            })
          ),
        txSignatureParamCommonObservable(this.$s)
      )
    ).pipe(
      takeUntil(this.destroy$),
    )

    txParameterChange$.subscribe((txParameters) => {
      const [nonce, gasPrice, gasLimit, to, value, data, chainId, v, r, s] = txParameters

      const _chainId = chainId === '0x' ? '0x1' : chainId

      const rlpEncoded = rlp.encode([
        bytes.fromNat(nonce),
        bytes.fromNat(gasPrice),
        bytes.fromNat(gasLimit),
        to.toLowerCase(),
        bytes.fromNat(value),
        bytes.fromNat(data),
        bytes.fromNat(_chainId),
        "0x",
        "0x",
      ])

      const messageHash = Hash.keccak256(rlpEncoded)

      const rlpDecoded = rlp.decode(rlpEncoded)

      const rawTransaction = rlp.encode(
        rlpDecoded.slice(0, 6).concat([
            bytes.fromNat(v),
            bytes.fromNat(r),
            bytes.fromNat(s),
          ]))

      this.$rawTransactionHex.current.value = rawTransaction

      this.signMaterial$.next({
        chainId: _chainId,
        messageHash,
      })
    })
  }

  initPrivateKeyChangeStreams = () => {
    const privateKeyChange$ = fromEvent(this.$privateKey, 'input').pipe(
      map(e => {
        return e.target.value.startsWith('0x')
          ? e.target.value
          : '0x' + new BigNumber(e.target.value).toString(16)
      }),
      takeUntil(this.destroy$)
    )

    privateKeyChange$.subscribe((privateKey) => {

      const { messageHash, chainId } = this.signMaterial$.value

      try {
        const signature = Account.makeSigner(
          Nat.toNumber(chainId || "0x1") * 2 + 35
        )(messageHash, privateKey)

        const [v, r, s] = Account.decodeSignature(signature)
          .map(sig => bytes.fromNat(sig))

        this.signatureCreated$.next([v, r, s])

      } catch (e) {
        console.log(e)
      }
    })
  }

  initActiveStreams = () => {
    const txParaminputElems = [
      this.$nonce,
      this.$gasPrice,
      this.$gasLimit,
      this.$to,
      this.$value,
      this.$data,
      this.$chainId,
      this.$v,
      this.$r,
      this.$s,
      this.$privateKey,
    ]

    const focusObservables = txParaminputElems.map(($elem) => fromEvent($elem, 'focus'))
    const mouseenterObservables = txParaminputElems.map(($elem) => onlyWhenDesktop(fromEvent($elem, 'mouseenter')))

    const txParamInputActive$ = merge(
      ...focusObservables,
      ...mouseenterObservables,
    ).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            rawTransaction: true,
          }
        })
      }),
      takeUntil(this.destroy$),
    )

    txParamInputActive$.subscribe()
  }

  initDeactiveStreams = () => {
    const txParaminputElems = [
      this.$nonce,
      this.$gasPrice,
      this.$gasLimit,
      this.$to,
      this.$value,
      this.$data,
      this.$chainId,
      this.$v,
      this.$r,
      this.$s,
      this.$privateKey,
    ]

    const blurObservables = txParaminputElems.map(($elem) => fromEvent($elem, 'blur'))
    const mouseleaveObservables = txParaminputElems.map(($elem) => fromEvent($elem, 'mouseleave'))

    const deactive$ = merge(
      ...blurObservables,
      ...mouseleaveObservables,
    ).pipe(
      filter((e) => document.activeElement !== e.fromElement),
      tap(() => {
        this.setState({
          changeTarget: {},
        })
      }),
      takeUntil(this.destroy$)
    )

    deactive$.subscribe()
  }

  componentWillUnmount() {
    this.destroy$.next(true)
  }

  handleCheck = () => {
    this.setState({ hasSignature: !this.state.hasSignature })
  }

  render() {
    const { changeTarget, hasSignature } = this.state

    const txParameters = ['nonce', 'gasPrice', 'gasLimit', 'to', 'value', 'data']
    const txSignatures = ['v', 'r', 's']
    const signMaterial = ['chainId', 'privateKey']

    return (
      <div className="RawTransactionEncoder">
        {txParameters.map((txParameter) => (
            <div className="RawTransactionEncoder__inputWrapper">
              <label className="RawTransactionEncoder__label">{txParameter}:</label>
              <input
                key={txParameter}
                ref={($txParameter) => this['$' + txParameter] = $txParameter}
                className={cx('RawTransactionEncoder__txParameter')}
              />
            </div>
          ))
        }
        <label>
          <input
            type="checkbox"
            checked={hasSignature}
            onChange={this.handleCheck}
          />
          Already have signatures (Doesn't need to sign transaction with a private key)
        </label>
        {signMaterial.map((material) => (
          <div className={cx('RawTransactionEncoder__inputWrapper', {
              'RawTransactionEncoder__inputWrapper--invisible': hasSignature,
            })}
          >
            <label className="RawTransactionEncoder__label">{material}:</label>
            <input
              key={material}
              ref={($material) => this['$' + material] = $material}
              className={cx('RawTransactionEncoder__txParameter')}
            />
          </div>
        ))}
        {txSignatures.map((txSignature) => (
          <div className={cx('RawTransactionEncoder__inputWrapper', {
            'RawTransactionEncoder__inputWrapper--readOnly': !hasSignature,
          })}>
            <label className="RawTransactionEncoder__label">{txSignature}:</label>
            <input
              key={txSignature}
              ref={($txSignature) => this['$' + txSignature] = $txSignature}
              className={cx('RawTransactionEncoder__txParameter')}
              readOnly={!hasSignature}
            />
          </div>
        ))}
        <Arrow down />
        <div className="RawTransactionEncoder__inputWrapper">
          <label className="RawTransactionEncoder__label">Raw transaction:</label>
          <textarea
            className={cx('RawTransactionEncoder__rawTransaction', {
              'RawTransactionEncoder__rawTransaction--changeTarget': changeTarget.rawTransaction,
            })}
            ref={this.$rawTransactionHex}
            readOnly
          />
        </div>
      </div>
    )
  }
}

export default RawTransactionEncoder
