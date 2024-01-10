//Fetch TMDB API
//Display basic info
//Display advanced info on button press

//Fetch Ebay API
//Selectors help refine search data
//Display merch from results for movie input

//Recieve Input Data from search bar

//Saves movies locally

//Displays locally saved movies
const API_KEY = "70f6eb9853632fc7fc6755fa5349de0a";
var searchBar = $("#search-bar");
var searchButton = $("#button-search");
searchButton.on("click", function () {
    inputGetter();
}); //todo: build click function

function inputGetter() {
    var movieTitleInput = searchBar.val();
    console.log(movieTitleInput);
    searchBar.val("");
    fetch("https://api.themoviedb.org/3/search/movie?query=" + movieTitleInput + "&api_key=" + API_KEY)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            var movieTitle = data.results[0].title;
            console.log(data.results[0].title)
            $("#movieTitle").text(movieTitle)
        })
        .catch((error) => {
            console.log("error");
        });

    return;
    // when input is in field
    // movie title is extracted
    // then movie title is added to search query url
    // then a fetch request is made to retrieve the movie poster and information about the movie
    // then that information is appended to the screen
    //
}



// https://api.themoviedb.org/3/search/movie?query=Jack+Reacher

