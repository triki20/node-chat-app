var socket = io();


// create connect to server
socket.on('connect', function (){
    console.log('Connected to the serve');
});

socket.on('disconnect', function (){
    console.log('Disconnected from server');
});

// get message from server
socket.on('newMessage', function(message){
    console.log('New message', message);
});

