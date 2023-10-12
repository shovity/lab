const ws = require('ws')

// Protocal: HTTP 2
const server = new ws.WebSocketServer({ port: 3232 })

server.on('connection', (socket) => {
    setInterval(() => {
        socket.send('Hi! Im server')
    }, 500)

    socket.on('message', (data) => {
        console.log('server: ', data.toString())
    })
})


/**
 * Client-side (Nodejs)
 */

// Missing reconnection, acknowledgements, broadcasting, etc
const client = new ws.WebSocket('ws://127.0.0.1:3232')

client.on('open', () => {
    // Can sent binary instead of text (Buffer, Uint8Array, etc)
    client.send('Hi! Im client')
})

// Receive ws data frames regardless of whether they are listening or not
client.on('message', (data) => {
    console.log('client:', data.toString())
})

