import React, { Component } from 'react'
import cx from 'classnames'
import marked from 'marked'

import { openModal } from 'utils/modal'
import linkToTitle from 'constants/linkToTitle'

import './SectionDescription.scss'

type Props = {

}

class SectionDescription extends Component<Props> {
  render() {
    const { className, pathname } = this.props
    return (
      <div className={cx('SectionDescription', className)}>
        <header className="SectionDescription__title">{linkToTitle[pathname].title}</header>
        <span
          onClick={() => openModal({
            title: linkToTitle[pathname].title,
            content: linkToTitle[pathname].markdown,
          })}
          className="SectionDescription__questionMark">
          ?
        </span>
      </div>
    )
  }
}

export default SectionDescription
