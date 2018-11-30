import { AppState } from './objects'
import express from 'express'
import './db'
import './devices'
import './sockets'
import { serverPort } from '../config'

try {
    global.podware = new AppState()
}
catch(e) {
    if(e instanceof TypeError) console.log(e, true)
    else console.log(e, false)
}

// TODO: use express app for desktop browser portion
const app = express()

export const server = app.listen(serverPort, () => {
        const { address, port } = server.address()
        console.log(`Listening at http://${address}:${port}`)
})
