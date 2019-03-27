import React, { Component, createRef } from 'react'
import BigNumber from 'bignumber.js'
import { fromEvent, merge, Subject } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'

import './PebConverter.scss'

const units = {
  'peb': { title: 'peb', exponent: 0, },
  'kpeb': { title: 'kpeb', exponent: 3, },
  'Mpeb': { title: 'Mpeb', exponent: 6, },
  'Gpeb': { title: 'Gpeb(Ston)', exponent: 9, },
  'uKLAY': { title: 'uKLAY', exponent: 12, },
  'mKLAY': { title: 'mKLAY', exponent: 15, },
  'KLAY': { title: 'KLAY', exponent: 18, },
}

class PebConverter extends Component {
  destroy$ = new Subject()

  componentDidMount() {
    this.initInputChangeStreams()
  }

  componentWillUnmount() {
    this.destroy$.next(true)
  }

  initInputChangeStreams = () => {
    const unitObservables = Object.entries(units).map(([unitKey, { exponent }]) => {
        return fromEvent(this['$' + unitKey], 'input').pipe(
          map(e => {
            if (!e.target.value) return ''
            return new BigNumber(e.target.value).multipliedBy(10 ** exponent)
          })
        )
      })

    const unitChangeInPeb$ = merge(...unitObservables).pipe(
      takeUntil(this.destroy$)
    )

    unitChangeInPeb$.subscribe((valueAsPeb) => {
      Object.entries(units).forEach(([unitKey, { exponent }]) => {
          this['$' + unitKey].value = valueAsPeb
            ? valueAsPeb.dividedBy(10 ** exponent).toString(10)
            : ''
        })
    })
  }

  render() {
    return (
      <div className="PebConverter">
        {Object
            .entries(units)
            .map(([unitKey, { title }]) => (
            <div
              key={unitKey}
              className="PebConverter__inputWrapper"
            >
              <label className="PebConverter__label">{title}:</label>
              <input
                ref={($unit) => this['$' + unitKey] = $unit}
                className="PebConverter__unit"
              />
            </div>
          ))
        }
      </div>
    )
  }
}

export default PebConverter
