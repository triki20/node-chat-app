var socket = io();

function scrollToBottom(){
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

// create connect to server
socket.on('connect', function (){
    console.log('Connected to the serve');
});

socket.on('disconnect', function (){
    console.log('Disconnected from server');
});

// get message from server
socket.on('newMessage', function(message){
    var formattedTime = moment(message.createAt).format('HH:mm');
    var tamplate = jQuery('#message-template').html();
    var html = Mustache.render(tamplate, {
        text: message.text,
        from: message.from,
        createAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom()
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createAt).format('HH:mm');
    var tamplate = jQuery('#location-message-template').html();
    var html = Mustache.render(tamplate, {
        url: message.url,
        from: message.from,
        createAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom()
});

jQuery('#message-form').on('submit', function(e){
    var textBoxMessage = jQuery('[name=message]');

    e.preventDefault();

    socket.emit('createMessage', {
        from: 'user',
        text: textBoxMessage.val()
    }, function(){
        textBoxMessage.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            longitude: position.coords.longitude,
            latitude:  position.coords.latitude
        });
    },function(){
        locationButton.attr('disabled', 'disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});