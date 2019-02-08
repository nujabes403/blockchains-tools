import React, { Component } from 'react'
import { Link } from 'react-router'

import './Menu.scss'

type Props = {

}

const menuItems = [
  {
    title: 'KECCAK256',
    link: '/keccak256'
  },
  {
    title: 'BIGNUMBER TO HEX',
    link: '/bignumber'
  },
  {
    title: 'CONTRACT ADDRESS',
    link: '/contractAddress'
  },
  {
    title: 'PRIVATEKEY TO ADDRESS',
    link: '/key'
  },
  {
    title: 'RLP',
    link: '/rlp'
  },
  {
    title: 'RAW TRANSACTION DECODER',
    link: '/rawTransactionDecoder'
  },
  {
    title: 'TRANSACTION SIGNER',
    link: '/transactionSigner'
  },
]

class Menu extends Component<Props> {
  render() {
    return (
      <div className="Menu">
        <header className="Menu__title">BLOCKCHAIN TOOLS</header>
        {menuItems.map(({ title, link }) => (
          <Link
            to={link}
            className="Menu__item"
          >
            {title}
          </Link>
        ))}
      </div>
    )
  }
}

export default Menu
