import { spawn, exec } from 'child_process'
import { get_adb_device_list, closeAllRunningApps } from './devices'
import {
    io_react,
} from '../../sockets'
var r = require('rethinkdb')

const startCameraApp = (device) => {
    return new Promise((resolve,reject) => {
        exec('adb -s ' + device + ' shell am start -n com.podware_camera/com.podware_camera.MainActivity',(err,stdout,stdin) => {
            if(err) {
                console.log('ERROR opening app on device ' + device)
                console.log(err)
            }
            resolve()
        })
    })
}
