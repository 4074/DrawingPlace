import React, { Component } from 'react'

import Utils from 'utils'

export default class Canvas extends Component {
    ratio = {
        default: 1,
        min: 1,
        max: 5,
        step: 2
    }

    size = {
        width: 1240,
        height: 600
    }

    state = {
        ratio: 1
    }

    mouseState = {
        grab: false,
        grabPosition: {},
        move: false,
        moveStartPosition: null,
    }

    dataSourceRendered = []

    constructor(props) {
        super(props)

        this.handleWheel = this.handleWheel.bind(this)

        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)

        this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.handleClick = this.handleClick.bind(this)

        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    componentDidMount() {
        this.dataSourceRendered = this.props.dataSource
        this.initDraw()
        this.$canvas.focus()
    }

    componentWillReceiveProps(nextProps) {
        for (const item of nextProps.dataSource) {
            if (!this.dataSourceRendered.find(d => item.x === d.x && item.y === d.y)) {
                this.draw(item, true)
            }
        }
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
        // event.preventDefault()
        let ratio
        if (event.deltaY > 0) {
            if (this.state.ratio < this.ratio.max) {
                ratio = this.state.ratio + this.ratio.step
                this.setState({
                    ratio //this.state.ratio === this.ratio.min ? this.ratio.step : (this.state.ratio + this.ratio.step)
                })
            }
        } else {
            if (this.state.ratio > this.ratio.min) {
                ratio = this.state.ratio - this.ratio.step
                this.setState({
                    ratio  //this.state.ratio === this.ratio.step ? this.ratio.min : (this.state.ratio - this.ratio.step)
                })
            }
        }

        if (ratio) {
            this.props.onRatio((ratio - this.ratio.min) / this.ratio.step + 1)
        }
        
        // this.$board.style.overflow = ratio === this.ratio.min ? 'hidden' : 'auto'
    }

    handleMouseDown(event) {
        const position = this.getEventPosition(event)
        this.mouseState.grabPosition = position
        this.mouseState.grab = true
        this.mouseState.moved = false

        this.mouseState.moveStartPosition = position
        this.mouseState.scrollLeft = this.$board.scrollLeft
        this.mouseState.scrollTop = this.$board.scrollTop
    }

    handleMouseMove(event) {
        const position = this.getEventPosition(event)
        if (position.x !== this.mouseState.grabPosition.x && position.y !== this.mouseState.grabPosition.y) {
            this.mouseState.moved = true
        }
        
        if (!this.mouseState.grab) {
            const { dataSource, color, onMove, editable } = this.props

            const point = {
                x: Math.floor(position.x / this.state.ratio),
                y: Math.floor(position.y / this.state.ratio)
            }
            onMove(point)

            if (this.mouseState.drawed) {
                this.resetPoint(this.mouseState.drawed)
            }

            if (color && editable) {
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
            if (this.mouseState.drawed) {
                this.resetPoint(this.mouseState.drawed)
            }
            this.$board.scrollLeft = this.mouseState.scrollLeft + (this.mouseState.moveStartPosition.x - position.x)
            this.$board.scrollTop = this.mouseState.scrollTop + (this.mouseState.moveStartPosition.y - position.y)
        }
    }

    handleMouseUp(event) {
        this.mouseState.grab = false
    }

    handleMouseEnter() {
        this.$canvas.focus()
    }

    handleMouseOut() {
        this.mouseState.grab = false
        if (this.mouseState.drawed) {
            this.resetPoint(this.mouseState.drawed)
        }
    }

    handleClick(event) {
        const { color, editable } = this.props
        const position = this.getEventPosition(event)
        if (color && !this.mouseState.moved && editable) {
            const point = {
                x: Math.floor(position.x / this.state.ratio),
                y: Math.floor(position.y / this.state.ratio),
                w: 1,
                h: 1,
                c: color
            }
            if (
                this.mouseState.drawed &&
                this.mouseState.drawed.x === point.x &&
                this.mouseState.drawed.y === point.x
            ) {
                this.mouseState.drawed = null
            }
            this.draw(point, true)
            this.props.onDraw(point)
        }
    }

    handleDoubleClick(event) {
        // this.setState({
        //     ratio: this.state.ratio === this.ratio.min ? this.ratio.max : this.ratio.min
        // })
    }

    handleKeyPress(event) {
        if (event.keyCode === 27) {
            this.props.onResetColor()
            if (this.mouseState.drawed) {
                this.resetPoint(this.mouseState.drawed)
            }
        }
    }

    getEventPosition(event) {
        let x = event.clientX + this.$board.scrollLeft - Utils.getOffsetLeft(event.target)
        let y = event.clientY + this.$board.scrollTop - Utils.getOffsetTop(event.target)

        return {x, y}
    }

    initDraw() {
        for (const item of this.dataSourceRendered) {
            this.draw(item, true)
        }
    }

    draw(data, real) {
        const $canvas = this.$canvas
        const ctx = $canvas.getContext('2d')
        const { ratio } = this.state

        ctx.fillStyle = data.c
        ctx.fillRect(data.x * ratio, data.y * ratio, data.w * ratio, data.h * ratio)

        if (real) {
            const rendered = []
            let has = false
            for (const d of this.dataSourceRendered) {
                if (data.x === d.x && data.y === d.y) {
                    has = true
                    rendered.push({
                        ...data
                    })
                } else {
                    rendered.push({
                        ...d
                    })
                }
            }
            if (!has) {
                rendered.push({
                    ...data
                })
            }
            this.dataSourceRendered = rendered
        }
    }

    resetPoint(data) {
        const resetData = this.dataSourceRendered.find(item => item.x === data.x && item.y === data.y)
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
        return (
            <div className="place-board" ref={($e) => this.$board = $e}>
                <canvas
                    tabIndex={0}
                    width={this.size.width * this.state.ratio}
                    height={this.size.height * this.state.ratio}
                    className="board-canvas" ref={($e) => this.$canvas = $e}
                    onWheel={this.handleWheel}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseOut={this.handleMouseOut}
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}
                    onKeyDown={this.handleKeyPress.bind(this)}
                />
            </div>
        )
    }
}