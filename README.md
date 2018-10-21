### [podware](https://github.com/ddaaggeett/podware) camera module

development - single device

    npm i
    npm run android

start recording from [server](https://github.com/ddaaggeett/podware/blob/568c68f3bc4c6336d0af896f9b80bdc411b9f9de/src/video/index.js) with:

    var io = require('socket.io').listen(port)
    io.on('connect', (socket) => {
        ...
        socket.emit('startRecording')
        ...
        socket.emit('stopRecording')
        ...
    })

if using multiple camera devices with podware, it's recommended you build and deploy to each device:

    npm run build
    npm run deploy
