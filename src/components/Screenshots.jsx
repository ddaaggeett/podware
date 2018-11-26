import React, { Component } from 'react'
import Screenshot from './Screenshot'
import * as styles from '../assets/css/screenshots.css'

export default class Screenshots extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        var screenshots = []
        this.props.devices.forEach((device, index) => {
            screenshots.push(<Screenshot device={device} key={index} index={index} />)
        })
        return screenshots
    }
}
