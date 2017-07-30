var animals = [];
btnCreate(animals);

function btnCreate(array) {
    $("#button-holder").empty();
    for (var i = 0; i < array.length; i++) {
        $("#button-holder").append('<button class="animalBtn btn btn-primary">' + array[i] + '</button>');
    }

}

$(document).on("click", ".animalBtn", animalBtnClicked);
$(document).on("click", "img", gifClicked);

$("#entry").submit(function (event) {
    var $tempEntry = $(this).children().eq(2);
    animals.push($tempEntry.val());
    btnCreate(animals);
    $tempEntry.val("");
    event.preventDefault();
});

var queryURL;
var key = "fcfcb5d597d24a258d68c0871be63e9b";

function animalBtnClicked() {

    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&api_key=" + key + "&limit=10&rating=g&rating=pg";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        getGifs(response);
    });
}

var gifSpace = $("#gif-holder");


function getGifs(obj) {
    var $tempDiv;
    gifSpace.empty();
    for (var i = 0; i < obj.data.length; i++) {
        $tempDiv = $('<div class="gif"></div>');
        gifSpace.append($tempDiv);
    
        $tempImg = $('<img src="' + obj.data[i].images.fixed_height_still.url + '">');
        $tempDiv.append($tempImg);
        $tempDiv.append('<p class="rating">Rating: ' + obj.data[i].rating + "</p>");
        $tempImg.attr("data-state", "still");
        $tempImg.attr("data-animateURL", obj.data[i].images.fixed_height.url);
        $tempImg.attr("data-stillURL", obj.data[i].images.fixed_height_still.url);
    }
}


var lastGif;


function gifClicked() {
    var gif = $(this);
    if (gif.attr("data-state") === "still") {
        gif.attr("src", gif.attr("data-animateURL"));
        gif.attr("data-state", "animated");
    }
    else {
        gif.attr("src", gif.attr("data-stillURL"));
        gif.attr("data-state", "still");
    }
    if (lastGif) {
        if (lastGif.attr("data-stillURL") != gif.attr("data-stillURL")) {
            lastGif.attr("src", lastGif.attr("data-stillURL"));
            lastGif.attr("data-state", "still");
        }
    }
    lastGif = gif;
}