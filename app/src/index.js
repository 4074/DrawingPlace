import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import _ from 'lodash'
import Utils from 'utils'

import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'

import App from './App'

const client = new ApiClient()
const dest = document.getElementById('root')
const store = createStore(browserHistory, client, window.__data)
const history = syncHistoryWithStore(browserHistory, store)

window.__store = {}

const render = (Component) => {
    ReactDom.render(
        <AppContainer>
            <Provider store={store} key="provider">
                <Component client={client} history={history} />
            </Provider>
        </AppContainer>,
        dest
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./App', () => {
        render(App)
    })
}