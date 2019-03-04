var socket = io();

socket.on('chatRoomList', function(roomList){
    var select = jQuery('<select></select>');
 roomList.forEach(function (room) {
       
      select.append(jQuery('<option></option>').text(room));
      select.attr('name','activeRoom')
    });

    jQuery('#dropdown').html(select);
});


