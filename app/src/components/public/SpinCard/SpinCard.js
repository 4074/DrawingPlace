import React, { Component } from 'react'
import classNames from 'classnames'
import { Spin, Icon, Button } from 'antd'
import './SpinCard.scss'

export default class SpinCard extends Component {

    handleRetry() {
        const { onRetry } = this.props
        if (typeof onRetry === 'function') {
            onRetry()
        }
    }
    render() {
        const { className, children, loading, error, errorMessage } = this.props
        // TODO error 渐进过渡效果
        return (
            <div className={classNames('pm-spin-card', className)}>
                <Spin spinning={loading}>
                    {children}
                </Spin>
                {
                    error &&
                    <div className="pm-spin-card-error">
                        <div className="error-message"><Icon type="close-circle-o" /> {errorMessage || '保存失败'}</div>
                        <Button type="primary" className="btn-retry" onClick={this.handleRetry.bind(this)}>重试</Button>
                    </div>
                }
            </div>
        )
    }
}