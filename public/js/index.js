var socket = io();

socket.on('connect', function (){
    console.log('Connected to the serve');

    socket.emit('createMessage', {
        from: 'Yahalom@gmail.com',
        text: 'im fine thx, what about u?'
    });
});

socket.on('disconnect', function (){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New message', message);
});

