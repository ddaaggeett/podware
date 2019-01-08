import { socketPort } from '../../config'
import { queryAllDevices } from '../devices'
import { Camera } from '../devices'
import { queryAvailableMicrophones } from '../devices/mics/devices'
import { RecordingSession, Remote } from '../objects'
import { setRemoteAsController } from '../objects/Remote'
import { stopRecordingSession } from '../objects/RecordingSession'
import { pullVideoFile } from '../objects/VideoTrack'

export const io_remote = require('socket.io').listen(socketPort)

io_remote.on('connect', (socket) => {
    socket.on('remoteConnected', data => new Remote(data.serial))
    socket.on('setRemoteAsController', data => setRemoteAsController(data.serial))
    /*
    socket.on('videoReadyToPull', data => pullVideoFile(data,camera))
    socket.on('toggleCameraRecording', () => camera.toggleCameraRecording())
    socket.on('disconnect', () => camera.disconnect())
    */
    socket.on('startNewRecordingSession', data => new RecordingSession(data.session))
    socket.on('stopRecordingSession', data => stopRecordingSession(data.name))
    socket.on('queryAllDevices', () => queryAllDevices())
    socket.on('queryAvailableMicrophones', () => queryAvailableMicrophones())
})
