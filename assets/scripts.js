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
        
        $('#title').text(response.name);
        //convert to Fahrenheit and toFixed(2)
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
        let storedCities = JSON.parse(localStorage.getItem("city"));
        console.log(storedCities);

}

function fiveDay() {
    let selectedCity = $('#userInput').val();
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + selectedCity + "&appid=" + key; 

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(res) {

        //day one 

        //pretty sure there will need to be a comparison here for time

        $('#day1Temp').text(res.list[0].main.temp);
        $('#day1Hum').text(res.list[0].main.humidity);

        //day two

        $('#day2Temp').text(res.list[5].main.temp);
        $('#day2Hum').text(res.list[5].main.humidity);

         //day three

        $('#day3Temp').text(res.list[10].main.temp);
        $('#day3Hum').text(res.list[10].main.humidity);

        //day four

        $('#day4Temp').text(res.list[20].main.temp);
        $('#day4Hum').text(res.list[20].main.humidity);

        //day four

        $('#day5Temp').text(res.list[30].main.temp);
        $('#day5Hum').text(res.list[30].main.humidity)

    });
}



// let testItem = localStorage.getItem("city");
// console.log(typeof(testItem));


//Click Events and Event Listeners
$(document).on('click', '.btn', function(){
    searchWeather();
    fiveDay();
});

//create click event for when user clicks on previous data 


//Questions for Hannah 
//space inbetween divs in CSS 
//button psuedo class border none
// local storage is ONLY saving one page "session" and not every entry 
//checking dates with moment and openweather 