const http = require('http');
const app = require('./app');
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

//Run when user connects
io.on('connection',(socket) => {
    console.log("user added");
    socket.emit('message',"Welcome to Chat");

    //Broadcast new user joining
    socket.broadcast.emit('message',"New User joined");

    //Listen for chat message
    socket.on('chat message',(msg) => {
        io.emit('chat message',msg);
        console.log("Message: "+ msg);
    });

    //Disconnect User
    socket.on('disconnect',() => {
        console.log("User disconnected");
        io.emit('message',"User Disconnected");
    });
});

server.listen(PORT,() => {
    console.log('listening on port:3000');
});