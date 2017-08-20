import React, { Component } from 'react'

import './styles/Plate.scss'

const colors = [
    {r: 255, g: 255, b: 255},
    {r: 228, g: 228, b: 228},
    {r: 136, g: 136, b: 136},
    {r: 34, g: 34, b: 34},
    {r: 255, g: 167, b: 209},
    {r: 229, g: 0, b: 0},
    {r: 229, g: 149, b: 0},
    {r: 160, g: 106, b: 66},
    {r: 229, g: 217, b: 0},
    {r: 148, g: 224, b: 68},
    {r: 2, g: 190, b: 1},
    {r: 0, g: 211, b: 221},
    {r: 0, g: 131, b: 199},
    {r: 0, g: 0, b: 234},
    {r: 207, g: 110, b: 228},
    {r: 130, g: 0, b: 128},
].map(item => {
    const result = []
    for (const k of ['r', 'g', 'b']) {
        let v = item[k].toString(16)
        if (v.length === 1) {
            v = '0' + v
        }
        result.push(v)
    }
    return '#' + result.join('')
})

export default class Plate extends Component {

    handleClick(color) {
        this.props.onSelectColor(color)
    }

    render() {
        return (
            <div className="board-plate">
                {
                    colors.map(item =>
                        <div className="plate-item" key={item}>
                            <div style={{background: item}} onClick={this.handleClick.bind(this, item)}></div>
                        </div>
                    )
                }
            </div>
        )
    }
}