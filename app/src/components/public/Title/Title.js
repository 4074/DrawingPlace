import React, { Component } from 'react'
import './Title.scss'

export default class Title extends Component {

    render() {
        const { title, size, className, ...props } = this.props

        return (
            <div className={'pm-title ' + className} {...props}>
                { title }
            </div>
        )
    }
}