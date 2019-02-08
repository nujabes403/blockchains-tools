import React, { Component } from 'react'
import cx from 'classnames'

import './SectionDescription.scss'

type Props = {

}

class SectionDescription extends Component<Props> {
  render() {
    const { className, pathname } = this.props
    return (
      <div className={cx('SectionDescription', className)}>
        <header>{pathname}</header>
        <span className="SectionDescription__questionMark">
          ?
        </span>
      </div>
    )
  }
}

export default SectionDescription
