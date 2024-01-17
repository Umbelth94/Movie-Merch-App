//TODO:
    //Clear movies when one is selected
    //Save the favorited movies ONLY once one is selected
    //When the favorited movies are picked from menu, only populate card and merch info for that movie (maybe by saving the movie id somewhere)



//Fetch Ebay API
//Selectors help refine search data
//Display merch from results for movie input

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer v^1.1#i^1#f^0#p^1#r^0#I^3#t^H4sIAAAAAAAAAOVYbWgURxjOJZe0qU1tqTRioz22UknT25u93b2P1btyMabGJpfonVFDJe7HbLLJfpw7s0kuPzSmIFKL2BYsqEhsEYTSFgWxQlOFtkipmIL+EPujfrS0tKSg0EYwpZ27i/GSikZz0EDvz7Ez7/vO8z7zfswMGCgrf3nn6p1jFa7HiocGwECxy8XMA+VlpTVPlRQvKi0CeQKuoYGlA+7Bkl9WINHQU8I6iFKWiaCnz9BNJGQHI5Rjm4IlIg0JpmhAJGBZSMSaGgU/DYSUbWFLtnTK01AXoWQoyyqvhAKiEpAgw5FR847NpBWhJBlKQBRVjueCEheWyDxCDmwwERZNHKH8wM95AeNl2CQTFPigwAAasOE2ytMKbaRZJhGhARXNwhWyunYe1vtDFRGCNiZGqGhDrD7RHGuoWxVPrvDl2YpO8JDAInbQ1K+VlgI9raLuwPsvg7LSQsKRZYgQ5YvmVphqVIjdAfMI8LNU8zLgGYYLciwAQZYLFYTKess2RHx/HJkRTfGqWVEBmljD6QcxStiQuqCMJ77ixERDnSfzt9YRdU3VoB2hVtXGNsVaWqho0hZ7NLTe8BpWjwYNaHsTtRu9UPUzIb8aYr0hkZPCLAhOLJSzNkHztJVWWqaiZUhDnriFayFBDadzw+VxQ4SazWY7puIMony58CSHfFtmU3O76OBOM7OvBKWJPdnPB+/ApDbGtiY5GE5amD6RpShCiamUplDTJ7OxOBE+fShCdWKcEny+3t5eupelLbvD5weA8W1sakzIndAQKSKbyfWcvPZgBa+WdUWGRBNpAk6nCJY+EqsEgNlBRTmGA4Cf4H0qrOj00X8N5Pnsm5oRhcoQJRjmQwEF8gzLirzCFyJDohNB6svggJKY9hqi3Q1xShdl6JVJnDkkXjVFYHnVz4ZU6FUCYdXLhVXVK/FKwMuoEAIIJUkOh/5PiTLTUE9A2Ya4ILFesDhXQ63BNVsD5uuhWjvImqulnkSs19B8df1ptn4D0x+XaoLJcChQ19IQmWk23NP5lbpGmEmS9QtBQCbXC0fCagthqMzKvYRspWCLpWtyem5tMGsrLaKN07VOmnwnoK6Tv1m5GkulGgpTsQvm5EMWi0fzu3Cd6j/qUvf0CmUCd255ldFHxICY0mjShzK5nqZly/BZIjmEZIbbs6g90wTvKeSTnDTd4UCECRKFnANnrKSRYk6TlqbMXCXXMIkTM1chlwzFkfEjLZTtzDRhU+voxOih1uybDSmSo3fPXEWBoj6rENXIVWNOBSjxNOeypuTuCHTWbxr1yLQNkeXY5HpEN2eOzEmrG5rkAIJtS9eh3crMuvQahoNFSYdzrQYXoBZpJNddt+bYCYkJkstoIBRgwax8k7Pnn/a51kEK3Tkf4ibkm/ouEy3K/phB1zAYdJ0qdrlAEHiZGlBdVrLeXfIkhUjtoZFoKpLVR2uiSpOyZ4rYsSHdDdMpUbOLy1za5YvyrbwXoaHNYOHkm1B5CTMv74EIVN2dKWXmV1b4OcAwLBPkgwxoAy/enXUzz7kXxK+5N1za1+g/9+3il7Z8vuzwZ0vWtoOKSSGXq7SIhG/Rqr8OrYqwX5V8UHm2uvJ01Ti/ILJUsqW2w85o/Knlivun/TWvVP1YdGC8b9foyLGq43uvzRt7IXrkJFe5XGs88snx6vKRr9tfqzi6xbj95pqPv6h0XbzRv33vmDF8OnqhS2UHT+2+vngMdjQFKfhO6/d6dNuO97Rf9Y7xhcb5Lxf9ue3VD0ec4c1F1Zvi7+/bD2+eOHBo/qZjN7uu7DwztC557m/X7mU3ty+Pc4/Xu8/ENm9//uhHI2/90T/O1Z1eBsa63v5514lLdQePPFvb0f77reqrowdLl5z7AUsnd3yz7/xWt7Ln6rvoifo9bzxzo+nC8O3WkU+fvv7djtFwbXF0fuq3s56my9eu3Mht4z/WkzQdqxMAAA==");
myHeaders.append("Cookie", "dp1=bu1p/QEBfX0BAX19AQA**6963fc53^");
myHeaders.append('Access-Control-Allow-Origin','*');
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'

};

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

// var tmdb_id = "";
var iframe = $("#iframe");
var requestKinoOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
function handleYoutube(movieId){
    iframe.attr('src',"")
  fetch("https://api.kinocheck.de/movies?tmdb_id=" + movieId, requestKinoOptions)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(result => {
        console.log(result);
        if (result.trailer === null){
            console.log('no movie trailer');
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

