/* 
Create buttons dynamically with input from input box.
    blank array
    on button click, push value into array
    for loop, runs through array and generates button automatically 
(1) Successfully add buttons to '#animalButtons' div
---------------------------------------
Giphy API
    clicking the generated buttons, inputs button value into giphy API search
    return 10 results
    another for loop to display response
    show rating as in previous class example
(2a) click buttons generated in (1) and get back console log of objects
(2b) make sure parameter returns 10 and rating displays 
---------------------------------------
Pausing and unpausing gifs
(3a)On click of Gifs, they will cycle through still and animated states
---------------------------------------
If a new button is clicked, the existing gifs disappear
(4a) clear data in div somehow prior to displaying new results
*/

// -----------------------------------CODE-------------------------------

// Event listener: on page ready. Let's use JQuery to make page look nice
$('document').ready(function(){
    $('button').addclass("btn btn-danger");
    $('#animals').css('float', 'left');
    $('#animal-form').css('float', 'right');
});

// (1)----------------Create buttons dynamically with input from input box--------------------
// Animal array
var animals = [];

// Event listener: on click of input button
animals = $('#add-animal').onclick().push()
console.log(animals)

// (2)----------------------------------Giphy API---------(ala button triggered Ajax------------------------
$("body").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var animal = $(this).attr("data-animal");

      // Constructing a URL to search Giphy for the chosen animal
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var animalImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              animalImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and animalImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(animalImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
    });






// (3)--------------------------Pausing and unpausing gifs-----------------------------





// (4)-----------------clear gifs... most likely part of above code------------------