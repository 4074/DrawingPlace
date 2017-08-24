import React, { Component } from 'react'
import { connect } from 'react-redux'

import { say } from 'redux/modules/chat'
import { isLoaded, load, selectColor, draw, listenDraw } from 'redux/modules/place'
import { isLoaded as isAuthLoaded, toggleLogin } from 'redux/modules/auth'

import { Spin } from 'antd'
import { PlaceBoard } from 'components'
import './Place.scss'

@connect(
    (state) => ({ auth: state.auth, place: state.place }),
    { load, selectColor, draw, listenDraw, toggleLogin }
)
export default class Place extends Component {
    
    componentDidMount() {
        const { place, load, listenDraw } = this.props
        if (!isLoaded(place)) {
            load()
        }
        listenDraw()
    }

    handleKeyPress(event) {
        console.log(event)
    }

    handleSelectColor(color) {
        const { auth, selectColor, toggleLogin } = this.props
        if (auth.user) {
            selectColor(color)
        } else {
            toggleLogin(true)
        }
    }

    handleDraw(params) {
        this.props.draw(params)
    }

    render() {
        const { place } = this.props

        return (
            <Spin spinning={place.loading}>
                <div className="place">
                    {
                        isLoaded(place) &&
                        <PlaceBoard
                            dataSource={place.data.points}
                            colors={place.data.colors}
                            delay={place.data.delay}
                            color={place.color}
                            onSelectColor={this.handleSelectColor.bind(this)}
                            onDraw={this.handleDraw.bind(this)}
                        />
                    }
                </div>
            </Spin>
        )
    }
}