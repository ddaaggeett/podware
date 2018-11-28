import { socketPort } from '../../config'
import { queryAllDevices } from '../devices'
import { Camera } from '../devices'
import { queryAvailableMicrophones } from '../devices/mics/devices'
import { RecordingSession } from '../objects'
import { stopRecordingSession } from '../objects/RecordingSession'
import { pullVideoFile } from '../objects/VideoTrack'

export const io_camera = require('socket.io').listen(socketPort)

io_camera.on('connect', (socket) => {
    const remoteAddress = socket.handshake.address.split(':')
    const remoteIP = remoteAddress[remoteAddress.length - 1]
    var camera

    socket.on('cameraConnected', device => camera = new Camera(device,remoteIP))
    socket.on('videoReadyToPull', data => pullVideoFile(data,camera))
    socket.on('toggleCameraRecording', () => camera.toggleCameraRecording())
    socket.on('disconnect', () => camera.disconnect())
    socket.on('startNewRecordingSession', data => new RecordingSession(data.session))
    socket.on('stopRecordingSession', data => stopRecordingSession(data.name))
    socket.on('queryAllDevices', () => queryAllDevices())
    socket.on('queryAvailableMicrophones', () => queryAvailableMicrophones())
})
