import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Avatar } from 'components'

import { Dropdown, Menu, Icon } from 'antd'
import { logout } from 'redux/modules/auth'

import './Header.scss'

@connect(
    state => ({auth: state.auth, routing: state.routing}),
    {logout}
)
export default class Header extends Component {

    handleLogout() {
        this.props.logout()
    }

    renderUserInfo() {
        const { auth } = this.props
        const userinfo = {
            username: auth.user.username
        }

        const userMenu = (
            <Menu className="user-menu">
                <Menu.Item>
                    <a onClick={this.handleLogout.bind(this)}><Icon type="logout" /> 退出登录</a>
                </Menu.Item>
            </Menu>
        )

        return (
            <Dropdown overlay={userMenu}>
                <div className="userinfo">
                    <Avatar userinfo={userinfo} />
                </div>
            </Dropdown>
        )
    }

    renderNavMenu() {
        const { auth } = this.props
        const modules = (auth.user.modules || []).filter(item => item.showInHeader)
        const currentModule = modules.filter(item => item.href === window.location.pathname).map(item => item.module)

        return (
            <Menu className="nav-menu" mode="horizontal" selectedKeys={currentModule}>
                {modules.map(item =>
                    <Menu.Item key={item.module}>
                        <Link to={item.href}>{item.name}</Link>
                    </Menu.Item>
                )}
            </Menu>
        )
    }

    render() {
        const { auth, onLogin } = this.props

        return (
            <div className="header">
                <div className="container">
                    <a className="logo" href="/">PLACE</a>
                    { auth.user && this.renderNavMenu() }
                    {
                        auth.user ? this.renderUserInfo() : 
                        <div className="userinfo">
                            <a className="link-login" onClick={onLogin}>登录</a>
                        </div>
                    }
                </div>
            </div>
        )
    }
}