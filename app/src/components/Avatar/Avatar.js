import React, { Component } from 'react'
import { connect } from 'react-redux'
import Utils from 'utils'

export default class Avatar extends Component {
    render() {
        require('./Avatar.scss')
        let { avatar, username } = this.props.userinfo || {}
        avatar = Utils.getAvatar(avatar, username)
        return (
            <div className="avatar-card">
                <img src={avatar} />
                <div className="info">
                    <div className="info-text">
                        <span className="username">{username}</span>
                        
                        <span className="type"></span>
                    </div>
                </div>
            </div>
        )
    }
}