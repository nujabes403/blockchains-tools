import React, { Component } from 'react'
import keccak256 from 'keccak256'

import Input from 'components/Input'
import ec from 'utils/elliptic'

import './PrivateKeyToPublicKey.scss'

type Props = {

}

class PrivateKeyToPublicKey extends Component<Props> {
  state = {
    privateKeyInstance: null,
    publicKey: '',
    publicAddress: '',
  }

  handleChange = (e) => {
    const privateKey = e.target.value.replace('0x', '')
    const privateKeyInstance = ec.keyFromPrivate(privateKey)
    const publicKeyInstance = privateKeyInstance.getPublic()
    const publicKey = '0x' + publicKeyInstance.getX().toString(16) + publicKeyInstance.getY().toString(16)
    const publicAddress = '0x' + keccak256(publicKey).toString('hex').slice(-40)
    this.setState({
      publicKey,
      publicAddress,
    })
  }

  render() {
    const { privateKeyInstance, publicKey, publicAddress } = this.state
    return (
      <div className="PrivateKeyToPublicKey">
        <Input
          name="privateKey"
          onChange={this.handleChange}
        />
        <p>public key: {publicKey}</p>
        <p>public address: {publicAddress}</p>
      </div>
    )
  }
}

export default PrivateKeyToPublicKey
