import React from 'react'
import cx from 'classnames'

import './BookLabel.scss'

const colors = {
  GENERAL: '#61c19e',
  ETH: '#737474',
  KLAY: '#3570D8',
  IOST: '#2A3238',
}

const BookLabel = ({ title, style, active, onClick }) => (
  <div
    style={{
      ...style,
      backgroundColor: colors[title],
    }}
    className={cx('BookLabel', {
      'BookLabel--active': active,
    })}
    onClick={() => onClick(title)}
  >
    {title}
  </div>
)

export default BookLabel
