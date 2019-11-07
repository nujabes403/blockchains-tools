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
    return !!linkToDescription[pathname] && (
      <div className={cx('SectionDescription', className, {
        'SectionDescription--introduction': pathname === '/',
      })}>
        <span className="SectionDescription__title">{linkToDescription[pathname].title}</span>
        {hasModal && (
          <img
            src="/static/images/question.png"
            onClick={() => {
              openModal({
                title: linkToDescription[pathname].title,
                content: linkToDescription[pathname].markdown,
              })

              if (window.isMobile.any) return
              audio.play()
            }}
            className="SectionDescription__questionMark"
          />
        )}
      </div>
    )
  }
}

export default SectionDescription
