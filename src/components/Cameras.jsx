import React, { Component } from 'react'
import * as styles from '../assets/css/microphones.css'
import classNames from 'classnames'

class Cam extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const isSelected = false
        const cameraStyle = classNames(
            styles.micItem,
            isSelected ? styles.micItemSelect : styles.micItemUnSelect
        )
        return (
            <li className={cameraStyle}>{this.props.device}</li>
        )
    }
}

class CameraList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        var cameraList = []
        this.props.list.forEach((device, index) => {
            cameraList.push(<Cam device={device.serial} key={index} index={index} {...this.props} />)
        })
        return (
            <ul className={styles.micList}>{cameraList}</ul>
        )
    }
}

export default class Cameras extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.app.cameras.length != 0) return (
            <div className={styles.microphones}>
                <div className={styles.microphonesTitle}>your cameras:</div>
                <CameraList list={this.props.app.cameras} {...this.props} />
            </div>
        )
        else return <div>turn on your cameras</div>
    }
}
