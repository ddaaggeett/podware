import { exec, spawn } from 'child_process'
import { io_camera } from '../../sockets'
import { VideoTrack } from '../../objects'
import { adbPort } from '../../../config'

export class Camera {
    constructor(serial,remoteIP) {
        this.serial = serial
        this.remoteIP = remoteIP
        this.recording = false
        this.connectADB().then(() => {
            this.connect()
        })
    }

    connectADB() {
        return new Promise((resolve,reject) => {
            exec('adb connect ' + this.remoteIP, (err,stdout,stdin) => {
                if(err) {
                    console.log('ERROR CONNECTING ' + this.serial + ' TO WIRELESS ADB.')
                    console.log(err)
                    this.adb = this.serial
                }
                else {
                    this.adb = this.remoteIP.concat(':',adbPort)
                }
                resolve()
            })
        })
    }

    connect() {
        const cameras = global.podware.cameras
        var exists = false
        for(var x = 0; x < cameras.length; x++) {
            if(cameras[x].serial == this.serial) {
                exists = true
                break
            }
        }
        if(!exists) {
            global.podware.cameras = [
                ...global.podware.cameras,
                this
            ]
            global.podware.updateDB(global.podware)
        }
    }

    disconnect() {
        const cameras = global.podware.cameras
        const cameraIndex = cameras.findIndex(x => x.serial == this.serial)
        const newCameras = [
            ...cameras.slice(0,cameraIndex),
            ...cameras.slice(cameraIndex + 1)
        ]
        global.podware.cameras = newCameras
        global.podware.updateDB(global.podware)
    }

    toggleCameraRecording() {
        const cameras = global.podware.cameras
        const cameraIndex = cameras.findIndex(x => x.serial == this.serial)
        const currentStatus = cameras[cameraIndex].recording
        global.podware.cameras[cameraIndex].recording = !currentStatus
        global.podware.updateDB(global.podware)
    }
}

export const queryCameras = () => {
    io_camera.sockets.emit('queryCamera')
}
