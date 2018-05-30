$(document).ready(function () {
    console.log("ready!");
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

    // Event handler for user clicking the select-artist button
    $(document).on("click", "#search-button", function (event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();

        // Storing the artist name
        var inputArtist = $("#search-box").val().trim();

        console.log(inputArtist);
        // $('#search-box').val('');
        $("#event-amount").empty();
        // $("td").empty();
        $('tbody').empty();

        $('html,body').animate({
            scrollTop: $("#event-amount").offset().top
        }, 2000);



        // Running the searchBandsInTown function (passing in the artist as an argument)
        searchBandsInTown(inputArtist);
        showArtistEvents(inputArtist);


    });
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
            $("#event-amount").append(upcomingEvents, artistName);
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

            //console.log(response)

            // response.forEach(function (eventData) {
            var limit = response.length > 8 ? 8 : response.length;
            for (var i = 0; i < limit; i++) {

                var eventData = response[i];
                var newDate = moment(eventDate).format('lll');
                var ticketURL = eventData.offers[0].url;

                //console.log(eventData);
                //Append event data to table
                //console.log(eventData.datetime);

                var eventDate = eventData.datetime
                var eventVenue = eventData.venue.name
                var eventCity = eventData.venue.city
                var eventReg = eventData.venue.region;
                var eventLat = eventData.venue.latitude;
                var eventLng = eventData.venue.longitude;
                var ticketURL = eventData.offers[0].url;
                // console.log(eventData.offers[0].url);
                // console.log(eventLat)
                // console.log(eventLng)
                var mapUrl = "https://www.google.com/maps/search/?api=1&query=" + eventLat + "," + eventLng;

                $('table').find('tbody').append(
                    `<tr>
                    <td class="dateCol">${newDate}</td>
                    <td class="venueCol">${eventVenue}</td>
                    <td class="locCol">${eventCity},${eventReg}</td>
                    <td class="urlCol"><a href="${ticketURL}" target="_blank"><button class='ticketBut btn-dark btn-sm'>Buy</button></a></td>
                    <td class ="mapButCol"><button class="mapBut btn-sm btn-dark" data-lat="${eventLat}" data-long="${eventLng}">Map It!</button>
                </tr>`

                )
                // <td class="mapItCol"><a class='mapBut' target="_blank" href=${mapUrl}><img class="mapThumb" src="../mapsImage.png" alt="mapImgThumb"></a>

                // console.log(mapUrl);
                console.log("ticketURL:" + ticketURL)
            }
        })
    }

    $(document).ajaxError(function (e, jqXHR, settings, err) {
        $("#event-amount").text("Artist Not Found");

        console.log("In global error callback.");

    });

    $("body").on("click", ".mapBut", function (e) {
        //google.maps.event.trigger(MapInstance,'resize');
        var latit = parseFloat($(this).attr("data-lat"));
        var long = parseFloat($(this).attr("data-long"));


        console.log("lat (%d) and long (%d)", latit, long)
        initMap(latit, long);
        console.log("LAT LONG SHOULD CHANGE")
    });





    // End document ready function
});

function initMap(lati, long) {
    console.log("=====================INIT MAP FUNCTION====================")
    let lat = lati || 33.759247;
    let lng = long || -84.387722;
    var pos = { lat, lng };
    console.log(pos)
    map = new google.maps.Map(document.getElementById('map-div'), {
        zoom: 16,
        center: pos
    });
    var marker = new google.maps.Marker({
        position: pos,
        map: map
    });

}



//End document ready function
// });

