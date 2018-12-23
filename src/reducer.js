import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ui from 'reducers/ui'

const reducer = combineReducers({
  routing: routerReducer,
  ui,
})

export default reducer
