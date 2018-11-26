import {
    tables,
} from '../../config'
import {
    dbConnx,
}
from '../db'
var r = require('rethinkdb')

export class AppState {

    constructor(newAppState) {
        this.id = newAppState.id
        this.mics = newAppState.mics
        this.selectedMicrophones = newAppState.selectedMicrophones
        this.cameras = newAppState.cameras
        this.recording = newAppState.recording

        this.updateDB(newAppState)
    }

    updateDB(newAppState) {
        r.table(tables.appState).update(newAppState).run(dbConnx)
        .then(data => {
            if((data.replaced == 0) && (!data.unchanged == 1)) throw 'App State doesn\'t yet exist. inserting instead.'
        })
        .catch(err => {
            console.log(err)
            r.table(tables.appState).insert(newAppState).run(dbConnx)
        })
    }
}
