const apiKey = "e4ad29114802abdb8bf790f090d2b942";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let search = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");
let image = document.getElementById("image");
let container = document.getElementById("container");
let weatherData = document.getElementById("weatherData");
let error = document.getElementById("error");
async function checkWeather(city) {
  // console.log(e);
  const response = await fetch(
    apiUrl + city + `&appid=e4ad29114802abdb8bf790f090d2b942`
  );
  let data = await response.json();

  console.log(data);

  container.classList.add("active");
  if (response.status == 200) {
    container.classList.add("activeData");
    let cityName = document.getElementById("name");
    cityName.innerHTML = data.name;
    let deg = document.getElementById("deg");
    deg.innerHTML = Math.round(data.main.temp) + "&deg;C";
    let hub = document.getElementById("hub");
    hub.innerHTML = data.main.humidity + "% <br> Humidity";
    let wind = document.getElementById("wind");
    wind.innerHTML = data.wind.speed + "km/h <br> Wind Speed";

    if (data.weather[0].main == "Clouds") {
      image.src = "images/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      image.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      image.src = "images/snow.png";
    } else if (data.weather[0].main == "Mist") {
      image.src = "images/mist.png";
    } else if (data.weather[0].main == "Clear") {
      image.src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      image.src = "images/drizzle.png";
    }
    if (error.classList.contains("activeError")) {
      error.classList.remove("activeError");
    }
  } else {
    error.classList.add("activeError");
    container.classList.remove("activeData");
  }
}

searchBtn.addEventListener("click", () => {
  let city = search.value;
  if (city) {
    checkWeather(city);
    search.value = "";
  }
});
search.addEventListener("keypress", (e) => {
  let city = search.value;
  if (e.key == "Enter" && city) {
    checkWeather(city);
    search.value = "";
  }
});
