$(document).ready(function(){
    var socket = io.connect('http://localhost:3000');
    var seenSlide = 0;
    var seenPlaatsen = [];
    var Plaats = '';

    socket.on('randomPlaats', function(randPlaats){
        seenSlide++;
        var besteming = randPlaats.length;

        if(seenSlide <= besteming){
            var random = Math.floor(Math.random()*besteming);

            while($.inArray(random, seenPlaatsen) > -1)
            {
                random = Math.floor(Math.random()*besteming);
            }
            var plaatsbesteming = randPlaats[random];

            seenPlaatsen.push(random);

            $('#slidefoto').attr({src:plaatsbesteming.picture});
            $('#slidebeschrijving').text(plaatsbesteming.beschrijving);
            $('#slidetitel').text(plaatsbesteming.titel);
        } else {
            window.location.href = '/uploadfoto';
        }
    });

    $('#button-left').on('click', function(){
        socket.emit('randomize', {});
    });
    $('#button-right').on('click', function(){
        socket.emit('randomize', {})


    });

    $('#uploadForm').submit(function() {
        var titel = $("#titel").val();
        var beschrijving = $("#beschrijving").val();
        var pictureupload = $("#linkpicture").val();
        var picture= "/uploads/" + pictureupload.replace('C:\\fakepath\\', '');

        socket.emit('addPlaats', {titel : titel, beschrijving: beschrijving, picture: picture});

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