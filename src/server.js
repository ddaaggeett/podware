import express from 'express'
import './db'
import './devices'
import './sockets'
import { serverPort } from '../config'

// Initialize http server
const app = express()

// Launch the server on the serverPort
export const server = app.listen(serverPort, () => {
        const { address, port } = server.address()
        console.log(`Listening at http://${address}:${port}`)
})
