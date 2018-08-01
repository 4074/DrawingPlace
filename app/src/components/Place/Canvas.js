import React, { Component } from 'react'

import Utils from 'utils'

export default class Canvas extends Component {
    ratio = {
        default: 2,
        min: 2,
        max: 10,
        step: 4,
        current: 2,
        changing: false
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
        this.ctx = this.$canvas.getContext('2d')
        this.initDraw()
        this.$canvas.focus()
    }

    componentWillReceiveProps(nextProps) {
        // draw the last point
        if (nextProps.dataSource.length) {
            this.draw(nextProps.dataSource[nextProps.dataSource.length - 1], true)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let should = false
        if (this.state.ratio !== nextState.ratio) {
            this.$canvas.setAttribute('width', this.size.width * nextState.ratio)
            this.$canvas.setAttribute('height', this.size.height * nextState.ratio)
            setTimeout(() => {
                this.initDraw()
            }, 0)
        } else {
            should = false
        }

        return should
    }

    handleWheel(event) {
        event.preventDefault()
        if (this.ratio.changing) return;
        let ratio
        if (event.deltaY < 0) {
            if (this.state.ratio < this.ratio.max) {
                ratio = this.state.ratio + this.ratio.step
                this.ratio.current = ratio
                this.setState({
                    ratio
                })
            }
        } else {
            if (this.state.ratio > this.ratio.min) {
                ratio = this.state.ratio - this.ratio.step
                this.ratio.current = ratio
                this.setState({
                    ratio
                })
            }
        }

        if (ratio) {
            this.ratio.changing = true
            this.scrollToFixRatio(ratio, this.getEventRelativePosition(event))
        }
    }


    scrollToFixRatio(ratio, position) {
        let left = this.$board.scrollLeft + position.x * (ratio/this.state.ratio) - position.x
        let top = this.$board.scrollTop + position.y * (ratio/this.state.ratio) - position.y
        
        setTimeout(() => {
            this.$board.scrollLeft = left
            this.$board.scrollTop = top
            this.ratio.changing = false
        }, 17)

        this.props.onRatio((ratio - this.ratio.min) / this.ratio.step + 1)
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
        if (!this.mouseState.grab) {
            const position = this.getEventRelativePosition(event)

            const { color, onMove, editable } = this.props
            const point = {
                x: Math.floor(position.x / this.state.ratio),
                y: Math.floor(position.y / this.state.ratio)
            }
            onMove(point)
            if (color && editable) {
                const drawData = {
                    ...point,
                    w: 1,
                    h: 1,
                    c: this.props.color
                }

                let needDraw = true
                if (
                    this.mouseState.drawed &&
                    this.mouseState.drawed.x === drawData.x && this.mouseState.drawed.y === drawData.y
                ) {
                    needDraw = false
                }
                if (needDraw) {
                    this.mouseState.drawed && this.resetPoint(this.mouseState.drawed)
                    this.draw(drawData)
                    this.mouseState.drawed = drawData
                }
            } else {
                if (this.mouseState.drawed) {
                    this.resetPoint(this.mouseState.drawed)
                    this.mouseState.drawed = null
                }
            }

        } else {
            const position = this.getEventPosition(event)
            if (position.x !== this.mouseState.grabPosition.x && position.y !== this.mouseState.grabPosition.y) {
                this.mouseState.moved = true
            }

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
        const position = this.getEventRelativePosition(event)
        if (color && !this.mouseState.moved && editable) {
            // if (this.state.ratio === this.ratio.min) {
            //     const ratio = this.ratio.max
            //     this.setState({
            //         ratio
            //     })
            //     this.scrollToFixRatio(ratio, position)
            //     return
            // }
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
        let x = event.clientX //+ this.$board.scrollLeft - Utils.getOffsetLeft(event.target)
        let y = event.clientY //+ this.$board.scrollTop - Utils.getOffsetTop(event.target)

        return {x, y}
    }

    getEventRelativePosition(event) {
        let x = event.clientX - Utils.getOffsetLeft(event.target)
        let y = event.clientY - Utils.getOffsetTop(event.target)
        return {x, y}
    }

    initDraw() {
        const { ratio } = this.state
        this.ctx.scale(ratio, ratio)
        
        for (const item of this.dataSourceRendered) {
            this.draw(item, true, false)
        }
        // ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    draw(data, real, save = true) {
        const $canvas = this.$canvas
        const ctx = this.ctx
        const { ratio } = this.state

        ctx.fillStyle = data.c
        ctx.fillRect(data.x, data.y, data.w, data.h)

        if (real && save) {
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
        this.ctx.clearRect(data.x, data.y, data.w, data.h)
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