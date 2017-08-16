import React from 'react'

export default function NotFound() {
    require('./Error.scss')
    return (
        <div className="container error">
            <h1>403</h1>
            <p>您没有该页面权限~~</p>
        </div>
    )
}