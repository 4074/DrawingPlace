import React, { Component } from 'react'
import { connect } from 'react-redux'


@connect(
    (state) => ({ auth: state.auth }),
    null
)
export default class Place extends Component {

    render() {
        return (
            <div className="place">
                Place
            </div>
        )
    }
}