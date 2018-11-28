import express from 'express'
import './db'
import './devices'
import './sockets'
import { serverPort } from '../config'

// TODO: use express app for desktop browser portion
const app = express()

export const server = app.listen(serverPort, () => {
        const { address, port } = server.address()
        console.log(`Listening at http://${address}:${port}`)
})
