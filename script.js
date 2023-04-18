const express = require('express')
const app = express()
const http = require('http')
const dotenv = require('dotenv');
const serve = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(serve)
dotenv.config();

const PORT = process.env.PORT || 3005

function handleIncomingMessage(socket, username, message) {
    socket.broadcast.emit('message', username, message)
}

function handleOutgoingMessage() {
    
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    app.use('/', express.static(__dirname));
});

io.on('connection', socket => {
    const total = io.engine.clientsCount
    
    console.log(`Total Users Connected ${total}`)
        
    socket.on('message', ({username, message}) => {
        handleIncomingMessage(socket, username, message)
    })
    
    socket.on('disconnect', reason => {
        console.log(reason, ": User Disconnected");
    })
})

serve.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});