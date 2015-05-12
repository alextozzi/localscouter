$(document).ready(function(){
    var socket = io.connect('http://localhost:3000'),
        titel,
        beschrijving,
        picture;


    $('#uploadForm').submit(function() {
        var titel = $("#titel").val();
        var beschrijving = $("#beschrijving").val();

        var picture = $("#linkpicture").val();
        var pictureupload = "/uploads/" + picture.replace('C:\\fakepath\\', '');

        socket.emit('updatePictures', {titel : titel, beschrijving: beschrijving, picture: picture});

        $(this).ajaxSubmit({
            error: function(xhr) {
                status('Error: ' + xhr.status);
            },

            success: function(response) {
                console.log(response);
            }
        });

        return false;
    });
});