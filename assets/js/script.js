// Wait for DOM to load before GIF loading starts
$(document).ready(function () {

    // Start with initial array of GIFs
    let subject = ["Pokemon", "Mario", "Animaniacs", "Looney Tunes", "Simpsons", "Rick and Morty", "Thundercats", "Transformers"];

    // Have a function to dump JSON content of each button into div
    function displayGIF() {

        let $q = $(this).attr("data-name");
        let $apiKey = "wBIzukv6ZqgmL9LunKnFtolO0DZxGKzm";
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${$q}&limit=10&api_key=${$apiKey}`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // Clear the div before loading a new search
            $("#gif-viewer").empty();

            for (var j = 0; j < subject.length; j++) {

                let gifData = response.data[j];
                
                //Grab URL of still and animated
                let gifStill = gifData.images.fixed_height_still.url;
                let gifPlay = gifData.images.fixed_height.url;

                // Add img tag with attribute of source and var to find it
                let gifImg = $("<img>").attr("src", gifStill);
                // gifImg = $("<img>").attr("data-state");

                let gifRating = gifData.rating;
                gifRating = $('<p>').text("Rating: " + gifRating);
                
                // Append image and rating to the div with id of gif-viewer
                $("#gif-viewer").append(gifImg, gifRating);
                
                $(gifImg).hover(function () {
                    // console.log("click");
                    if (true) {
                        $(this).attr("src", gifPlay);
                    }
                    else {
                        $(this).attr("src", gifStill)
                    };
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
        for (var i = 0; i < subject.length; i++) {

            // Then dynamically generate buttons for each GIF (jQuery automatically creates beginning and end tags)
            let a = $("<button>");
            // Adds class
            a.addClass("gif").addClass("btn btn-outline-info");
            // Adds a data-attribute
            a.attr("data-name", subject[i]).attr("type", "button");
            // Inputs text of subject
            a.text(subject[i]);
            // Appends button to the button div
            $("#gif-buttons").append(a);
            $("#gif-input").empty();
        }
    }

    // Click event function to handle GIF addition to array
    $("#add-gif").on("click", function (event) {

        event.preventDefault();

        var gif = $("#gif-input").val().trim();

        subject.push(gif);

        renderBtn();
    });

    // Add click event listener to all element with gif class
    $(document).on("click", ".gif", displayGIF);

    // Calls funcation to display initial buttons
    renderBtn();
})