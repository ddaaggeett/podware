import { spawn, exec, spawnSync } from 'child_process'
import {
    recordingsDir,
    audioExt,
} from '../../../config'
import {
    io_react,
} from '../../sockets'
import { AudioTrack } from '../../objects'

export class Mic {
    constructor(id) {
        this.id = id
        this.selected = false
    }
}

export const recordAudioDevice = (index,timestamp, toDir) => {
    const audioFileName = timestamp + '_' + index + audioExt
    const newFile = toDir + audioFileName
    var audioTrack
    exec('ffmpeg -f avfoundation -i ":' + index + '" ' + newFile, {
        maxBuffer: 10000000, // 10mB should work? default is 200kB
    }, (err, stdout, stdin) => {
        const endTime = Date.now()
        audioTrack.finishRecording(endTime)
        // if(err) { // thrown on killAllAudioInput()
        //     console.log('error recording audio ' + index)
        // }
    })
    console.log('recording device ' + index)
    audioTrack = new AudioTrack(newFile)
}

export const killAllAudioInput = () => {
    exec('killall ffmpeg')
}
