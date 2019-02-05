import React, { Component } from 'react'
const rlp = require('rlp')
const { RLP: ethRLP, bytes } = require('eth-lib')

import Input from 'components/Input'

import './RLP.scss'

type Props = {

}

class RLP extends Component<Props> {
  state = {
    encoded: '',
    decoded: '',
  }

  handleEncode = (e) => {
    try {
      const encoded = rlp.encode(eval(e.target.value))
      this.setState({
        encoded: '0x' + encoded.reduce((acc, cur) => (acc += Number(cur).toString(16), acc), ''),
      })
    } catch (e) {
      console.log(e, 'e')
    }
  }

  handleDecode = (e) => {
    try {
      const isHex = e.target.value.startsWith('0x')
      const decoded = isHex
        ? rlp.decode(this.hexToUint8Array(e.target.value))
        : rlp.decode(eval(e.target.value))
      console.log(decoded, 'decoded')
      const decodedAsHex = decoded instanceof Array
        ? decoded.map(item => this.Uint8ArrayToHex(item))
        : this.Uint8ArrayToHex(decoded)
      console.log(decodedAsHex, 'decodedAsHex')
      // decoded.map(item => this.Uint8ArrayToHex(item))
      // .reduce((acc, cur) => (acc += cur, acc))
      this.setState({
        decoded: decodedAsHex,
        decodedAsAscii: this.hexToAscii(decodedAsHex),
      })
    } catch (e) {
      console.log(e, 'e')
    }
  }

  hexToUint8Array = (hex) => {
    const cleanhex = hex.replace('0x', '')
    return new Uint8Array(cleanhex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
  }

  Uint8ArrayToHex = (array) => {
    return '0x' + array.reduce((acc, cur) => (acc += Number(cur).toString(16), acc), '')
  }

  hexToAscii = (hexx) => {
    var hex  = hexx.toString()
    var str = ''
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
    }
    return str
  }

  render() {
    const { encoded, decoded, decodedAsAscii } = this.state

    return (
      <div className="RLP">
        <Input onChange={this.handleEncode} />
        <p>Encoded: {encoded}</p>
        <Input onChange={this.handleDecode} />
        <p>Decoded: {decoded} (ASCII: {decodedAsAscii})</p>
      </div>
    )
  }
}

export default RLP
