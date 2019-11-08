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

  componentDidMount() {
    const selectedItem = this.getSelectedItem()
    
    mixpanel.track(
      "Visited menu item",
      { "menu": window.location.pathname + window.location.search },
    )
    
    mixpanel.track(
      "Visited book label",
      { "bookLabel": selectedItem && selectedItem.label },
    )
  }

  componentWillUnmount() {
    this.destroy$.next(true)
  }
  
  getSelectedItem = () => {
    const { query, pathname } = browserHistory.getCurrentLocation()
    
    const isLandingPage = query && !query.l
    
    const selectedItem = {
      link: pathname,
      pathnameOnly: String(pathname).split('?')[0],
      label: query && query.l
    }
    
    return selectedItem
  }

  render() {
    const { query } = browserHistory.getCurrentLocation()
    
    const isLandingPage = query && !query.l
    
    const selectedItem = this.getSelectedItem()
    
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
                  mixpanel.track("Clicked book label", { "bookLabel": bookLabel })
                  
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
                    onClick={() => {
                      mixpanel.track("Clicked menu item", { "menu": link })
                      browserHistory.push(link)
                    }}
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