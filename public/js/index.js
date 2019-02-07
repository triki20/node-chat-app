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

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a)
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name=message]').val()
    }, function(){});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('createLocationMessage',{
            longitude: position.coords.longitude,
            latitude:  position.coords.latitude
        });
    },function(){
        alert('Unable to fetch location.');
    });
});