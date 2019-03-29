import React, { Component, createRef } from 'react'
import BigNumber from 'bignumber.js'
import { fromEvent, merge, Subject } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'

import './WeiConverter.scss'

const units = {
  'wei': { title: 'Wei', exponent: 0, },
  'kwei': { title: 'Kwei', exponent: 3, },
  'mwei': { title: 'Mwei', exponent: 6, },
  'gwei': { title: 'Gwei(Shannon)', exponent: 9, },
  'szabo': { title: 'Szabo(Microether)', exponent: 12, },
  'finney': { title: 'Finney(Milliether)', exponent: 15, },
  'ether': { title: 'Ether', exponent: 18, },
}

class WeiConverter extends Component {
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
            return {
              unitKey: unitKey,
              val: new BigNumber(e.target.value).multipliedBy(10 ** exponent)
            }
          })
        )
      })

    const unitChangeInWei$ = merge(...unitObservables).pipe(
      takeUntil(this.destroy$)
    )

    unitChangeInWei$.subscribe(({ val: valueAsWei, unitKey: originUnitKey }) => {
      Object.entries(units).forEach(([unitKey, { exponent }]) => {
          if (originUnitKey === unitKey) return
          this['$' + unitKey].value = valueAsWei
            ? valueAsWei.dividedBy(10 ** exponent).toString(10)
            : ''
        })
    })
  }

  render() {
    return (
      <div className="WeiConverter">
        {Object
            .entries(units)
            .map(([unitKey, { title }]) => (
            <div
              key={unitKey}
              className="WeiConverter__inputWrapper"
            >
              <label className="WeiConverter__label">{title}:</label>
              <input
                ref={($unit) => this['$' + unitKey] = $unit}
                className="WeiConverter__unit"
              />
            </div>
          ))
        }
      </div>
    )
  }
}

export default WeiConverter
