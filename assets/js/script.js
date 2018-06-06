// Wait for DOM to load before GIF loading starts
$(document).ready(function () {

    // Start with initial array of GIFs
    let subject = [];

    // Have a function to dump JSON content of each button into div
    function displayGIF() {
        let $q = $(this).attr("data-name");
        let $apiKey = "wBIzukv6ZqgmL9LunKnFtolO0DZxGKzm";
        let queryURL = `https://api.giphy.com/v1/gifs/trending?q=${$q}&api_key=${$apiKey}`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
        })
    }

    // As in lesson, function to display gif data
    function renderBtn() {

        // Clears the field prior to adding new input (important to avoid repeated buttons)
        $("#gifBtn").empty();

        // Loop through array
        for (var i = 0; i < subject.length; i++) {

            // Then dynamically generate buttons for each GIF (jQuery automatically creates beginning and end tags)
            let a = $("<button>");
            // Adds class
            a.addClass("gif");
            // Adds a data-attribute
            a.attr("data-name", subject[i]);
            // Inputs text of subject
            a.text(subject[i]);
            // Appends button to the button div
            $("#gifBtn").append(a);
        }
    }

    // Click event function to handle GIF addition to array
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var gif = $("gif-input").val().trim();
        subject.push(gif);
        renderButtons();
    });

    // Add click event listener to all element with gif class
    $(document).on("click", ".movie", displayGIF);

    // Calls funcation to display initial buttons
    renderButtons();
})