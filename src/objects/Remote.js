import { io_remote } from '../sockets'

export class Remote {
        constructor(serial) {
                console.log('new Remote')
                this.serial = serial
                this.connect()
        }

        connect() {
                const remotes = global.podware.remotes

                if(remotes.length == 0) {
                        global.podware.remotes.push(this)
                }
                else {
                        const index = remotes.findIndex(x => x.serial == this.serial)
                        if(index == -1) {
                                global.podware.remotes.push(this)
                        }
                        else {
                                global.podware.remotes = [
                                        ...remotes.slice(0,index),
                                        this,
                                        ...remotes.slice(index + 1)
                                ]
                        }
                }
                global.podware.updateDB(global.podware)
        }

        update(dataObject) {
                var remotes = global.podware.remotes
                const index = remotes.findIndex(x => this.serial == remotes[x].serial)

                global.podware.remotes = [
                        ...remotes.slice(0,index),
                        {
                                ...this,
                                dataObject
                        },
                        ...remotes.slice(index + 1)
                ]
                global.podware.updateDB(global.podware)
        }
}

export const queryRemotes = () => {
        global.podware.remotes = []
        io_remote.sockets.emit('queryRemote')
}

export const setRemoteAsController = (serial) => {
        global.podware.controller = serial
        global.podware.updateDB(global.podware)
}
