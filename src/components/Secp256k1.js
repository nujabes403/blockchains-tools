import React, { Component } from 'react'
import BigNumber from 'bignumber.js'
require('d3')
const functionPlot = require('function-plot')

import './Secp256k1.scss'

type Props = {

}

const applySecp256k1Equation = (x) => {
  if (x instanceof BigNumber) {
    return x.pow(3).plus(7).sqrt().toString(10)
  }
  Math.sqrt(x ** 3 + 7)
}

class Secp256k1 extends Component<Props> {
  instance = null
  componentDidMount() {
    const width = 800
    const height = 800
    const xScale = [5, 10]

    this.instance = functionPlot({
      width,
      height,
      target: '#quadratic',
      data: [{
        fn: 'sqrt(x^3+7)',
      }, {
        fn: '-sqrt(x^3+7)',
      }]
    })

    setTimeout(() => {
      const xScale = [BigNumber('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364100'), BigNumber('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141')]
      const maxXPoint = xScale[xScale.length - 1]
      const offset = 10
      const yScale = [
        -1 * applySecp256k1Equation(maxXPoint) - offset,
        1 * applySecp256k1Equation(maxXPoint) + offset
      ]
      this.instance.programmaticZoom(xScale, yScale)
    }, 2000)
  }
  render() {
    return (
      <div className="Secp256k1">
        <div id="quadratic" />
      </div>
    )
  }
}

export default Secp256k1
