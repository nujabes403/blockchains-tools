import React, { Component } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

import BookLabel from 'components/BookLabel'
import { menuItems, bookLabels } from 'constants/menu'

import './Menu.scss'

type Props = {

}

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
    const { className } = this.props
    return (
      <div
        className={cx('Menu', className, {
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
