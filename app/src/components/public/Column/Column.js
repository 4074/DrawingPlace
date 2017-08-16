import React, { Component, PropTypes } from 'react'

export default class Column extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired
    }

    render() {
        return (
            <div className="pm-column">
                {this.props.children}
            </div>
        )
    }
}

export class ColumnWrap extends Component {
    static propTypes = {
        children: PropTypes.array.isRequired
    }

    render() {
        require('./Column.scss')
        return (
            <div className="pm-column-wrap">
                {this.props.children}
            </div>
        )
    }
}