import React, { Component, Fragment, createRef } from 'react'
import cx from 'classnames'
import { browserHistory } from 'react-router'
import { Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'

import Ad from 'components/Ad'
import { menuItems } from 'constants/menu'

import './Sidebar.scss'

type Props = {
  
}

class Sidebar extends Component<Props> {
  destroy$ = new Subject()

  componentWillUnmount() {
    this.destroy$.next(true)
  }

  render() {
    const { query, pathname } = browserHistory.getCurrentLocation()
    
    const isLandingPage = query && !query.l
    
    const selectedItem = {
      link: pathname,
      pathnameOnly: String(pathname).split('?')[0],
      label: query && query.l
    }
    
    return (
      <div className="Sidebar">
        <div 
          className={cx('Sidebar__label', {
            'Sidebar__label--selected': isLandingPage,
          })}
          onClick={() => browserHistory.push('/')}
        >
          Welcome
        </div>
        {menuItems && Object.entries(menuItems).map(([bookLabel, items]) => {
          
          const isBookLabelSelected = isLandingPage 
            ? bookLabel === 'GENERAL' // Show GENERAL menus if it's in landing page. 
            : selectedItem.label && (selectedItem.label === bookLabel)
          
          return (
            <Fragment>
              <div 
                className={cx('Sidebar__label', {
                  'Sidebar__label--selected': isBookLabelSelected,
                })}
                onClick={() => {
                  if (items && items.length !== 0) {
                    browserHistory.push(items[0].link)
                  }
                }}
              >
                {bookLabel}
              </div>
              {isBookLabelSelected && items.map(({ title, link }) => {
                const itemPathnameOnly = String(link).split('?')[0]
                const isItemSelected = isBookLabelSelected
                  && selectedItem.pathnameOnly 
                  && (selectedItem.pathnameOnly === itemPathnameOnly)
                
                return (
                  <li 
                    className={cx('Sidebar__link', {
                      'Sidebar__link--selected': isItemSelected,
                    })}
                    onClick={() => browserHistory.push(link)}
                  >
                    {title}
                  </li>
                )
              })}
            </Fragment>
          )
        })}
        <Ad />
      </div>
    )
  }
}

export default Sidebar