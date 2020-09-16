//Variables 
let date = moment().format("l");
let today = moment();
console.log(today);
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
        console.log(response);
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let uvURL =  "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon;
        
        $('#title').text(response.name);
        $('#titleDate').text("("+date+")");

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
        $('#searchHistory').empty();
    
        localStorage.setItem("city", JSON.stringify(searchedCities));
        console.log(localStorage.getItem("city"));

        //this is making our local storage an array
        let storedCities = JSON.parse(localStorage.getItem("city"));
        console.log(storedCities);



        for (i = 0; i < storedCities.length; i ++) {
            let newDiv = $('<div>').addClass("searched rounded");
            let a = $('<a>')

            a.text(storedCities[i]);
            newDiv.append(a);
            $('#searchHistory').append(newDiv);
        }

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
        $('#day1Date').text(today.add(1, 'days').format("l"));
        $('#day1Temp').text(res.list[0].main.temp);
        $('#day1Hum').text(res.list[0].main.humidity);
        today = moment();

        //day two
        $('#day2Date').text(today.add(2, 'days').format("l"));
        $('#day2Temp').text(res.list[5].main.temp);
        $('#day2Hum').text(res.list[5].main.humidity);
        today = moment();

         //day three
        $('#day3Date').text(today.add(3, 'days').format("l"));
        $('#day3Temp').text(res.list[10].main.temp);
        $('#day3Hum').text(res.list[10].main.humidity);
        today = moment();

        //day four
        $('#day4Date').text(today.add(4, 'days').format("l"));
        $('#day4Temp').text(res.list[20].main.temp);
        $('#day4Hum').text(res.list[20].main.humidity);
        today = moment();

        //day four
        $('#day5Date').text(today.add(5, 'days').format("l"));
        $('#day5Temp').text(res.list[30].main.temp);
        $('#day5Hum').text(res.list[30].main.humidity)
        today = moment();
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