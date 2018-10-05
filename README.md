### remote camera

camera client triggered with socket.io

    npm i

    npm run android

start recording from server with:

    var io = require('socket.io').listen(socketPort)
    io.on('connect', (socket) => {
        ...
        socket.emit('startRecording')
        ...
        socket.emit('stopRecording')
        ...
    })
