import { exec, spawn } from 'child_process'
import { persistSession } from './RecordingSession'
var path = require('path')

export class VideoTrack {

    constructor(file) {
        this.file = file
        const videoTracks = global.podware.currentRecordingSession.videoTracks
        videoTracks.push(this)
        global.podware.currentRecordingSession.videoTracks = videoTracks
        global.podware.updateDB(global.podware)
    }

    getVideoTrackData() {
        return new Promise((resolve,reject) => {
            exec('ffprobe -v quiet -print_format json -show_format ' + this.file, (err,stdout,stdin) => {
                if(err) {
                    console.log('error getFileData():')
                    console.log(err)
                }
                else {
                    const duration = JSON.parse(stdout).format.duration
                    resolve(duration)
                }
            })
        })
    }

    finishRecording(endTime) {
        this.endTime = endTime
        this.getVideoTrackData()
        .then(duration => {
            this.duration = duration
            this.startTime = this.endTime - (this.duration * 1000)
            const videoTracks = global.podware.currentRecordingSession.videoTracks
            const trackIndex = videoTracks.findIndex(x => x.file === this.file)
            const newVideoTracks = [
                ...videoTracks.slice(0,trackIndex),
                this,
                ...videoTracks.slice(trackIndex + 1)
            ]
            global.podware.currentRecordingSession.videoTracks = newVideoTracks
            persistSession(global.podware.currentRecordingSession)
            global.podware.updateDB(global.podware)
        })
    }
}

export const pullVideoFile = (data,camera) => {
    const pullFilePath = data.pullFilePath
    const timestamp = data.timestamp
    const endTime = data.endTime
    const videoFileName = path.basename(pullFilePath)
    const mediaDir = global.podware.currentRecordingSession.mediaDir
    const outFile = mediaDir + videoFileName
    const pullCommand = spawn('adb',['-s',camera.adb,'pull',pullFilePath,outFile])
    pullCommand.stdout.on('data',data => {
        console.log(data.toString())
    })
    pullCommand.on('close', exitCode => {
        if(exitCode == 0) {
            var videoTrack = new VideoTrack(outFile) // TODO: move where camera starts recording
            videoTrack.finishRecording(endTime)
            console.log(videoFileName + ' exists locally -> now deleting from ' + camera.serial)
            exec('adb -s ' + camera.adb + ' shell rm -rf ' + pullFilePath, (err,stdout,stdin) => {
                if(err) console.log(err)
            })
        }
    })
}
