import { spawn, exec } from 'child_process'

export const handleScreenshot = (device) => {
    getScreenshot(device).then(() => {
        pullScreenShot(device)
    })
}

const getScreenshot = (device) => {
    return new Promise((resolve,reject) => {
        exec('adb -s ' + device + ' shell screencap -p /sdcard/' + device + '.png', (err,stdout,stdin) => {
            if(err) process.exit()
            resolve()
        })
    })
}
const pullScreenShot = (device) => {
    return new Promise((resolve,reject) => {
        exec('adb -s ' + device + ' pull /sdcard/' + device + '.png ./src/assets/screenshots', (err,stdout,stdin) => {
            if(err) process.exit()
            resolve()
        })
    })
}
export const getScreenDimensions = (device) => {
    return new Promise((resolve, reject) => {
        exec('adb -s ' + device + ' shell dumpsys display | grep mDefaultViewport', (err, stdout, stdin) => {
            resolve({
                width: getImageWidth(stdout),
                height: getImageHeight(stdout)
            })
        })
    })
}
function getImageWidth(text) {
    var imgWidth = text.split('deviceWidth=')[1]
    var cut = imgWidth.indexOf(',')
    if(cut != -1) {
        imgWidth = imgWidth.substring(0, cut)
    }
    return imgWidth
}
function getImageHeight(text) {
    var imgHeight = text.split('deviceHeight=')[1]
    var cut = imgHeight.indexOf('}')
    if(cut != -1) {
        imgHeight = imgHeight.substring(0, cut)
    }
    return imgHeight
}

export const inputDeviceTap = (device, coords) => {
    return new Promise ((resolve, reject) => {
        exec('adb -s ' + device + ' shell input tap ' + coords.x + ' ' + coords.y, (err, stdout, stdin) => resolve())
    })
}

export const handleScreenshots = (devices) => {
    devices.forEach(function(device) {
        handleScreenshot(device)
    })
}

export const adbSnapAndDisplay = () => {
    exec('cd ~/github/adb-screenshot-pull/ && node . imgs',(err,stdout,stdin) => {
        if(err)console.log(err)
    })
}
