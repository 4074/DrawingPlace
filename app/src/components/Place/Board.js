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
        },
        ratio: 1,
        editable: true,
        duration: 0
    }

    constructor(props) {
        super(props)
        this.handleMove = this.handleMove.bind(this)
        this.handleRatio = this.handleRatio.bind(this)
        this.handleDraw = this.handleDraw.bind(this)
    }

    handleMove(point) {
        this.setState({
            location: point
        })
    }

    handleRatio(ratio) {
        console.log(ratio)
        this.setState({
            ratio
        })
    }

    handleDraw(params) {
        let delay = this.props.delay

        this.setState({
            editable: false,
            duration: delay
        })
        
        const timer = setInterval(() => {
            delay --
            this.setState({
                duration: delay
            })
            if (delay === 0) {
                clearInterval(timer)
                this.setState({
                    editable: true
                })
            }
        }, 1000)
        console.log(params)
        this.props.onDraw(params)
    }

    render() {
        const { dataSource, color, colors } = this.props
        return (
            <div className="place-board-warp">
                <div className="board-info">
                    <div className="info-ratio">
                        绘板缩放：X{this.state.ratio}
                    </div>
                    <div className="info-location">
                        坐标：{ `(${this.state.location.x}, ${this.state.location.y})` }
                    </div>
                    <div className="info-delay">
                        倒计时：<span>{this.state.duration}</span> 秒
                    </div>
                </div>
                <Canvas
                    dataSource={dataSource}
                    color={color}
                    onMove={this.handleMove}
                    onResetColor={() => {this.props.onSelectColor(null)}}
                    onDraw={this.handleDraw}
                    onRatio={this.handleRatio}
                    editable={this.state.editable}
                />
                
                <Plate onSelectColor={this.props.onSelectColor} dataSource={colors} />
            </div>
        )
    }
}