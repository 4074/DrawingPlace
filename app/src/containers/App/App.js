import React, { Component } from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import { push } from 'react-router-redux'

import { isLoaded as isUserLoaded, load as loadUser, toggleLogin } from 'redux/modules/auth'

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
    (state) => ({ auth: state.auth }),
    { toggleLogin }
)
export default class App extends Component {

    constructor(props) {
        super(props)

        this.handleLoginVisible = this.handleLoginVisible.bind(this)
    }

    handleLoginVisible(visible) {
        this.props.toggleLogin(visible)
    }

    render() {
        const { children, auth } = this.props
        return (
            <div>
                <Header onLogin={this.handleLoginVisible} />
                <div className="content">
                    {React.cloneElement(children, {})}
                </div>
                <Login/>
            </div>
        )
    }
}