import React, { Component } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

import BookLabel from 'components/BookLabel'

import './Menu.scss'

type Props = {

}

const menuItems = {
  'GENERAL': [
    { title: 'KECCAK256', link: '/keccak256' },
    { title: 'NUMBER TO HEX', link: '/bignumber' },
    { title: 'RLP', link: '/rlp' },
    { title: 'UTF8', link: '/utf8' },
  ],
  'ETH': [
    { title: 'KECCAK256', link: '/keccak256' },
    { title: 'CONTRACT ADDRESS', link: '/contractAddress' },
    { title: 'PRIVATEKEY TO ADDRESS', link: '/key' },
    { title: 'RAW TRANSACTION ENCODER', link: '/rawTransactionEncoder' },
    { title: 'RAW TRANSACTION DECODER', link: '/rawTransactionDecoder' },
  ],
  'EOS': [
    {}
  ]
}

const bookLabels = ['GENERAL', 'ETH', 'EOS']

class Menu extends Component<Props> {
  state = {
    activeBookLabel: 'GENERAL' // default
  }

  handleBookLabel = (bookLabel) => {
    this.setState({
      activeBookLabel: bookLabel,
    })
  }

  render() {
    const { activeBookLabel } = this.state
    return (
      <div
        className={cx('Menu', {
          [`Menu--${activeBookLabel}`]: true,
        })}
      >
        <header className="Menu__title">BLOCKCHAIN TOOLS</header>
        {menuItems[activeBookLabel].map(({ title, link }) => (
          <Link
            key={title}
            to={link}
            className="Menu__item"
          >
            {title}
          </Link>
        ))}
        {bookLabels.map((title, idx) => (
          <BookLabel
            style={{
              top: (idx * 50) + 28,
            }}
            title={title}
            onClick={this.handleBookLabel}
            active={title === activeBookLabel}
          />
        ))}
      </div>
    )
  }
}

export default Menu
