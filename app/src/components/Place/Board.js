import React, { Component } from 'react'
import Utils from 'utils'

import Canvas from './Canvas'
import Plate from './Plate'

import './styles/Board.scss'

export default class Board extends Component {

    state = {
        location: {
            x: 0,
            y: 0
        }
    }

    constructor(props) {
        super(props)
        this.handleRatio = this.handleRatio.bind(this)
    }

    handleRatio(point) {
        this.setState({
            location: point
        })
    }

    render() {
        const { dataSource, color } = this.props
        return (
            <div className="place-board-warp">
                <Canvas
                    dataSource={dataSource}
                    color={color}
                    onRatio={this.handleRatio}
                />
                <div className="board-location">
                    { `(${this.state.location.x}, ${this.state.location.y})` }
                </div>
                <Plate onSelectColor={this.props.onSelectColor}/>
            </div>
        )
    }
}