import React, { Component } from 'react'
import { TextInput, View, Button, StyleSheet, Text } from 'react-native'
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
import DeviceInfo from 'react-native-device-info'
import io from 'socket.io-client'
const socket = io.connect('http://' + serverIP + ':' + socketPort)
const serial = DeviceInfo.getSerialNumber()

export default class Controller extends Component {
    constructor(props) {
        super(props)
        this.state = {}

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

        componentDidMount() {
                socket.emit('remoteConnected', {serial})
                socket.on('queryRemote', () => socket.emit('remoteConnected', {serial}))
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

        handleNewController() {
                console.log('\nthis.props')
                console.log(this.props)
                socket.emit('setRemoteAsController', {serial})
        }

        render() {
                var promptToControl = true
                return (
                        <View>
                                {
                                this.props.app.recording ?
                                <Button className={[styles.recordingControlButton,styles.stopButton]} title="STOP" onPress={() => this.handleFullRecordStop()} /> :
                                <Button className={[styles.recordingControlButton,styles.startButton]} title="START" onPress={() => this.handleFullRecordStart()} />
                                }
                                <TextInput
                                        style={styles.sessionName}
                                        onChangeText={(text) => this.setState({text})}
                                        placeholder="name recording before STOP"
                                        />
                                {/*<Microphones {...this.props} />
                                <Cameras {...this.props} />
                                <Sessions {...this.props} />*/}
                                {promptToControl ? <Button title="use this device as Controller" onPress={() => this.handleNewController()} /> : null}
                        </View>
                )
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
