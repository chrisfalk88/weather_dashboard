//Variables 


//Open Weather API Information

let key = "35acf8745c429fee89a9063272d6e332";

//Array of searched Cities 
let searchedCities = [];

//Functions 

//takes user input from search bad, querries the API, adds searched city to searched history array. 
function searchWeather() {
    let selectedCity = $('#userInput').val();
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + selectedCity + "&appid=" + key;

    // AJAX calls that are bringing in weather values from input bar 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let uvURL =  "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon;

        //rewrite this because it creates a new title with every call 
        let newTitle = $('<h1>');
        newTile="";
        newTitle.text(response.name);
        $('#title').append(newTitle);


        //convert to Fahrenheit 
        $('#temperature').text(response.main.temp);
        //add percentage sign
        $('#humidity').text(response.main.humidity);
        //add MPH 
        $('#windspeed').text(response.wind.speed);

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(response){
            let UVrating = response.value;
            //create if else statement here to change color to span element 
            $('#UVIndex').text(response.value);
        });

    });

    //moves every user search into array
    searchedCities.push(selectedCity);

    console.log(searchedCities); 
    localstoragefunc();
 
};

function localstoragefunc() {

    
        localStorage.setItem("city", JSON.stringify(searchedCities));
        console.log(localStorage.getItem("city"));

        //this is making our local storage an array
        let text = JSON.parse(localStorage.getItem("city"));
        console.log(text);

        for (i = 0; i < text.length; i ++) {
            //this is printing every item that we pulled from local storage    
            console.log(text[i]);

            let newDiv = $('<div>');
            let a = $('<button>').addClass("searched");
            a.text(text[i]);
            newDiv.append(a);
            $('#searchHistory').append(newDiv);


        }

}





// let testItem = localStorage.getItem("city");
// console.log(typeof(testItem));


//Click Events and Event Listeners
$(document).on('click', '.btn', searchWeather);

//create click event for when user clicks on previous data 


//Questions for Hannah 
//space inbetween divs in CSS 
//button psuedo class border none
// local storage is ONLY saving one page "session" and not every entry 