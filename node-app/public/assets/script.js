// Socket part
var socket = io(window.location.origin);

socket.on('story', function (data) {
    var div = document.getElementById("news-list");
    console.log("Rendering story : ",data);
    div.innerHTML += "<h3>" + data.title + ' <small>'+ data.date + "</small></h3><br>";
    socket.emit('my other event', { my: 'data' });
});

socket.on('monitoring', function (data) {
    // Update user counters
    var div_monitoring = document.getElementById("monitoring");

    div_monitoring.innerHTML = "<h1><small>Nbr users:</small><br /><center>" + data.nbr_users + "<center></h1>";

    // Update uptime
    var hours = Math.floor(data.monit.uptime / 3600);
    data.monit.uptime = data.monit.uptime - hours * 3600;
    var minutes = Math.floor(data.monit.uptime / 60);
    var seconds = data.monit.uptime - minutes * 60;
    div_monitoring.innerHTML += "<h2><small>Uptime:</small><br /><center>" + hours + " hours, " + minutes + " minutes and " + seconds + " seconds<center></h2>";

    var ram_usage = Math.floor((data.monit.ram.free / data.monit.ram.total) * 100);
    div_monitoring.innerHTML += "<h2><small>Ram Usage:</small></h2><br />";
    div_monitoring.innerHTML += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: '+ram_usage+'%;">'+ram_usage+'%</div></div>';

    var load_avg = Math.floor(data.monit.loadavg[0] * 100);
    div_monitoring.innerHTML += "<h2><small>Load Average:</small></h2><br />";
    div_monitoring.innerHTML += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: '+load_avg+'%;">'+load_avg+'%</div></div>';
});





// Create an event
$('#add_event').submit(function(e) {
    e.preventDefault(); // On évite le recharchement de la page lors de la validation du formulaire
    // On crée notre objet JSON correspondant à notre message
    var event = {
        user_id : $('#user_id_event').val(),
        nbr_participant : $('#nbr_participant_event').val(),
        name : $('#name_event').val(),
        type : $('#type_event').val(),
        decription : $('#description_event').val(),
        hashtag : $('#hashtag_event').val(),
        longitude : $('#longitude_event').val(),
        latitude : $('#latitude_event').val()
    }
    $('#user_id_event').val(''); // On vide les champ de texte
    $('#type_event').val(''); // On vide les champ de texte
    $('#nbr_participant_event').val(''); // On vide les champ de texte
    $('#longitude_event').val(''); // On vide les champ de texte
    $('#latitude_event').val(''); // On vide les champ de texte
    $('#name_event').val(''); // On vide les champ de texte
    $('#decription_event').val(''); // On vide les champ de texte
    $('#hashtag_event').val(''); // On vide les champ de texte
    if (event.name.trim().length !== 0 && event.user_id.trim().length !== 0 && event.latitude.trim().length !== 0 && event.longitude.trim().length !== 0) { // Gestion message vide
      socket.emit('add_event', event);
      alert('New event -> ' + event.name + ' at ['+event.latitude+', '+event.longitude+']')
    }
    $('#addEvent').modal('hide')
});

// Get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showPosition(position) {
    $('#longitude_event').val(position.coords.longitude); // On vide les champ de texte
    $('#latitude_event').val(position.coords.latitude); // On vide les champ de texte
}
