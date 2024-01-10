var searchBar = $("#search-bar")
var searchButton = $("#button-search")
searchButton.on("click", function() {}) //todo: build click function

function inputGetter() {
    // 
    // when input is in field
    // movie title is extracted
    // then movie title is added to search query url
    // 
}

const API_KEY = "70f6eb9853632fc7fc6755fa5349de0a";

fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY
)
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log("error");

    });

    /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }