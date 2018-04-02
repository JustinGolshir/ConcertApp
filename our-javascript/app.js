
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
        console.log(response);

        // Constructing HTML containing the artist information
        var artistName = $("<h3>").text(response.name);
        var artistURL = $("<a>").attr("href", response.url).append(artistName);
        var artistImage = $("<img>").attr("src", response.thumb_url);
        var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
        var upcomingEvents = $("<h3>").text(response.upcoming_event_count + " Upcoming Events");
        var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

        // Empty the contents of the artist-div, append the new artist content
        $("#event-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
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
          

        console.log(response)

        response.forEach(function (eventData) {

            
            var newDate = moment(eventData.datetime).format('lll');
            console.log(newDate)
            var ticketURL = eventData.offers[0].url;


               //Append event data to table
        
           
                
               

                

                var eventDate = $("<p>").text(eventData.datetime);
            var eventVenue = $("<p>").text(eventData.venue.name);
            var eventCity = $("<p>").text(eventData.venue.city + ",");
            var eventReg = $("<p>").text(eventData.venue.region);
            var eventLongit = $("<p>").text("Longitude: " + eventData.venue.longitude);
            var eventLat = $("<p>").text("latitude: " + eventData.venue.latitude);
            var ticketURL = $("<p>").text(eventData.offers[0].url);

            var mapBut = $("<button class='mapBut'>");
            mapBut.text("Map");
            mapBut.addClass("data-long");
            mapBut.addClass("data-lat");
            mapBut.attr("data-Long", eventData.venue.longitude );
            mapBut.attr("data-lat", eventData.venue.latitude);




            // var ticketBut = $("<button>");
            // $(ticketBut).text("Tickets");
            // $(ticketBut).attr("role", "button");
            // $(ticketBut).attr("a href", ticketURL);
            // ticketBut.addClass("ticketLink");
            // ticketBut.onclick("location.href", "eventData.offers[0].url" );

            // $("#artist-div").append(newDate, eventVenue, eventCity, eventReg, ticketBut)

            // $('table').find('tbody').append([
            //     '<tr>',
            //         '<td>'+newDate+'</td>',
            //         '<td>'+eventVenue+'</td>',
            //         '<td>'+eventCity+" "+eventReg+'</td>',
            //         '<td>'+ticketURL+'</td>',
            //         '<td>'+mapBut+'</td>',
            //     '</tr>'
                
            //     ]);

                console.log(newDate,eventVenue,eventCity,eventReg,ticketURL,mapBut)

            $('table').find('tbody').append([
                '<tr>',
                        '<td class= "dateCol">'+newDate+'</td>',
                        '<td class = "venueCol">'+$(".venueCol").append(eventVenue)+'</td>',
                        '<td class = "cityCol">'+$(".cityCol").append(eventCity)+ ", "+$(".cityCol").append(eventReg)+'</td>',
                        '<td class = "urlCol">'+$(".urlCol").append(ticketURL)+'</td>',
                        '<td class = "butCol">'+$(".butCol").append(mapBut)+'</td>',
                '</tr>'
            ]);

            
        })
    })
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




// Event handler for user clicking the select-artist button
$(document).on("click", "#search-button", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
   

    // Storing the artist name
    var inputArtist = $("#search-box").val().trim();


    
    // $('html,body').animate({
    //     scrollTop: $("#artist-table").offset().top
    // }, 2000 );

    // $( document.body ).animate({
    //     scrollTop: 500
    //   });


    

    console.log(inputArtist);
    // $('#search-box').val('');
    $("#artist-div").empty();
    $("td").empty();
   

   
    // Running the searchBandsInTown function (passing in the artist as an argument)
    searchBandsInTown(inputArtist);
    showArtistEvents(inputArtist); 
   
    
});


$("body").on("click", ".mapBut", function (e) {
    var latit = parseFloat( $(this).attr("data-long") );
    var longit = parseFloat( $(this).attr("data-lat") );

    initMap(latit, longit);
})





//End document ready function
// });

