import React, { Component } from 'react'

import Utils from 'utils'

export default class Canvas extends Component {
    ratio = {
        default: 2,
        min: 2,
        max: 8,
        step: 2
    }

    size = {
        width: 620,
        height: 300
    }

    state = {
        ratio: 2
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
        this.handleMouseOut = this.handleMouseOut.bind(this)
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.initDraw()
    }

    shouldComponentUpdate(nextProps, nextState) {
        let should = true
        if (this.state.ratio !== nextState.ratio) {
            setTimeout(() => {
                this.initDraw()
            }, 17)
        } else {
            should = false
        }
        return should
    }

    handleWheel(event) {
        if (event.deltaY > 0) {
            if (this.state.ratio < this.ratio.max) {
                this.setState({
                    ratio: this.state.ratio + this.ratio.step //this.state.ratio === this.ratio.min ? this.ratio.step : (this.state.ratio + this.ratio.step)
                })
            }
        } else {
            if (this.state.ratio > this.ratio.min) {
                this.setState({
                    ratio: this.state.ratio - this.ratio.step //this.state.ratio === this.ratio.step ? this.ratio.min : (this.state.ratio - this.ratio.step)
                })
            }
        }
    }

    handleMouseDown(event) {
        const position = this.getEventPosition(event)
        this.mouseState.grabPosition = position
        this.mouseState.grab = true

        this.mouseState.moveStartPosition = position
        this.mouseState.scrollLeft = this.$board.scrollLeft
        this.mouseState.scrollTop = this.$board.scrollTop
    }

    handleMouseMove(event) {
        const position = this.getEventPosition(event)
        if (!this.mouseState.grab) {
            const { dataSource, color, onMove } = this.props
            const point = {
                x: Math.floor(position.x / this.state.ratio),
                y: Math.floor(position.y / this.state.ratio)
            }
            onMove(point)

            if (this.mouseState.drawed) {
                this.resetPoint(this.mouseState.drawed)
            }

            if (color) {
                const drawData = {
                    ...point,
                    w: 1,
                    h: 1,
                    c: this.props.color
                }

                this.mouseState.drawed = drawData
                this.draw(drawData)
            }

        } else {
            this.$board.scrollLeft = this.mouseState.scrollLeft + (this.mouseState.moveStartPosition.x - position.x)
            this.$board.scrollTop = this.mouseState.scrollTop + (this.mouseState.moveStartPosition.y - position.y)
        }
    }

    handleMouseUp(event) {
        this.mouseState.grab = false
    }

    handleMouseOut() {
        this.mouseState.grab = false
        if (this.mouseState.drawed) {
            this.resetPoint(this.mouseState.drawed)
        }
    }

    handleClick(event) {
        const { color } = this.props
        const position = this.getEventPosition(event)

        if (color) {
            const point = {
                x: Math.floor(position.x / this.state.ratio),
                y: Math.floor(position.y / this.state.ratio),
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

    resetPoint(data) {
        const { dataSource } = this.props
        const resetData = dataSource.find(item => item.x === data.x && item.y === data.y)
        if (resetData) {
            this.draw(resetData)
        } else {
            this.clear({
                ...data
            })
        }
        
    }

    clear(data) {
        const $canvas = this.$canvas
        const ctx = $canvas.getContext('2d')
        const { ratio } = this.state

        ctx.clearRect(data.x * ratio, data.y * ratio, data.w * ratio, data.h * ratio)
    }

    render() {
        console.log('render')
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
                    onMouseOut={this.handleMouseOut}
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}
                />
            </div>
        )
    }
}