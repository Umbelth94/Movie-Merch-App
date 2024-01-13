# Movie-Merch-App
An app that will help you wishlist and track merchandise from your favorite movies.  

## User Story
As a movie enthusiast
I want to track merchandise for my favorite movies
So that I can sty up to date on collectibles and memorabilia

## Acceptance Criteria
Given a movie title
When I search for the movie
THEN I am presented with basic details about the movie
WHEN I click on the "more info" button
THEN I am given MORE details about the movie
WHEN I click on the "view merch" button and select some types of merch to view
THEN I am given ebay search results for merch related to the movie based on the selected criteria/type of merch

## Running Locally 
- Made a .local folder as a workaround because of cors policy blocking requests to the ebay API
- The shell script will open chrome with web security disabled so that the requests can be sent to the ebay API


- Start the VSCode extension 'Live Server'
- Enter the following into the terminal
On Mac :
```sh ./.local/runlocal.sh```
- allow chrome to access the .local/data directory
- Navigate to the page that was opened by the chrome browser's shell script.  

On Windows : 
- From desktop, right click -> New -> Shortcut
- use this for the location: ```"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp```
- This will open a chrome browser that has web security disabled, allowing us to run the local version of the app without dealing with cors errors blocking the fetch request.  