import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import createMiddleware from './middleware/clientMiddleware'
import { routerMiddleware } from 'react-router-redux'
import reducer from './modules/reducer'

export default function createStore(history, client, socket, data) {
    const reduxRouterMiddleware = routerMiddleware(history)
    const middleware = [createMiddleware(client, socket), reduxRouterMiddleware]

    const finalCreateStore = applyMiddleware(...middleware)(_createStore)

    const store = finalCreateStore(reducer, data)

    return store
}