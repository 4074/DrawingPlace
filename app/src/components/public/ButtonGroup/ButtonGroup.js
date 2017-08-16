import React, { Component } from 'react'
import {
    Button
} from 'antd'

const Group = Button.Group

export default class ButtonGroup extends Component {
    handleClick(index) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(index)
        }
    }
    
    render() {
        require('./ButtonGroup.scss')
        const { dataSource, active }  = this.props

        return (
            <Group className="button-group">
                {dataSource && dataSource.map((item, index) =>
                    <Button key={index} data-index={index} type={active === index ? 'primary' : 'default'} onClick={this.handleClick.bind(this, index)}>{item}</Button>
                )}
            </Group>
        )
    }
}