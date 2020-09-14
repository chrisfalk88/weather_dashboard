//Variables 

//Open Weather API Information

let key = "35acf8745c429fee89a9063272d6e332";
let searchHistory = [];

//Array of searched Cities 
let searchedCities = [];

function getWeather() {
    let userInput = $('#userInput').val();
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });

    //adding what was searched to an array
    searchHistory.push(userInput);

    //stringifying the array to save as local storage 
    localStorage.setItem("city", JSON.stringify(searchHistory)); 
};




//for loop to populate search results to page 

//retrived the object from local storage 
let retrievedData = localStorage.getItem("city");
//parse it back into an object 
let previousSearched = JSON.parse(retrievedData);

console.log(previousSearched.length);

//use length property to loop through all previous entries 
for (i = 0; i < previousSearched.length ; i ++) {

    //j querry to create elements 
    // j querry to put search history in a list 


}



//Click Events and Event Listeners
$(document).on('click', '.btn', getWeather);