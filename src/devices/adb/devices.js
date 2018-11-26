import {
    exec,
    spawn,
} from 'child_process'

export const get_adb_device_list = () => {
    return new Promise((resolve, reject) => {
        spawn('adb', ['devices']).stdout.on('data', function(data) {
            var devices = []
            var arrayOfStrings = data.toString().split('\n')
            for (var x = 1; x< arrayOfStrings.length; x++) {
                var currentID = arrayOfStrings[x].split('\t')[0]
                if(currentID.length !== 0) devices.push(currentID)
            }
            if(devices.length !== 0) resolve(devices)
            else {
                resolve([])
            }
        })
    })
}

export const closeAllRunningApps = (device) => {
    return new Promise((resolve, reject) => {
        exec('adb -s ' + device + ' shell dumpsys window a | grep \'/\' | cut -d \'{\' -f2 | cut -d \'/\' -f1 | cut -d \' \' -f2', (err, stdout, stdin) => {
            if(!err) {
                var runningApps = stdout.toString().split('\n')
                runningApps.forEach((app) => {
                    exec('adb -s ' + device + ' shell am force-stop ' + app)
                })
                resolve()
            }
        })
    })
}
