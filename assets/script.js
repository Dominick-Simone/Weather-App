var apiKey = "78ab49e9b7f4234537de6b1f21fa7e6e"
var lat = null;
var lon = null;


$("#searchBtn").on("click", function (e) {
    e.preventDefault();

    var cityName = $("#search").val();
    $("#city").text(cityName)

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey)
            .then(data => {
                    return data.json();
            })
            .then(data => {
                    console.log(data);
                    $("#mainTemp").text(`Temperature: ${data.main.temp} °F`)
                    $("#mainWind").text(`Wind Speed: ${data.wind.speed} MPH`)
                    $("#mainHumidity").text(`Humidity: ${data.main.humidity}%`)
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;

                    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiKey)
                            .then(data => {
                                    return data.json();
                            })
                            .then(data => {
                                    console.log(data)
                                    $("#uvIndex").text(data.current.uvi)
                                    if (data.current.uvi <= 5) {
                                        $("#uvIndex").removeClass("bg-danger");
                                        $("#uvIndex").removeClass("bg-warning");
                                        $("#uvIndex").addClass("bg-success");
                                }
                                    else if (data.current.uvi < 8 && data.current.uvi > 5) {
                                        $("#uvIndex").removeClass("bg-success");
                                        $("#uvIndex").removeClass("bg-danger");
                                        $("#uvIndex").addClass("bg-warning");
                                }
                                    else{
                                        $("#uvIndex").removeClass("bg-success");
                                        $("#uvIndex").removeClass("bg-warning");
                                        $("#uvIndex").addClass("bg-danger");
                                }

                            })
            });
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey)
            .then(data => {
                    return data.json();
            })
            .then(data => {
                console.log(data);
                console.log(data.list[0])
                $("#image0").text(data.list[0].wind.speed)
                temp0 = ((data.list[0].main.temp - 273.15)*1.8)+32
                temp1 = ((data.list[7].main.temp - 273.15)*1.8)+32
                temp2 = ((data.list[15].main.temp - 273.15)*1.8)+32
                temp3 = ((data.list[23].main.temp - 273.15)*1.8)+32
                temp4 = ((data.list[31].main.temp - 273.15)*1.8)+32
                $("#image0").attr('src', 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@4x.png');
                $("#wind0").text("Wind Speed: " + data.list[0].wind.speed + " MPH")
                $("#humidity0").text("Humidity: " + data.list[0].main.humidity + " %")
                $("#temp0").text("Temperature: " + Math.round(temp0) + " °F")

                $("#image1").attr('src', 'https://openweathermap.org/img/wn/' + data.list[7].weather[0].icon + '@4x.png');
                $("#wind1").text("Wind Speed: " + data.list[7].wind.speed + " MPH")
                $("#humidity1").text("Humidity: " + data.list[7].main.humidity + " %")
                $("#temp1").text("Temperature: " + Math.round(temp1) + " °F")

                $("#image2").attr('src', 'https://openweathermap.org/img/wn/' + data.list[15].weather[0].icon + '@4x.png');
                $("#wind2").text("Wind Speed: " + data.list[14].wind.speed + " MPH")
                $("#humidity2").text("Humidity: " + data.list[14].main.humidity + " %")
                $("#temp2").text("Temperature: " + Math.round(temp2) + " °F")

                $("#image3").attr('src', 'https://openweathermap.org/img/wn/' + data.list[23].weather[0].icon + '@4x.png');
                $("#wind3").text("Wind Speed: " + data.list[21].wind.speed + " MPH")
                $("#humidity3").text("Humidity: " + data.list[21].main.humidity + " %")
                $("#temp3").text("Temperature: " + Math.round(temp3) + " °F")

                $("#image4").attr('src', 'https://openweathermap.org/img/wn/' + data.list[31].weather[0].icon + '@4x.png');
                $("#wind4").text("Wind Speed: " + data.list[28].wind.speed + " MPH")
                $("#humidity4").text("Humidity: " + data.list[28].main.humidity + " %")
                $("#temp4").text("Temperature: " + Math.round(temp4) + " °F")

            });
});
// Local Storage for searches Could not get them to be created as buttons
button = document.querySelector("#searchBtn");
input = document.querySelector("#search");
button.addEventListener("click", function (e) {
  e.preventDefault();
  text = input.value
  addToStorage(text);
})
function addToStorage(text) {
  var searchArr = [];
  if (!localStorage.getItem("searches")) {
    console.log("No searches");
    searchArr.push(text);
    localStorage.setItem("searches", JSON.stringify(searchArr))
  }
  // Checks that the search wasn't previously searched so you don't have 2 of the same buttons appear
  if (!localStorage.getItem("searches").includes(text)) {
        searchArr = JSON.parse(localStorage.getItem("searches"));
        searchArr.push(text);
        localStorage.setItem("searches", JSON.stringify(searchArr))
  } else {
          return;
  }
}
function getStorage() {
  if(!localStorage.getItem("searches")) {
    return;
  }
  console.log(localStorage.getItem("searches"));
}
getStorage();

