/**
 * Created by dwfn3398 on 2017/3/6.
 */

import React, { Component } from 'react'
import { Router, IndexRoute, Route } from 'react-router'
import { replace } from 'react-router-redux'
import { ReduxAsyncConnect } from 'redux-async-connect'

import RoleAuth from './helpers/RoleAuth'

import {
    App,
    Login,
    Place,

    NotFound,
    Forbidden
} from 'containers'

function routes(store) {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Place} />
            <Route path="/login" component={Login} />
            <Route path="*" component={NotFound} status={404} />
        </Route>
    )
}

export default class AppWithRoutes extends Component {
    render() {
        const { client, history } = this.props
        return (
            <Router render={(props) => <ReduxAsyncConnect {...props} helpers={{client}} />} history={history} routes={routes()} />
        )
    }
}