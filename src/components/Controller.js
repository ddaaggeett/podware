import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
// import Screenshots from './Screenshots'
// import Microphones from './Microphones'
// import Cameras from './Cameras'
// import Sessions from './Sessions'
// import { handleScreenshots, adbSnapAndDisplay } from '../devices/adb/screenshot'
// import * as styles from '../assets/css/gui.css' // TODO: react native doesn't use css ->
import {
    serverIP,
    socketPort,
} from '../../config'
import io from 'socket.io-client'
const socket = io.connect('http://' + serverIP + ':' + socketPort)

export default class Controller extends Component {
    constructor(props) {
        super(props)

        socket.emit('queryAllDevices')

        socket.on('logAvailableMicrophones', audioDeviceList => {
            const currentAppState = this.props.app
            const newAppState = {
                ...currentAppState,
                mics: audioDeviceList,
            }
            socket.emit('updateAppState', newAppState)
        })
    }

    handleFullRecordStart() {
        console.log('start recording all devices')
        const session = Date.now()
        socket.emit('startNewRecordingSession', {session})
    }

    handleFullRecordStop() {
        console.log('stop recording all devices')
        const name = document.getElementById("sessionName").value
        socket.emit('stopRecordingSession', {name})
    }

    render() {
        return null//(
        //     <div>
        //         <div className={styles.controllerRow}>
        //             {
        //                 this.props.app.recording ?
        //                 <div className={classNames(styles.recordingControlButton,styles.stopButton)} onClick={() => this.handleFullRecordStop()}>stop</div> :
        //                 <div className={classNames(styles.recordingControlButton,styles.startButton)} onClick={() => this.handleFullRecordStart()}>start</div>
        //             }
        //             {/*<div className={styles.recordingControlButton} onClick={() => handleScreenshots(this.props.devices)}>screenshots</div>*/}
        //             <div className={styles.recordingControlButton} onClick={() => adbSnapAndDisplay()}>snap+display</div>
        //         </div>
        //         <input className={styles.sessionName} id="sessionName" placeholder="name recording before STOP" />
        //         <Microphones {...this.props} />
        //         <Cameras {...this.props} />
        //         <Sessions {...this.props} />
        //         <div className={styles.controllerRow}>
        //             {/*<Screenshots {...this.props} />*/}
        //         </div>
        //     </div>
        // )
    }
}

const styles = StyleSheet.create({
    recording: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        borderWidth: 5,
        borderColor: '#f00'
    },
    notRecording: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        borderWidth: 5,
        borderColor: '#0f0'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});
