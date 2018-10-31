### [podware](https://github.com/ddaaggeett/podware) camera module

development - single device

    npm i
    npm run android

start recording from [server](https://github.com/ddaaggeett/podware/blob/master/src/sockets/index.js) with:

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
