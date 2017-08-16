import React, { Component } from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import { push } from 'react-router-redux'

import { isLoaded as isUserLoaded, load as loadUser } from 'redux/modules/auth'

import Header from '../Header/Header'
import './App.scss'

import { Login } from 'containers'

@asyncConnect([{
    promise: ({ store: { dispatch, getState } }) => {
        const promises = []
        if (!isUserLoaded(getState())) {
            promises.push(dispatch(loadUser()))
        }
        return Promise.all(promises)
    }
}])
@connect(
    (state) => ({ auth: state.auth })
)
export default class App extends Component {
    render() {
        const { children, auth } = this.props
        return (

            <div>
                <Header />
                <div className="content">
                    <div className="container">
                        {auth.user ? React.cloneElement(children, {}) : <Login />}
                    </div>
                </div>
            </div>
        )
    }
}