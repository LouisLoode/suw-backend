// Socket part
var socket = io(window.location.origin);


socket.on('monitoring_users', function (data) {
    var div = document.getElementById("monitoring_users_list");
    console.log("Rendering story : ",data);
    $('#monitoring_users_list').fadeIn( "slow" );
    if(data.user != undefined){
        div.innerHTML += data.type+' : ' + data.user.model + ' (' + data.user.uuid + ') at ['+data.user.location[0]+', '+data.user.location[1]+']<br>';
    } else {
        div.innerHTML += data.type+' <br>';
    }
    
});

socket.on('monitoring_events', function (data) {
    var div = document.getElementById("monitoring_events_list");
    $('#monitoring_events_list').fadeIn( "slow" );
    if(data.event != undefined){
        div.innerHTML += data.type+' : ' + data.event.name + ' at ['+data.event.location[0]+', '+data.event.location[1]+']<br>';
    } else {
        div.innerHTML += data.type+' <br>';
    }
    
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
        longitude : parseFloat($('#longitude_event').val(), 10),
        latitude : parseFloat($('#latitude_event').val(), 10)
    }
    $('#user_id_event').val(''); // On vide les champ de texte
    $('#type_event').val(''); // On vide les champ de texte
    $('#nbr_participant_event').val(''); // On vide les champ de texte
    $('#longitude_event').val(''); // On vide les champ de texte
    $('#latitude_event').val(''); // On vide les champ de texte
    $('#name_event').val(''); // On vide les champ de texte
    $('#decription_event').val(''); // On vide les champ de texte
    $('#hashtag_event').val(''); // On vide les champ de texte
    if (event.name.trim().length !== 0 && event.user_id.trim().length !== 0 && event.latitude !== undefined && event.longitude !== undefined) { // Gestion message vide
        socket.emit('add_event', event, function (data) {
            alert('New event -> ' + event.name + ' at ['+event.latitude+', '+event.longitude+']')
        });
    }
    $('#addEvent').modal('hide')
});

// Search an event
$('#search_events').submit(function(e) {
    e.preventDefault(); // On évite le recharchement de la page lors de la validation du formulaire
    // On crée notre objet JSON correspondant à notre message
    var event = {
        distance : parseFloat($('#distance_search_event').val(), 10),
        // limit : parseInt($('#limit_search_event').val(), 10),
        longitude : parseFloat($('#longitude_search_event').val(), 10),
        latitude : parseFloat($('#latitude_search_event').val(), 10)
    }

    if (event.longitude !== undefined && event.latitude !== undefined) { // Gestion message vide
        socket.emit('fetch_events', event, function (data) {
            // New event -> ' + event.name + ' at ['+event.latitude+', '+event.longitude+']
            $('#search_events_return_box').fadeIn( "slow" );
                var div = document.getElementById("search_events_list");
                div.innerHTML += data.length+' event found <br/>';
                for(var i=0; i<data.length ; i++) {
                    div.innerHTML += 'event n°'+i+' : ' + data[i].name + ' at ['+data[i].location[0]+', '+data[i].location[1]+']<br>';
                }
        });

    }
    
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

    $('#longitude_search_event').val(position.coords.longitude); // On vide les champ de texte
    $('#latitude_search_event').val(position.coords.latitude); // On vide les champ de texte
}


// function getProximityEvents(){
//     var data = {
//       limit: 10,
//       distance: 10, // in km
//       latitude: 48.85275120000001,
//       longitude: 2.4278817999999998
//     };
//     socket.emit('fetch_events', data, function (data) {
//         console.log(data); // data
//     });
// }