import React from 'react'

import IntroductionMarkdown from 'templates/Introduction.md'

import './Introduction.scss'

type Props = {

}

const Introduction = () => (
  <div
    className="Introduction"
    dangerouslySetInnerHTML={{
      __html: IntroductionMarkdown,
    }}
  />
)

export default Introduction
