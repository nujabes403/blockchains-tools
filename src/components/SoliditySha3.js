import React, { Component, createRef } from 'react'
import cx from 'classnames'
import Web3 from 'web3'
import { fromEvent, merge, Subject, combineLatest } from 'rxjs'
import { map, filter, tap, takeUntil, startWith } from 'rxjs/operators'

import ArrowDown from 'components/ArrowDown'

import './SoliditySha3.scss'

const web3 = new Web3('')

const solidityTypes = [
  'uint8', 'uint16', 'uint32', 'uint64', 'uint128', 'uint256',
  'int8', 'int16', 'int32', 'int64', 'int128', 'int256',
  'address', 'string', 'bytes32',
]

type Props = {

}

class SoliditySha3 extends Component<Props> {
  destroy$ = new Subject()

  $type = createRef()

  state = {
    type: 'uint256', // default: uint256
    soliditySha3Output: '',
    changeTarget: {},
  }

  componentDidMount() {
    this.initInputChangeStreams()
    this.initActiveStreams()
    this.initDeactiveStreams()
  }

  initInputChangeStreams = () => {
    // Input Change Streams
    const soliditySha3InputChange$ = fromEvent(this.soliditySha3Input, 'input').pipe(
        startWith({ target: { value: '' }}),
        map(e => e.target.value)
      )

    const soliditySha3TypeChange$ = fromEvent(this.$type.current, 'change').pipe(
      startWith({ target: { value: 'uint256' }}),
      map(e => e.target.value)
    )

    combineLatest(
      soliditySha3InputChange$,
      soliditySha3TypeChange$,
    ).pipe(
      takeUntil(this.destroy$),
    ).subscribe(([input, type]) => {
      try {
        this.setState({
          soliditySha3Output: input && web3.utils.soliditySha3({
            type: type,
            value: input,
          }).toString('hex'),
          type,
          errorMessage: '',
        })
      } catch (e) {
        this.setState({
          errorMessage: `Value does not match with the type: ${type}`
        })
      }
    })
  }

  initActiveStreams = () => {
    const soliditySha3InputFocus$ = fromEvent(this.soliditySha3Input, 'focus')
    const soliditySha3InputMouseEnter$ = fromEvent(this.soliditySha3Input, 'mouseenter')
    const soliditySha3InputActive$ = merge(soliditySha3InputFocus$, soliditySha3InputMouseEnter$).pipe(
      tap(() => {
        this.setState({
          changeTarget: {
            soliditySha3Output: true,
          }
        })
      })
    )

    soliditySha3InputActive$.pipe(
      takeUntil(this.destroy$)
    ).subscribe()
  }

  initDeactiveStreams = () => {
    const blur$ = fromEvent(this.soliditySha3Input, 'blur')
    const mouseleave$ = fromEvent(this.soliditySha3Input, 'mouseleave')

    const deactive$ = merge(blur$, mouseleave$).pipe(
      filter((e) => document.activeElement !== e.fromElement),
      tap(() => {
        this.setState({
          changeTarget: {},
        })
      })
    )

    deactive$.pipe(
      takeUntil(this.destroy$)
    ).subscribe()
  }

  componentWillUnmount() {
    this.destroy$.next(true)
  }

  render() {
    const { changeTarget, soliditySha3Output, type, errorMessage } = this.state
    return (
      <div className="SoliditySha3">
        <div className="SoliditySha3__inputWrapper">
          <label className="SoliditySha3__typeLabel">Type:</label>
          <select
            className="SoliditySha3__typeSelect"
            ref={this.$type}
            value={type}
          >
            {solidityTypes.map((type) => <option value={type}>{type}</option>)}
          </select>
          <label className="SoliditySha3__label">Input:</label>
          <input
            className="SoliditySha3__soliditySha3Input"
            ref={(soliditySha3Input) => this.soliditySha3Input = soliditySha3Input}
          />
          {errorMessage && <p className="SoliditySha3__errorMessage">{errorMessage}</p>}
        </div>
        <ArrowDown visible={changeTarget.soliditySha3Output} />
        <div className="SoliditySha3__inputWrapper">
          <label className="SoliditySha3__label">Output:</label>
          <input
            className={cx('SoliditySha3__soliditySha3Output', {
              'SoliditySha3__soliditySha3Output--changeTarget': changeTarget.soliditySha3Output,
            })}
            readOnly
            value={soliditySha3Output}
          />
        </div>
      </div>
    )
  }
}

export default SoliditySha3
