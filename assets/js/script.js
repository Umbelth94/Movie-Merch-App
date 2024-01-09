
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


