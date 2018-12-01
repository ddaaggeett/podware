import {
    io_remote,
} from '../sockets'
import {
    recordAudioDevice,
    killAllAudioInput,
} from '../devices/mics'
import {
    recordingsDir,
    tables,
} from '../../config'
import {
    dbConnx,
} from '../db'
var r = require('rethinkdb')
var fs = require('fs')

export class RecordingSession {
    constructor(session) {
        console.log('recording session init')
        this.session = session
        this.audioTracks = []
        this.videoTracks = []
        this.readyMediaFileDir().then(dir => {
            this.mediaDir = dir
            global.podware.recording = true
            global.podware.currentRecordingSession = this

            this.recordAudio(dir)
            this.recordVideo()
            persistSession(this)
        })
    }

    recordAudio(toDir) {
        global.podware.selectedMicrophones.forEach(index => recordAudioDevice(index, this.session, toDir))
    }

    recordVideo() {
        io_remote.sockets.emit('startRecording', this.session)
    }

    readyMediaFileDir() {
        return new Promise((resolve,reject) => {
            const dir = recordingsDir.concat(this.session,'/')
            if(!fs.existsSync(dir)) {
                fs.mkdir(dir, () => resolve(dir))
            }
            else resolve(dir)
        })
    }
}

export const stopRecordingSession = (name) => {
    global.podware.currentRecordingSession.name = name
    global.podware.currentRecordingSession.lastEditTime = Date.now()
    killAllAudioInput()
    io_remote.sockets.emit('stopRecording')
    global.podware.recording = false
    global.podware.updateDB(global.podware)
}

export const persistSession = (newObject) => {
    if(newObject.id == undefined) r.table(tables.recordingSessions).insert(newObject).run(dbConnx)
    else r.table(tables.recordingSessions).update(newObject).run(dbConnx)
}

export const setCurrentRecordingSession = (session) => {
    global.podware.currentRecordingSession = session
    global.podware.updateDB(global.podware)
}

export const setNewSessionsList = () => {
    r.table(tables.recordingSessions).orderBy(r.desc('lastEditTime')).pluck('name','id').run(dbConnx)
    .then(data => {
        global.podware.availableSessions = data
        global.podware.updateDB(global.podware)
    })
}
