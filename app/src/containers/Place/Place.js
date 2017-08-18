import React, { Component } from 'react'
import { connect } from 'react-redux'

import { say } from 'redux/modules/chat'

import { PlaceBoard } from 'components'
import './Place.scss'

@connect(
    (state) => ({ auth: state.auth }),
    { say }
)
export default class Place extends Component {
    
    render() {
        const canvasData = [{
            x: 100,
            y: 100,
            w: 1,
            h: 40,
            c: '#000'
        }]
        return (
            <div className="place">
                <PlaceBoard dataSource={canvasData} />
            </div>
        )
    }
}