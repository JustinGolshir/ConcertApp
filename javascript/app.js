


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
        var artistName = $("<h1>").text(response.name);
        var artistURL = $("<a>").attr("href", response.url).append(artistName);
        var artistImage = $("<img>").attr("src", response.thumb_url);
        var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
        var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
        var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

        // Empty the contents of the artist-div, append the new artist content
        $("#artist-div").empty();
        $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
    });
}

// Event handler for user clicking the select-artist button
$("#select-artist").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#artist-input").val().trim();

    // Running the searchBandsInTown function (passing in the artist as an argument)
    searchBandsInTown(inputArtist);
    showArtistEvents(inputArtist);
});


function showArtistEvents(artist) {
    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?limit=5&app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        response.forEach(function (eventData) {

            var eventDate = $("<p>").text("Event Date: " + eventData.datetime);
            var eventVenue = $("<p>").text("Venue Name: " + eventData.venue.name);
            var eventCity = $("<p>").text("City: " + eventData.venue.city);
            var eventReg = $("<p>").text("Region: " + eventData.venue.region);
            var eventLongit = $("<p>").text("Longitude: " + eventData.venue.longitude);
            var eventLat = $("<p>").text("latitude: " + eventData.venue.latitude);
            var ticketURL = $("<p>").text("Link to tickets: " + eventData.offers[0].url);

            var mapBut = $("<button class='mapBut'>");
            mapBut.text("Click to show on Map!");
            mapBut.addClass("data-long");
            mapBut.addClass("data-lat");
            mapBut.attr("data-Long", eventData.venue.longitude );
            mapBut.attr("data-lat", eventData.venue.latitude);

            

            $("#event-div").append(eventDate, eventVenue, eventCity, eventReg, eventLongit, eventLat, ticketURL, mapBut)


        });

    });
}



function initMap(lat, lng) {
    console.log( lat, lng );
    lat = lat || 33.759247
    lng = lng || -84.387722
    var uluru = { lat, lng };
    var map = new google.maps.Map(document.getElementById('map-div'), {
        zoom: 16,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

}

$("body").on("click", ".mapBut", function (e) {
    var latit = parseFloat( $(this).attr("data-long") );
    var longit = parseFloat( $(this).attr("data-lat") );

    initMap(latit, longit);
})
