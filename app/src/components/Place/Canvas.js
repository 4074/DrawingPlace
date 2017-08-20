import React, { Component } from 'react'

import Utils from 'utils'

export default class Canvas extends Component {
    ratio = {
        default: 4,
        min: 4,
        max: 28,
        step: 8
    }

    size = {
        width: 310,
        height: 150
    }

    state = {
        ratio: 4
    }

    mouseState = {
        grab: false,
        grabPosition: null,
        move: false,
        moveStartPosition: null,
    }

    constructor(props) {
        super(props)

        this.handleWheel = this.handleWheel.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.initDraw()
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.ratio !== nextState.ratio) {
            setTimeout(() => {
                this.initDraw()
            }, 17)
            return true
        } else {
            return false
        }
    }

    handleWheel(event) {
        console.log(event.deltaY)
        if (event.deltaY > 0) {
            if (this.state.ratio < this.ratio.max) {
                this.setState({
                    ratio: this.state.ratio === this.ratio.min ? this.ratio.step : (this.state.ratio + this.ratio.step)
                })
            }
        } else {
            if (this.state.ratio > this.ratio.min) {
                this.setState({
                    ratio: this.state.ratio === this.ratio.step ? this.ratio.min : (this.state.ratio - this.ratio.step)
                })
            }
        }
    }

    handleMouseDown(event) {
        const position = this.getEventPosition(event)
        this.mouseState.grabPosition = position
        this.mouseState.grab = true

        this.mouseState.moveStartPosition = position
    }

    handleMouseMove(event) {
        const position = this.getEventPosition(event)
        if (!this.mouseState.grab) {
            this.props.onRatio({
                x: Math.ceil(position.x / this.state.ratio),
                y: Math.ceil(position.y / this.state.ratio)
            })
        } else {
            this.$board.scrollLeft = this.$board.scrollLeft + (this.mouseState.moveStartPosition.x - position.x)
            this.$board.scrollTop = this.$board.scrollTop + (this.mouseState.moveStartPosition.y - position.y)

            this.mouseState.moveStartPosition = position
        }
    }

    handleMouseUp(event) {
        this.mouseState.grab = false
    }

    handleClick(event) {
        const { color } = this.props
        const position = this.getEventPosition(event)

        if (color) {
            const point = {
                x: Math.ceil(position.x / this.state.ratio),
                y: Math.ceil(position.y / this.state.ratio),
                w: 1,
                h: 1,
                c: color
            }
            this.draw(point)
        }
    }

    handleDoubleClick(event) {
        this.setState({
            ratio: this.state.ratio === this.ratio.min ? this.ratio.max : this.ratio.min
        })
    }

    getEventPosition(event) {
        let x = event.clientX + this.$board.scrollLeft - Utils.getOffsetLeft(event.target)
        let y = event.clientY + this.$board.scrollTop - Utils.getOffsetTop(event.target)

        return {x, y}
    }

    initDraw() {
        const { dataSource } = this.props
        for (const item of dataSource) {
            this.draw(item)
        }
    }

    draw(data) {
        const $canvas = this.$canvas
        const ctx = $canvas.getContext('2d')
        const { ratio } = this.state

        ctx.fillStyle = data.c
        ctx.fillRect(data.x * ratio, data.y * ratio, data.w * ratio, data.h * ratio)
    }

    render() {
        return (
            <div className="place-board" ref={($e) => this.$board = $e}>
                <canvas
                    width={this.size.width * this.state.ratio}
                    height={this.size.height * this.state.ratio}
                    className="board-canvas" ref={($e) => this.$canvas = $e}
                    onWheel={this.handleWheel}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                    onMouseOut={this.handleMouseUp}
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}
                />
            </div>
        )
    }
}