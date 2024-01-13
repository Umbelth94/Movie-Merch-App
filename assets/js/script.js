//TODO:
    //Clear movies when one is selected
    //Save the favorited movies ONLY once one is selected
    //When the favorited movies are picked from menu, only populate card and merch info for that movie (maybe by saving the movie id somewhere)



//Fetch Ebay API
//Selectors help refine search data
//Display merch from results for movie input



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
    var movieTitleInput = searchBar.val().toLowerCase();
    console.log(movieTitleInput);
    searchBar.val("");
    if (movieTitleInput != ''){
    handleMovieData(movieTitleInput);
    } else {
        alert('Must type in a movie');
    }
});

//Function that displays locally stored movies as their own buttons that contain listeners to the handleMovieData function
function displaySavedMovies() {
    savedMoviesContainer.empty();

    $.each(savedMovieData, function (index, value) {
        //Create a button for each value in the savedMovieData Array
        var savedMovieButton = $('<button>', {
            text: value,
            class: 'button secondary expanded'
        });
        //Give each of those buttons an event listener with the handleMovieData function
        savedMovieButton.on('click', function () {
            handleMovieData(value);
        });
        //Append the buttons to the container
        savedMoviesContainer.append(savedMovieButton);
        console.log(value);
    });
}


// function that saves movies locally
function saveMovie(movieTitleInput) {
    // var movieTitleInput = searchBar.val().toLowerCase();
    console.log(movieTitleInput);
    savedMovieData.push(movieTitleInput); //Adds the current movieTitleInput to the savedMovieData Array
    localStorage.setItem('savedMovies', JSON.stringify(savedMovieData)); //Sets the new updated Data to the savedMovies key.
    console.log(localStorage.getItem('savedMovies'));
    displaySavedMovies();
    searchBar.val("");
}

function handleMovieData(movieTitleInput) {
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
            console.log(data);
            console.log('data results length' + data.results.length);
            if (data.results.length === 0) {
                alert('That ain\'t a movie, bub');
                return;
            } else {
                // displayMovieData(data);
                displayMultipleMovies(data);
                // Save the movie only if it's not already in the list
                if (!savedMovieData.includes(movieTitleInput)) {
                    saveMovie(movieTitleInput);
                    displaySavedMovies();
                }
            }
        })
        .catch((error) => {
            console.log("error");
        });
}


function displayMovieData(movieData){
    var movieTitle = movieData.title;
    var releaseDate = movieData.releaseDate;
    var movieSynopsis = movieData.synopsis;
    var posterImage = movieData.posterImage;
    movieTitleHeader.text(movieTitle + releaseDate);
    moviePoster.attr(
        "src",
        "https://image.tmdb.org/t/p/original/" + posterImage
    );
    synopsisInfo.text(movieSynopsis);
}


function displayMultipleMovies(data) {
    console.log(data.results.length);

    for (let i = 0; i < data.results.length; i++) {
        console.log('loop ' + i);
        console.log(data.results[i].title);
        var movieTitle = data.results[i].title;
        var releaseDate = data.results[i].release_date;
        console.log(movieTitle);
        var movieSynopsis = data.results[i].overview;
        console.log(movieSynopsis);
        var posterImage = data.results[i].poster_path;
        console.log(posterImage);
        var movieId = data.results[i].id;
        console.log(movieId);

        var card = $('<div class="card"></div>');
        var posterimg = $('<img>');
        posterimg.attr({
            src: "https://image.tmdb.org/t/p/original/" + posterImage,
            style: "width: 200px",
            class: 'small-card-image',
        });
        card.addClass('small-card');
        card.append('<h2>' + movieTitle + '</h2>');
        card.append('<h3>' + releaseDate + '</h3>');
        card.append(posterimg);
        card.append('<p>' + movieSynopsis + '</p>');

        // Use a closure to capture the current movie details
        (function (title, date, synopsis, image, id) {
            card.on('click', function () {
                console.log('clicked');
                // Pass the specific movie data to displayMovieData
                displayMovieData({
                    title: title,
                    releaseDate: date,
                    synopsis: synopsis,
                    posterImage: image,
                    movieId: id
                });
            $('#movie-card-container').empty();
            });
        })(movieTitle, releaseDate, movieSynopsis, posterImage, movieId); //Immediately Invoked Function Expression (IIFE) to have the data stored for each event listener

        $('#movie-card-container').append(card);
    }
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