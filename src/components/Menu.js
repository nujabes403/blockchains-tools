import React, { Component } from 'react'
import { Link } from 'react-router'

import './Menu.scss'

type Props = {

}

const menuItems = [
  {
    title: '(BIG)NUMBER TO HEX',
    link: '/bignumber'
  },
  {
    title: 'CONTRACT ADDRESS',
    link: '/contractAddress'
  },
  {
    title: 'KECCAK256',
    link: '/keccak256'
  },
  {
    title: 'PRIVATEKEY TO ADDRESS',
    link: '/key'
  },
  {
    title: 'RAW TRANSACTION ENCODER',
    link: '/rawTransactionEncoder'
  },
  {
    title: 'RAW TRANSACTION DECODER',
    link: '/rawTransactionDecoder'
  },
  {
    title: 'RLP',
    link: '/rlp'
  },
  {
    title: 'UTF8',
    link: '/utf8'
  },
]

class Menu extends Component<Props> {
  render() {
    return (
      <div className="Menu">
        <header className="Menu__title">BLOCKCHAIN TOOLS</header>
        {menuItems.map(({ title, link }) => (
          <Link
            key={title}
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
