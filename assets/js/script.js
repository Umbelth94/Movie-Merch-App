var movieCard = $('#movie-card')
var moviePoster = $("#movie-poster");
const API_KEY = "70f6eb9853632fc7fc6755fa5349de0a";
var searchBar = $("#search-bar");
var searchButton = $("#button-search");
var synopsisInfo = $("#synopsis");
var movieTitleHeader = $("#movieTitle");
var savedMoviesContainer = $('#saved-movies-container');
var iframe = $("#iframe");
var movieWarningMessage = $("#movie-warning");

//Creates a variable that immediately pulls any data saved under the 'savedMovies' key, OR creates an empty array if such a key does not exist.
var savedMovieData = JSON.parse(localStorage.getItem('savedMovies')) || [];

searchButton.on("click", function () {
    var movieTitleInput = searchBar.val().toLowerCase();
    console.log(movieTitleInput);
    searchBar.val("");
    if (movieTitleInput != ''){ //Clear movie title input
        $('#movie-card-container').empty();
        movieCard.addClass('hide');
        iframe.addClass('hide');
        handleMovieData(movieTitleInput);
        movieWarningMessage.text('');
        
    } else {
        //Make a modal for this
        alert('Must type in a movie');
    }
});

//Function that displays locally stored movies as their own buttons that contain listeners to the handleMovieData function
function displaySavedMovies() {
    savedMoviesContainer.empty();

    savedMovieData.forEach(function(movie) {
        var movieTitle = Object.keys(movie)[0];
        var button = $('<button>');
        button.addClass('button expanded secondary')
        button.text(movieTitle);
        button.click(function(){
            $('#movie-card-container').empty();
            console.log(Object.values(movie));
            handleIdData(Object.values(movie))
        })
        savedMoviesContainer.append(button);
    })
    };

// function that saves movies locally
function saveMovie(title,id){
    console.log(containsKey(savedMovieData, title));
    if (containsKey(savedMovieData, title)){ //Check if the title you're saving already exists in the savedMovieData array
        return
    } else {
    var movieTitle = title;
    console.log('saving movie ' + movieTitle);
    savedMovieData.push({[movieTitle]:id}); //Adds the current movieTitleInput to the savedMovieData Array
    localStorage.setItem('savedMovies', JSON.stringify(savedMovieData)); //Sets the new updated Data to the savedMovies key.
    console.log(localStorage.getItem('savedMovies'));
    displaySavedMovies();
    searchBar.val("");
    }
}

//Checks to see if a key exists 
function containsKey(arr, targetKey) {
    console.log(arr);
    console.log(targetKey);
    for (const pair of arr) {
        if (pair[targetKey] !== undefined) {
            return true; // Key found
        }
    }
    return false; // Key not found
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjgzYmYxODA0MjlhNDVmYTVhNDBhNmE3NzUwNmMwOSIsInN1YiI6IjY1OWNhMjY3ZjI5ZDY2MDBlZjdhZDdmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OZpf5ufNydsGsuvkRPb5HnpeiQRd0zmcI_YPcPyadWc'
    }
  };
  
//TMD API Fetch Request for ID from saved buttons
function handleIdData(movieId) {
    fetch('https://api.themoviedb.org/3/movie/' + movieId 
    +'?language=en-US', options)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            // Check to see if the request returned any movies
                ///////GET THIS TO WORK WITH THE MOVIE DATA
                    //Maybe make a whole new function??
                displayIdData(data)
                // Save the movie only if it's not already in the list
            })}

//Made this for when a saved movie is called because the data is called slightly differently
function displayIdData(data){
    movieCard.removeClass('hide');
    var movieTitle = data.original_title;
    var releaseDate = data.release_date;
    var movieSynopsis = data.overview;
    var posterImage = data.poster_path;
    var movieId = data.id;
    movieTitleHeader.text(movieTitle + releaseDate);
    moviePoster.attr(
        "src",
        "https://image.tmdb.org/t/p/original/" + posterImage
    );
    synopsisInfo.text(movieSynopsis);
    handleYoutube(movieId);
}

//TMBD API Fetch Request For Search
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
            //Check to see if the request returned any movies
            if (data.results.length === 0) {
                alert('That ain\'t a movie, bub');
                return;
            } else {
                displayMultipleMovies(data);
                // Save the movie only if it's not already in the list
                if (!savedMovieData.includes(movieTitleInput)) {
                    // saveMovie(movieTitleInput);
                    displaySavedMovies();
                }
            }
        })
        .catch((error) => {
            console.log("error");
        });
}

//Make this fetch by ID???
function displayMovieData(movieData){
    console.log('movie data ' + movieData);
    movieCard.removeClass('hide');
    console.log('movie data');
    var movieTitle = movieData.title;
    var releaseDate = movieData.releaseDate;
    var movieSynopsis = movieData.synopsis;
    var posterImage = movieData.posterImage;
    console.log(movieData.movieId)
    movieTitleHeader.text(movieTitle + releaseDate);
    moviePoster.attr(
        "src",
        "https://image.tmdb.org/t/p/original/" + posterImage
    );
    synopsisInfo.text(movieSynopsis);
    handleYoutube(movieData.movieId);
}


function displayMultipleMovies(data) {
    console.log(data.results.length);
    //Loop through the first 20 results of the movie data and create cards for each one
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
                saveMovie(title, id);
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

//Header for the kinocheck API
var requestKinoOptions = {
    method: 'GET',
    redirect: 'follow'
};
//Kinocheck API Fetch request
function handleYoutube(movieId){
    iframe.attr('src',"")
    movieWarningMessage.text('');
    fetch("https://api.kinocheck.de/movies?tmdb_id=" + movieId, requestKinoOptions)
    .then(response => {
        if (response.status === 200){ //Checks if the response is good (Usually if the id exists in the KinoOptions database)
            console.log(response);
            return response.json();
        } else {
            movieWarningMessage.text('Sorry, that movie does not exist in the API database');
        console.log('no movie id exists on kinoOptions');
        return; 
        }
    })
    .then(result => {
        console.log(result);
        if (result.trailer === null){ //If the kinoCheck api does not contain a trailer
            console.log('no movie trailer');
            movieWarningMessage.text('Oopsies, that trailer does not exist in the database');
            iframe.addClass('hide');
            return;
        }
        iframe.removeClass('hide');
        console.log(result.trailer.youtube_video_id);
        youtube_id = result.trailer.youtube_video_id;
        iframe.attr('src',"https://www.youtube.com/embed/" + youtube_id)
    })
    .catch(error => console.log('error', error));
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



