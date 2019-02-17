const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString,uniqueUserName} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server);
var users = new Users();
var roomArray = [];

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
           return callback('Name and Room name are required.');
        }else{
            if(uniqueUserName(params.room, params.name, users.users)){
                return callback('User name has been taken.');
            }
        }

        var lowerCase = params.room.toLowerCase();

        socket.join(lowerCase);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, lowerCase);

        io.to(lowerCase).emit('updateUserList', users.getUserList(lowerCase));
        socket.emit('newMessage',generateMessage('Admin',`Hello ${params.name} Wellcom to ${lowerCase} chat`));
        socket.broadcast.to(lowerCase).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name ,message.text));
        }

       callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name , coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} left the room`));
        }
    });
});

server.listen(port, () => {
    console.log(`server run on PORT ${port}`);
});