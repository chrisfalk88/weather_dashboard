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

function onLoad() {
  let loadCity = searchedCities[searchedCities.length -1]
  console.log(loadCity);
  console.log(typeof(loadCity));

  searchWeather(loadCity);
  fiveDay(loadCity);

}

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
    $("#temperature").text(response.main.temp + "\xB0 F");
    //add percentage sign
    $("#humidity").text(response.main.humidity + "%");
    //add MPH
    $("#windspeed").text(response.wind.speed + " MPH");

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (response) {
      let UVrating = response.value;
      //create if else statement here to change color to span element

      if (UVrating > 1 && UVrating < 2) {
        $('#UVIndex').css("background-color", "#8dc443");
      } else if (UVrating > 2 && UVrating < 5) { 
        $('#UVIndex').css("background-color", "#fdd835");
      } else if (UVrating > 5 && UVrating < 7) {
        $('#UVIndex').css("background-color", "#ffb301");
      } else if (UVrating > 7 && UVrating < 10) {
        $('#UVIndex').css("background-color", "#d1394a");
      } else if (UVrating >= 11) {
        $('#UVIndex').css("background-color", "#954f71");
      }
    
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
    let iconID = res.list[0].weather[0].icon;
    let iconURL = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";

    //day one
    $("#day1Date").text(today.format("l"));
    $("#day1Temp").text(res.list[0].main.temp + "\xB0 F");
    $("#day1Hum").text(res.list[0].main.humidity + "%");
    $("#day1Img").attr("src", iconURL);
    today = moment();

    //day two
    $("#day2Date").text(today.add(1, "days").format("l"));
    $("#day2Temp").text(res.list[8].main.temp + "\xB0 F");
    $("#day2Hum").text(res.list[8].main.humidity + "%");
    iconID = res.list[8].weather[0].icon;
    $("#day2Img").attr("src", iconURL);
    today = moment();

    //day three
    $("#day3Date").text(today.add(2, "days").format("l"));
    $("#day3Temp").text(res.list[16].main.temp + "\xB0 F");
    $("#day3Hum").text(res.list[16].main.humidity + "%");
    iconID = res.list[16].weather[0].icon;
    $("#day3Img").attr("src", iconURL);
    today = moment();

    //day four
    $("#day4Date").text(today.add(3, "days").format("l"));
    $("#day4Temp").text(res.list[24].main.temp + "\xB0 F");
    $("#day4Hum").text(res.list[24].main.humidity + "%");
    iconID = res.list[24].weather[0].icon;
    $("#day4Img").attr("src", iconURL);
    today = moment();

    //day five
    $("#day5Date").text(today.add(4, "days").format("l"));
    $("#day5Temp").text(res.list[32].main.temp + "\xB0 F");
    $("#day5Hum").text(res.list[32].main.humidity + "%");
    iconID = res.list[32].weather[0].icon;
    $("#day5Img").attr("src", iconURL);
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
onLoad();
