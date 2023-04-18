const express = require('express')
const app = express()
const io = require('socket.io')
const dotenv = require('dotenv')

dotenv.config();

const PORT = process.env.PORT || 3005

function handleIncomingMessage(socket, username, message) {
    socket.broadcast.emit('message', username, message)
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    app.use('/', express.static(__dirname));
});

const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

const ws = new io.Server(server)

ws.on('connection', socket => {
    const total = ws.engine.clientsCount
    
    console.log(`Total Users Connected ${total}`)
        
    socket.on('message', ({username, message}) => {
        handleIncomingMessage(socket, username, message)
    })
    
    socket.on('disconnect', reason => {
        console.log(reason, ": User Disconnected");
    })
})