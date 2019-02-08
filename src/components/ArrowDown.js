import React from 'react'
import cx from 'classnames'

import './ArrowDown.scss'


const ArrowDown = ({
  visible,
}) => (
  <div className={cx('ArrowDown', {
    'ArrowDown--visible': visible,
  })}
  >
    <div class="ArrowDown__arrow ArrowDown__arrow--first" />
    <div class="ArrowDown__arrow ArrowDown__arrow--second" />
  </div>
)

export default ArrowDown
