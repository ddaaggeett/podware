import React, { Component } from 'react'
import { getScreenDimensions, inputDeviceTap, handleScreenshot } from '../devices/adb/screenshot'
import * as styles from '../assets/css/screenshots.css'

export default class Screenshot extends Component {
    constructor(props) {
        super(props)
        this.deviceID = this.props.device

        getScreenDimensions(this.deviceID).then((dimensions) => {
            this.deviceWidth = dimensions.width
            this.deviceHeight = dimensions.height
        })
    }
    imgClickLocation(e, index) {
        var clickedDeviceImage = document.querySelectorAll('.device_image')[index]
        var domRect = clickedDeviceImage.getBoundingClientRect()
        const deviceTapCoords = {
            x: Math.floor((e.clientX - domRect.x) * this.deviceWidth / domRect.width),
            y: Math.floor((e.clientY - domRect.y) * this.deviceHeight / domRect.height)
        }
        inputDeviceTap(this.deviceID, deviceTapCoords).then(() => {
            setTimeout(() => { // TODO: do not rely on setTimeout: instead Promise some 'taskComplete' which triggers when adb device is at next screen resting place before taking the screenshot
                handleScreenshot(this.deviceID)
            },2000)
        })
    }
    render() {
        var screenshotImage = null
        try {
            screenshotImage = require('../assets/screenshots/' + this.props.device + '.png')
        }
        catch(err){
            handleScreenshot(this.deviceID)
        }

        return (
            <div className={styles.screenshot_object}>
                <p>ADB device: {this.props.device}</p>
                <img className="device_image" src={screenshotImage} alt={this.props.device + ' image here'} onClick={(e) => this.imgClickLocation(e, this.props.index)} />
            </div>
        )
    }
}
