import React, { Component } from 'react'
import cx from 'classnames'
import marked from 'marked'

import { openModal } from 'utils/modal'
import linkToDescription from 'constants/linkToDescription'

import './SectionDescription.scss'

type Props = {

}

const audio = new Audio('/static/sound/question.wav') // :D
audio.volume = 0.1

class SectionDescription extends Component<Props> {
  render() {
    const { className, pathname, hasModal } = this.props
    return (
      <div className={cx('SectionDescription', className)}>
        <header className="SectionDescription__title">{linkToDescription[pathname].title}</header>
        {hasModal && (
          <img
            src="/static/images/question.png"
            onClick={() => {
              audio.play()
              openModal({
                title: linkToDescription[pathname].title,
                content: linkToDescription[pathname].markdown,
              })
            }}
            className="SectionDescription__questionMark"
          />
        )}
      </div>
    )
  }
}

export default SectionDescription
