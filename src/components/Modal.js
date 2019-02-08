import React, { Component } from 'react'
import cx from 'classnames'

import { modal$, closeModal } from 'utils/modal'

import './Modal.scss'

type Props = {

}

class Modal extends Component<Props> {
  state = {
    title: '',
    content: '',
  }

  subscription = null

  componentDidMount() {
    this.subscription = modal$.subscribe(({ title, content }) => {
      this.setState({
        title,
        content,
      })
    })
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  closeModal = (e) => {
    e.stopPropagation()
    closeModal()
  }

  render() {
    const { title, content } = this.state
    return (
      <div className={cx('Modal', {
        'Modal--active': title || content,
      })}
      >
        <div className="Modal__overlay" onClick={this.closeModal} />
        <div className="Modal__content">
          <header className="Modal__title">{title}</header>
          <div className="Modal__description">{content}</div>
        </div>
      </div>
    )
  }
}

export default Modal
