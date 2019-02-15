import React, { Component } from 'react'
import cx from 'classnames'

import './Hamburger.scss'

type Props = {

}

class Hamburger extends Component<Props> {
  handleToggle = () => {
    const { onClick } = this.props
    if (typeof onClick === 'function') onClick()
  }

  render() {
    const { className, isMenuOpen } = this.props
    return (
      <div
        className={cx('Hamburger', className, {
          'Hamburger--active': isMenuOpen
        })}
        onClick={this.handleToggle}
      >
        <span className="Hamburger__line" />
        <span className="Hamburger__line" />
        <span className="Hamburger__line" />
      </div>
    )
  }
}

export default Hamburger
