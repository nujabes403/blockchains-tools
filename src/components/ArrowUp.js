import React from 'react'
import cx from 'classnames'

import './ArrowUp.scss'


const ArrowUp = ({
  visible,
}) => (
  <div className={cx('ArrowUp', {
    'ArrowUp--visible': visible,
  })}
  >
    <div className="ArrowUp__arrow ArrowUp__arrow--first" />
    <div className="ArrowUp__arrow ArrowUp__arrow--second" />
  </div>
)

export default ArrowUp
