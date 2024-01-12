//Fetch TMDB API
//Display basic info
//Display advanced info on button press

//Fetch Ebay API
//Selectors help refine search data
//Display merch from results for movie input

//Recieve Input Data from search bar

//Saves movies locally

//Displays locally saved movies
var moviePoster = $("#movie-poster");
const API_KEY = "70f6eb9853632fc7fc6755fa5349de0a";
var searchBar = $("#search-bar");
var searchButton = $("#button-search");
var synopsisInfo = $("#synopsis");
var movieTitleHeader = $("#movieTitle");
var savedMoviesContainer = $('#saved-movies-container');

//Creates a variable that immediately pulls any data saved under the 'savedMovies' key, OR creates an empty array if such a key does not exist.
var savedMovieData = JSON.parse(localStorage.getItem('savedMovies')) || [];

searchButton.on("click", function () {
    saveMovie();
});

//Function that displays locally stored movies as their own buttons that contain listeners to the handleMovieData function
function displaySavedMovies(){
    savedMoviesContainer.innerHTML = '';
    for (let i = 0; i < savedMovieData.length; i++){
        var savedMovieButton = document.createElement('button');
        savedMovieButton.addEventListener('click', function(){
            handleMovieData(savedMovieData[i]);
        });
        savedMovieButton.textContent=savedMovieData[i];
        savedMovieButton.setAttribute('class', 'button secondary expanded');
        savedMoviesContainer.append(savedMovieButton);
        console.log(savedMovieData[i]);
    }
}


// function that saves movies locally
function saveMovie() {
    var movieTitleInput = searchBar.val().toLowerCase();
    console.log(movieTitleInput);
    savedMovieData.push(movieTitleInput); //Adds the current movieTitleInput to the savedMovieData Array
    localStorage.setItem('savedMovies', JSON.stringify(savedMovieData)); //Sets the new updated Data to the savedMovies key.
    console.log(localStorage.getItem('savedMovies'));
    displaySavedMovies();
    handleMovieData(movieTitleInput); //Initiate the handleMovieData function to interact w/ the 
    searchBar.val("");
}

function handleMovieData(movieTitleInput) { //Is called via the saveMovie function so that they could share a parameter
    fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
            movieTitleInput +
            "&api_key=" +
            API_KEY
    )
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            postMovieData(data);
        })
        .catch((error) => {
            console.log("error");
        });

    return;
}

function postMovieData(data) {
    //Need release date and vote average still
    console.log(data);
    var movieTitle = data.results[0].title;
    console.log(data.results[0].title);
    movieTitleHeader.text(movieTitle);
    var posterImage = data.results[0].poster_path;
    moviePoster.attr(
        "src",
        "https://image.tmdb.org/t/p/original/" + data.results[0].poster_path
    );
    var synopsisData = data.results[0].overview;
    synopsisInfo.text(synopsisData);
}

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

displaySavedMovies();