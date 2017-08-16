import React, { Component } from 'react'
import { Route } from 'react-router'
import { Forbidden } from 'containers'

export default class RoleAuth extends Route {
    componentWillMount() {
        const { location, user } = this.props
        let hasAuth = true
        const pipelines = [common, summary]

        for (const pip of pipelines) {
            const isPass = pip(location.pathname, user)
            if (typeof isPass === 'boolean') {
                hasAuth = isPass
                break
            }
        }

        this.hasAuth = hasAuth
    }
    
    render() {
        return this.hasAuth ? this.props.children : <Forbidden />
    }
}

function common(pathname, user) {
    if (/^\/excel$/.test(pathname)) {
        return user.role >= 1
    }
}

function summary(pathname, user) {
    if (/^\/summary/.test(pathname)) {
        return user.role >= 1
    }
}