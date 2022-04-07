const express = require('express')
const app = express()
const http = require('http')
const serve = http.createServer(HOST)
const { Server } = require('socket.io')
const io = new Server(serve)
var HOST = location.origin.replace(/^http/, 'ws')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    var total = io.engine.clientsCount
    var user = `user${total}`

    console.log(user, "Connected")

    //socket.emit('id', socket.id)
    
    socket.on('message', (user, msg) => {
        io.emit('message', user, msg)
    })
    
    socket.on('disconnect', reason => {
        console.log(reason, ": User Disconnected");
    })
})

serve.listen(3000, () => {
    console.log('http://localhost:3000');
});
