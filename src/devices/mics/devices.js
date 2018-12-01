import {
    exec,
} from 'child_process'
import {
    io_remote,
} from '../../sockets'

export const queryAvailableMicrophones = () => {
    exec('ffmpeg -f avfoundation -list_devices true -i ""', (err,stdout,stdin) => {
        if(err) {
            setAvailableMicrophones(err)
        }
        else {
            setAvailableMicrophones(stdout) // TODO: not yet tested
        }
    })
}

export const setAvailableMicrophones = (textBlob) => {
    const lines = textBlob.toString().split('\n')
    var audioDeviceList = []
    for(var x = 0; x < lines.length; x++) {
        if(lines[x].includes('AVFoundation audio devices')) {
            for(var y = x + 1; y < lines.length; y++) {
                const line = lines[y]
                if(line.includes('AVFoundation input device')) {
                    const pos = line.indexOf('] ')
                    const audioDevice = line.substring(pos + 2)
                    audioDeviceList.push(audioDevice)
                }
            }
        }
    }
    io_remote.sockets.emit('logAvailableMicrophones', audioDeviceList)
}
