$(document).ready(function () {




    //enter animal into text box and upon submit add a new button to the array of buttons in the gif-button-space
    var animalButArray = [];



    $("#submit-btn").on("click", function (event) {
        event.preventDefault();

        var animalBut = $("<button>");
        var animalName = $("#inputAnimal").val().trim();
        animalBut.addClass("data-anName");
        animalBut.addClass("btn btn-primary gif-but");
        animalBut.attr("data-anName", animalName)
        animalBut.text(animalName);
        $(".gif-buttons-space").append(animalBut);
        console.log(animalName);
        $("#inputAnimal").val("");

    })





    //on click of animal button generate gif response from giphy AJAX request

    $("body").on("click", ".gif-but ", displayGifContent)



    function displayGifContent() {
        console.log(this);
        var thisAnimal = $(this).attr("data-anName");

        var apiKey = "n9k0CCE8Ac6bgJsy7bogN8CPNgbJ2wpW";

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisAnimal + "&api_key=" + apiKey + "&limit=25";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //create thumbnails for gifs and ratings


            response.data.forEach(function (gifData) {
                console.log(gifData);



                //capture desired gifData
                var rating = gifData.rating;
                var gifURL = gifData.images.fixed_width.url;

                //store in 
                var gifThumbNails = $("<div class= 'thumbnail gifNail'>")
                var gifImage = $("<img>").attr("src", gifURL)
                var captionDiv = $("<div class='caption'>").html("<p>Rating:" + rating + "</p></div>")


                // append
                $(".gifsHere").prepend(gifThumbNails);
                gifThumbNails.append(gifImage);
                gifThumbNails.append(captionDiv);


            });



        })

    }

});