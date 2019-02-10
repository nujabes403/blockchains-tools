import React, { Component } from 'react'
import cx from 'classnames'
import marked from 'marked'

import { openModal } from 'utils/modal'
import linkToDescription from 'constants/linkToDescription'

import './SectionDescription.scss'

type Props = {

}

class SectionDescription extends Component<Props> {
  render() {
    const { className, pathname, hasModal } = this.props
    return (
      <div className={cx('SectionDescription', className)}>
        <header className="SectionDescription__title">{linkToDescription[pathname].title}</header>
        {hasModal && (
          <span
            onClick={() => openModal({
              title: linkToDescription[pathname].title,
              content: linkToDescription[pathname].markdown,
            })}
            className="SectionDescription__questionMark">
            ?
          </span>
        )}
      </div>
    )
  }
}

export default SectionDescription
