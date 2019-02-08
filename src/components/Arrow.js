import React from 'react'

import ArrowDown from 'components/ArrowDown'
import ArrowUp from 'components/ArrowUp'

import './Arrow.scss'

const Arrow = ({
  down,
  up,
}) => {
  if (down) {
    return <ArrowDown visible={down} />
  } else if (up) {
    return <ArrowUp visible={up} />
  }

  return <div className="Arrow" />
}

export default Arrow
