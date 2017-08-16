import React, { Component, PropTypes } from 'react'
import { Icon } from 'antd'
import './CreateButton.scss'

export default class CreateButton extends Component {
    static propTypes = {
        title: PropTypes.string,
        icon: PropTypes.string,
        onClick: PropTypes.func
    }
    render() {
        const { title = '添加', icon = 'plus', ...props } = this.props
        return (
            <div className="pm-create-button" {...props} >
                <Icon type={icon} />
                <span className="title">{title}</span>
            </div>
        )
    }
}