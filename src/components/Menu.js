import React, { Component } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import queryString from 'query-string'

import BookLabel from 'components/BookLabel'
import { menuItems, bookLabels } from 'constants/menu'

import './Menu.scss'

type Props = {

}

class Menu extends Component<Props> {
  constructor() {
    super()
    this.state = {
      activeBookLabel: queryString.parse(window.location.search) 
        && queryString.parse(window.location.search).l 
        || 'GENERAL' // default
    }
    
    mixpanel.track(
      "Visited menu item",
      { "menu": window.location.pathname + window.location.search },
    )
    
    mixpanel.track(
      "Visited book label",
      { "bookLabel": this.state.activeBookLabel },
    )
  }

  handleBookLabel = (bookLabel) => {
    mixpanel.track(
      "Clicked book label",
      { "bookLabel": bookLabel },
    )
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
            onClick={() => mixpanel.track(
              "Clicked menu item",
              { "menu": link },
            )}
            className="Menu__item"
          >
            {title}
          </Link>
        ))}
        {bookLabels.map((title, idx) => (
          <BookLabel
            key={title}
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
