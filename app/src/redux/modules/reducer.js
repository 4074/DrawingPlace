import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'

import auth from './auth'
import chat from './chat'
import place from './place'

export default combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    auth,
    chat,
    place
})