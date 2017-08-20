import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, Alert } from 'antd'

import { login, toggleLogin, signup } from 'redux/modules/auth'

import { LoginForm } from 'components'
import './Login.scss'

@connect(
    (state) => ({ auth: state.auth }),
    { login, toggleLogin, signup }
)
export default class Login extends Component {

    state = {
        mode: 'login'
    }

    constructor(props) {
        super(props)

        this.handleCancel = this.handleCancel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleModeChange = this.handleModeChange.bind(this)
    }

    handleSubmit(values) {
        console.log(values)
        this.props[this.state.mode]({
            ...values
        })
    }

    handleCancel() {
        this.props.toggleLogin(false)
    }

    handleModeChange(mode) {
        this.setState({
            mode
        })
    }

    translateErrorMessage(source) {
        if (source.indexOf('duplicate key')) {
            return '用户名已存在'
        }
    }

    render() {
        const { auth } = this.props
        const {
            loginVisible = false,
            logining, signuping,
            logined, signuped,
            login_error, signup_error
        } = auth
        const loading = this.state.mode === 'login' ? logining : signuping
        const loaded = this.state.mode === 'login' ? logined : signuped
        const error = (loading === false && loaded === false) ? (this.state.mode === 'login' ? login_error : signup_error) : null

        return (
            <Modal
                title={ this.state.mode === 'login' ? '登录' : '注册'}
                visible={loginVisible}
                width={400}
                footer={false}
                onCancel={this.handleCancel}
            >
                <div className="login">
                    <div className="login-box">
                        {
                            error &&
                            <div className="login-error">
                                <Alert showIcon={true} type="error" message={this.translateErrorMessage(error.message)} />
                            </div>
                        }
                        <LoginForm
                            mode={this.state.mode}
                            onModeChange={this.handleModeChange}
                            onSubmit={this.handleSubmit}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>
            </Modal>
        )
    }
}