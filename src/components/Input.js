import React from 'react'
import cx from 'classnames'

import './Input.scss'

type Props = {

}

const Input = (props) => (
  <input
    {...props}
    className={cx('Input', props.className)}
    autoComplete="off"
  />
)

export default Input
