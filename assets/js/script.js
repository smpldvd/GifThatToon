// Wait for DOM to load before GIF loading starts
$(document).ready(function () {

    // Start with initial array of GIFs
    let topics = ["Pokemon", "Mario", "Animaniacs", "Looney Tunes", "Simpsons", "Rick and Morty", "Thundercats", "Transformers"];

    // Have a function to dump JSON content of each button into div
    function displayGIF() {

        let $q = $(this).attr("data-name");
        let $apiKey = "wBIzukv6ZqgmL9LunKnFtolO0DZxGKzm";
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${$q}&limit=12&api_key=${$apiKey}`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);

            // Clear the div before loading a new search
            $("#gif-viewer").empty();

            for (var j = 0; j < 12; j++) {

                let gifData = response.data[j];
                
                //Grab URL of still and animated
                let gifStill = gifData.images.fixed_height_still.url;
                let gifPlay = gifData.images.fixed_height.url;
                
                // Add img tag with attribute of source and var to find it
                let gifImg = $("<img>").attr("src", gifStill);
                
                let gifRating = gifData.rating;
                gifRating = $('<p>').text("Rating: " + gifRating);
                
                let imgDiv = $(`<div class="gifCard card">`);
                imgDiv.append(gifImg, gifRating);
                
                // Append image and rating to the div with id of gif-viewer
                $("#gif-viewer").append(imgDiv);
                
                // While pointer is on gif, will play
                $(gifImg).mouseover(function () {
                    $(this).attr("src", gifPlay);    
                });
                // After mouse moves off gif, back to still image
                $(gifImg).mouseout(function () {
                    $(this).attr("src", gifStill);    
                });

                renderBtn();
            };
        });
    }

    // As in lesson, function to display gif data
    function renderBtn() {

        // Clears the field prior to adding new input (important to avoid repeated buttons)
        $("#gif-buttons").empty();

        // Loop through array
        for (var i = 0; i < topics.length; i++) {

            // Then dynamically generate buttons for each GIF (jQuery automatically creates beginning and end tags)
            let a = $("<button>");
            // Adds class
            a.addClass("gif").addClass("btn btn-outline-info");
            // Adds a data-attribute
            a.attr("data-name", topics[i]).attr("type", "button");
            // Inputs text of topics
            a.text(topics[i]);
            // Appends button to the button div
            $("#gif-buttons").append(a);
        }
    }
    
    // Click event function to handle GIF addition to array
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        topics.push(gif);
        $("#gif-input").val("");
        renderBtn();
    });
    
    // Event function to use Enter key to add button
    $('#gif-input').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            event.preventDefault();
            var gif = $("#gif-input").val().trim();
            topics.push(gif);
            $("#gif-input").val("");
            renderBtn();
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached at document level will also be triggered
        event.stopPropagation();
    });

    // Add click event listener to all element with gif class
    $(document).on("click", ".gif", displayGIF);

    // Calls funcation to display initial buttons
    renderBtn();
})