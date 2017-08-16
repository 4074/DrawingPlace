import React from 'react'

export default function NotFound() {
    require('./Error.scss')
    return (
        <div className="container error">
            <h1>404</h1>
            <p>页面不存在了啦~~</p>
        </div>
    )
}