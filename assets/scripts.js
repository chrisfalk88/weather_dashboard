//Variables

//moment js varaibles
let date = moment().format("l");
let today = moment();

//Open Weather API Information
let key = "35acf8745c429fee89a9063272d6e332";

//Array of searched Cities
let searchedCities = [];



//Functions

//checks local storage and writes to search history
function createSearchHistory() {
  searchedCities = JSON.parse(localStorage.getItem("city"));
  console.log(searchedCities);
  if (searchedCities === null) {
    searchedCities = [];
  }
  for (i = 0; i < searchedCities.length; i++) {
    let newDiv = $("<div>").addClass("searched rounded");
    let a = $("<a>");

    a.text(searchedCities[i]);
    newDiv.prepend(a);
    $("#searchHistory").prepend(newDiv);
  }
}

//takes user input from search bad, querries the API, adds searched city to searched history array.
function searchWeather(selectedCity) {
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    selectedCity +
    "&appid=" +
    key +
    "&units=imperial";

  // AJAX calls that are bringing in weather values from input bar
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    let lat = response.coord.lat;
    let lon = response.coord.lon;
    let uvURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      key +
      "&lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial";

    let iconID = response.weather[0].icon;
    let iconURL = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";
    $("#title").text(response.name);
    $("#titleDate").text("(" + date + ")");
    $("#titleImg").attr("src", iconURL);
    //iconId = response.weather[0].icon;

    //convert to Fahrenheit and toFixed(2)
    $("#temperature").text(response.main.temp);
    //add percentage sign
    $("#humidity").text(response.main.humidity);
    //add MPH
    $("#windspeed").text(response.wind.speed);

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (response) {
      let UVrating = response.value;
      //create if else statement here to change color to span element
      $("#UVIndex").text(response.value);
    });
  });
}

function localstoragefunc() {
  $("#searchHistory").empty();

  localStorage.setItem("city", JSON.stringify(searchedCities));
  console.log(localStorage.getItem("city"));

  //this is making our local storage an array
  let storedCities = JSON.parse(localStorage.getItem("city"));
  console.log(storedCities);

  for (i = 0; i < storedCities.length; i++) {
    let newDiv = $("<div>").addClass("searched rounded");
    let a = $("<a>");

    a.text(storedCities[i]);
    newDiv.append(a);
    $("#searchHistory").prepend(newDiv);
  }
}

function fiveDay(selectedCity) {
  let queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    selectedCity +
    "&appid=" +
    key +
    "&units=imperial";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (res) {
    //day one
    console.log(new Date());
    console.log(res);

    // find the current
    //loop through time variables and test against current hour
    // then once true, write to page, and then add 8 index

    //pretty sure there will need to be a comparison here for time
    $("#day1Date").text(today.add(1, "days").format("l"));
    $("#day1Temp").text(res.list[0].main.temp);
    $("#day1Hum").text(res.list[0].main.humidity);
    today = moment();

    //day two
    $("#day2Date").text(today.add(2, "days").format("l"));
    $("#day2Temp").text(res.list[8].main.temp);
    $("#day2Hum").text(res.list[8].main.humidity);
    today = moment();

    //day three
    $("#day3Date").text(today.add(3, "days").format("l"));
    $("#day3Temp").text(res.list[16].main.temp);
    $("#day3Hum").text(res.list[16].main.humidity);
    today = moment();

    //day four
    $("#day4Date").text(today.add(4, "days").format("l"));
    $("#day4Temp").text(res.list[24].main.temp);
    $("#day4Hum").text(res.list[24].main.humidity);
    today = moment();

    //day five
    $("#day5Date").text(today.add(5, "days").format("l"));
    $("#day5Temp").text(res.list[32].main.temp);
    $("#day5Hum").text(res.list[32].main.humidity);
    today = moment();
  });
}

//Click Events and Event Listeners
$(".btn").click(function () {
  let selectedCity = $("#userInput").val();
  searchWeather(selectedCity);
  fiveDay(selectedCity);

  //moves every user search into array if the selectedCity is not in the searchedCities array
  searchedCities.push(selectedCity);
  localstoragefunc();
});

//create click event for when user clicks on previous data

$(document).on("click", ".searched", function () {
  let selectedCity = $(this).children("a").text();
  searchWeather(selectedCity);
  fiveDay(selectedCity);
});

createSearchHistory();

