$(document).ready(function(){
    var socket = io.connect('http://localhost:3000');
    var seenSlide = 0;
    var seenPlaatsen = [];
    var Plaats = '';
    var hoeveel;
    var datavote;

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
            $('#slidealtitude').text(plaatsbesteming.latitude);
            $('#slidelongitude').text(plaatsbesteming.longitude);



        } else {
            window.location.href = '/uploadfoto';
        }
    });

    $('#button-left').on('click', function(){
        socket.emit('randomize', {});
    });
    $('#button-right').on('click', function(){
        datavote = $(this).data('vote');
        socket.emit('plus', datavote);
        socket.emit('randomize', {})

    });


    socket.on('votePlus', function(vote){
        datavote = vote[0].data;
        hoeveel = vote[0].vote;
        hoeveel++;
        socket.emit('hoeveel', { vote: hoeveel});
    });



    $('#uploadForm').submit(function() {
        var titel = $("#titel").val();
        var beschrijving = $("#beschrijving").val();
        var pictureupload = $("#linkpicture").val();
        var picture= "/uploads/" + pictureupload.replace('C:\\fakepath\\', '');
        var latitude = $('#latitude').val();
        var longitude = $('#longitude').val();

        socket.emit('addPlaats', {titel : titel, beschrijving: beschrijving, picture: picture,latitude: latitude, longitude:longitude });

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