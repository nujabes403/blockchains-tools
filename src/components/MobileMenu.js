import React, { Component, Fragment } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

import BookLabel from 'components/BookLabel'
import Hamburger from 'components/Hamburger'
import { menuItems, bookLabels } from 'constants/menu'

import './MobileMenu.scss'

type Props = {

}

class MobileMenu extends Component<Props> {
  state = {
    activeBookLabel: '', // default
    isOpen: false,
  }

  handleBookLabel = (bookLabel) => () => {
    const { activeBookLabel } = this.state
    this.setState({
      activeBookLabel: activeBookLabel !== bookLabel
        ? bookLabel
        : '',
    })
  }

  toggleMenu = () => {
    const willClose = this.state.isOpen

    document.body.style.overflow = willClose ? 'auto' : 'hidden'

    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  renderContents = () => {
    const { activeBookLabel } = this.state
    const bookLabelWidth = (100 / bookLabels.length) + '%'
    return (
      <Fragment>
      {bookLabels.map((title, idx) => (
        <div
          style={{ width: bookLabelWidth }}
          className={cx('MobileMenu__bookLabel', {
            [`MobileMenu__bookLabel--${title}`]: title,
          })}
          onClick={this.handleBookLabel(title)}
        >
          {title}
        </div>
      ))}
      <div className="MobileMenu__itemList">
        {menuItems[activeBookLabel] && menuItems[activeBookLabel].map(({ title, link }) => (
          <Link
            key={title}
            to={link}
            onClick={this.toggleMenu}
            className={cx('MobileMenu__item', {
              [`MobileMenu__item--${activeBookLabel}`]: activeBookLabel,
            })}
          >
            {title}
          </Link>
        ))}
      </div>
      </Fragment>
    )
  }

  render() {
    const { activeBookLabel, isOpen } = this.state
    const { className } = this.props
    return (
      <div
        className={cx('MobileMenu', className, {
          "MobileMenu--active": isOpen
        })}
      >
        <Hamburger
          className="MobileMenu__hamburger"
          onClick={this.toggleMenu}
          isMenuOpen={isOpen}
        />
        {isOpen && this.renderContents()}
        <div onClick={this.toggleMenu} className="MobileMenu__overlay" />
      </div>
    )
  }
}

export default MobileMenu
