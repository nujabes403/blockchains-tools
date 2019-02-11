import React, { Component } from 'react'
import cx from 'classnames'

import './Hamburger.scss'

type Props = {

}

class Hamburger extends Component<Props> {
  state = {
    isOpen: false,
  }

  handleToggle = () => {
    const { onClick } = this.props
    if (typeof onClick === 'function') onClick()

    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isOpen } = this.state
    const { className } = this.props
    return (
      <div
        className={cx('Hamburger', className, {
          'Hamburger--active': isOpen
        })}
        onClick={this.handleToggle}
      >
        <span class="Hamburger__line" />
        <span class="Hamburger__line" />
        <span class="Hamburger__line" />
      </div>
    )
  }
}

export default Hamburger
