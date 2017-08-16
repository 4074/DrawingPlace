import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login } from 'redux/modules/auth'

import LoginForm from './LoginForm'
import './Login.scss'

@connect(
    (state) => ({ auth: state.auth }),
    { login }
)
export default class Login extends Component {
    handleSubmit(values) {
        console.log(values)
        this.props.login({
            ...values
        })
    }
    render() {

        return (
            <div className="login">
                <div className="login-box">
                    <LoginForm onSubmit={this.handleSubmit.bind(this)} />
                </div>
            </div>
        )
    }
}