const express = require('express')
const app = express()
const http = require('http')
const dotenv = require('dotenv');
const serve = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(serve)
const PORT = process.env.PORT || 3000

dotenv.config();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    app.use('/', express.static(__dirname));
});

io.on('connection', socket => {
    var total = io.engine.clientsCount
    var user = `user${total}`

    console.log(user, "Connected")
    
    socket.on('message', (user, msg) => {
        socket.broadcast.emit('message', user, msg)
    })
    
    socket.on('disconnect', reason => {
        console.log(reason, ": User Disconnected");
    })
})

serve.listen(PORT, () => {
    console.log('http://localhost:3000');
});