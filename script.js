let weather = {
  apiKey: "73f50bff85a1439865591fdc2932884a",
  fetchWeather: function(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch((error) => console.error("Error fetching weather:", error));
  },
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    console.log(name, icon, description, temp, humidity, speed);

    document.querySelector("#city").innerText = "Weather in " + name;
    document.querySelector("#description").innerText = description;
    document.querySelector("#temp").innerText = temp + "°C";
    document.querySelector("#humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector("#wind").innerText = "Wind Speed: " + speed + " Km/hr";
    /*document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')";*/
  },
  search: function() {
    this.fetchWeather(document.querySelector("#searchbar").value);
  }
};

document.querySelector("#search button").addEventListener("click", function() {
  weather.search();
});

document.querySelector("#searchbar").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

weather.fetchWeather("");
