import React, { Component } from 'react'
import * as styles from '../assets/css/gui.css'
import {
    serverIP,
    socketPort,
} from '../../config'
import io from 'socket.io-client'
const socket = io.connect('http://' + serverIP + ':' + socketPort)

export default class PostProduction extends Component {
    constructor(props) {
        super(props)
    }

    handleExitPostProduction() {
        const newAppState = {
            ...this.props.podware,
            isPostProduction: false,
        }
        socket.emit('updateAppState', newAppState)
    }

    render() {
        return (
            <div>
                <div className={styles.recordingControlButton} onClick={() => this.handleExitPostProduction()}>exit</div>
                <div>this is post production for {this.props.podware.postProductionSessionID}</div>
            </div>
        )
    }
}
