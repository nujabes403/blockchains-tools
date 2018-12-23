import moment from 'moment'

const _moment = moment

console.log(_moment.langData('en')._relativeTime.s)

_moment.updateLocale('en', {
  relativeTime: {
    future: "just now",
    past:   "%s ago",
    s  : '%ds',
    ss : '%d seconds',
    m:  "1m",
    mm: "%dm",
    h:  "1h",
    hh: "%dh",
    d:  "1d",
    dd: "%dd",
    M:  "a month",
    MM: "%d months",
    y:  "a year",
    yy: "%d years"
  }
})

export default _moment
