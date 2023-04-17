const express = require('express')
const app = express()
const http = require('http')
const dotenv = require('dotenv');
const serve = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(serve)
const PORT = process.env.PORT || 3005

dotenv.config();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    app.use('/', express.static(__dirname));
});

function handleIncomingMessage(socket, username, message) {
    socket.broadcast.emit('message', username, message)
}

io.on('connection', socket => {
    const total = io.engine.clientsCount
    const user = `user${total}`
    
    console.log(user, "Connected")
        
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


/* socket.onAny(e => {
    console.log(e);
}) */

/* socket.use((e, next) => {
    handleIncomingMessage(e, socket);
    next();
}) */

/* function handleIncomingMessage(e, socket) {
    socket.broadcast.emit(e[0], e[1].username, e[1].message);
} */