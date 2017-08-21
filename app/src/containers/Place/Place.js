import React, { Component } from 'react'
import { connect } from 'react-redux'

import { say } from 'redux/modules/chat'
import { isLoaded, load, selectColor } from 'redux/modules/place'

import { Spin } from 'antd'
import { PlaceBoard } from 'components'
import './Place.scss'

@connect(
    (state) => ({ auth: state.auth, place: state.place }),
    { load, selectColor }
)
export default class Place extends Component {
    
    componentDidMount() {
        const { place, load } = this.props
        if (!isLoaded(place)) {
            load()
        }
    }

    handleKeyPress(event) {
        console.log(event)
    }

    render() {
        const { place } = this.props
        
        return (
            <Spin spinning={place.loading}>
                <div className="place" onKeyPress={this.handleKeyPress.bind(this)}>
                    {
                        isLoaded(place) &&
                        <PlaceBoard
                            dataSource={place.data}
                            color={place.color}
                            onSelectColor={this.props.selectColor}
                        />
                    }
                </div>
            </Spin>
        )
    }
}