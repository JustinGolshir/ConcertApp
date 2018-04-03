
//Define and/or declare all variables
var artist;
var artistName;
var artistURL;
var artistImage;
var trackerCount;
var upcomingEvents;
var goToArtist;
var inputArtist;
var eventDate;
var eventVenue;
var eventCity;
var eventReg;
var eventLongit;
var eventLat;
var ticketURL;
var mapBut;
var ticketBut;

var geolocation;
var map;

// $( document ).ready(function() {
//     console.log( "ready!" );

//Function to seach BandsinTown API


function searchBandsInTown(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        // Printing the entire object to console
        //console.log(response);

        // Constructing HTML containing the artist information
        var artistName = $("<h3>").text(response.name);
        var artistURL = $("<a>").attr("href", response.url).append(artistName);
        var artistImage = $("<img>").attr("src", response.thumb_url);
        var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
        var upcomingEvents = $("<h3>").text(response.upcoming_event_count + " Upcoming Events");
        var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

        // Empty the contents of the artist-div, append the new artist content
        $("#event-amount").html(upcomingEvents);
        // $("#event-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
        // $("#artist-div").append(artistImage); 
        // $("#artist-div").append(artistName);
        // $("#artist-div").append(upcomingEvents);

    });
}


function showArtistEvents(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?limit=20&app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        //   }).then(function(response) {
        //     $("#artist-div").text(JSON.stringify(response));


        //console.log(response)

        response.forEach(function (eventData) {


            var newDate = moment(eventData.datetime).format('lll');
            console.log(newDate)
            var ticketURL = eventData.offers[0].url;


            //Append event data to table


            console.log(eventData.datetime);

            var eventDate = eventData.datetime
            var eventVenue = eventData.venue.name
            var eventCity = eventData.venue.city
            var eventReg = eventData.venue.region;
            var eventLongit = $("<p>").text("Longitude: " + eventData.venue.longitude);
            var eventLat = $("<p>").text("latitude: " + eventData.venue.latitude);
            var ticketURL = eventData.offers[0].url;

            // var mapBut = $("<button class='mapBut'>");
            // mapBut.text("Map");
            // mapBut.addClass("data-long");
            // mapBut.addClass("data-lat");
            // mapBut.attr("data-Long", eventData.venue.longitude);
            // mapBut.attr("data-lat", eventData.venue.latitude);

            // var ticketBut = $("<button>");
            // $(ticketBut).text("Tickets");
            // $(ticketBut).attr("role", "button");
            // $(ticketBut).attr("a href", ticketURL);
            // ticketBut.addClass("ticketLink");
            // ticketBut.onclick("location.href", "eventData.offers[0].url" );


            $('table').find('tbody').append(
                `<tr>
                    <td class="dateCol">${newDate}</td>
                    <td class="venueCol">${eventVenue}</td>
                    <td class="locCol">${eventCity},${eventReg}</td>
                    <td class="urlCol"><button class='ticketBut btn btn-dark'><a style="color: white;" href=${ticketURL}>Buy</a></button></td>
                    <td class="mapIt"><button class='mapBut btn btn-dark' data-long=${eventData.venue.longitude} data-lat= ${eventData.venue.latitude}>Map</button>                
                </tr>`
            )


        })
    })
}

$(document).ajaxError(function (e, jqXHR, settings, err) {
    $("#event-amount").text("Artist Not Found");

    console.log("In global error callback.");

});




// Event handler for user clicking the select-artist button
$(document).on("click", "#search-button", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();

    // Storing the artist name
    var inputArtist = $("#search-box").val().trim();

    console.log(inputArtist);
    // $('#search-box').val('');
    $("#artist-div").empty();
    $("td").empty();

    $('html,body').animate({
        scrollTop: $("#event-amount").offset().top
    }, 2000 );



    // Running the searchBandsInTown function (passing in the artist as an argument)
    searchBandsInTown(inputArtist);
    showArtistEvents(inputArtist);


});


function initMap(lat, lng) {
    // console.log(lat, lng);
    lat = 33.759247
    lng = -84.387722
    var uluru = { lat, lng };
    map = new google.maps.Map(document.getElementById('map-div'), {
        zoom: 16,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

}

function mapSetCenter() {
    if (map !== undefined && typeof map === "object") {
        map.setCenter(geolocation);

    } else {
        mapSetCenter();
    }
}

$("body").on("click", ".mapBut", function (e) {
    //google.maps.event.trigger(MapInstance,'resize');
    var latit = parseFloat($(this).attr("data-long"));
    var long = parseFloat($(this).attr("data-lat"));
    geolocation = {
        lat: latit,
        lng: long
    };
    console.log(geolocation);
    mapSetCenter();
    //initMap(latit, longit);
})



//End document ready function
// });

