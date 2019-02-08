import React, { Component } from 'react'

import { modal$ } from 'utils/modal'

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

  render() {
    const { title, content } = this.state
    return (title || content) && (
      <div className="Modal">
        <div className="Modal__overlay" />
        <div className="Modal__content">
          {title} {content}
        </div>
      </div>
    )
  }
}

export default Modal
