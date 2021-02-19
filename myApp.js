function showDate() {
      let curDate = new Date();
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[curDate.getDay()];
      let showDay = document.querySelector("#card-date");
      showDay.innerHTML = day;
      let hours = curDate.getHours();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      let minutes = curDate.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      let showTime = document.querySelector("#card-hour");
      showTime.innerHTML = `${hours}:${minutes}`;
    }
    showDate();

    function showCity(event) {
      event.preventDefault();
      let cityName = document.querySelector("#card-title");
      let input = document.querySelector("input");
      cityName.innerHTML = input.value;
      searching(cityName.innerHTML);
    }
    let searchForm = document.querySelector("form");
    searchForm.addEventListener("submit", showCity);

    function displayWeather(response) {
      document.querySelector("#card-title").innerHTML = response.data.name;
      document.querySelector("#card-degrees").innerHTML = Math.round(
        response.data.main.temp
      );
      document.querySelector("#humidity").innerHTML =
        response.data.main.humidity;
      document.querySelector("#windy").innerHTML = Math.round(
        response.data.wind.speed
      );
      document.querySelector("#type-weather").innerHTML =
        response.data.weather[0].main;
    }

    function searching(cityName) {
      let key = "68f3915a75420edb9d9f25f95e630a55";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
      axios.get(url).then(displayWeather);
    }

    function searchLocation(position) {
      let key = "68f3915a75420edb9d9f25f95e630a55";
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
      axios.get(url).then(displayWeather);
    }

    function getCurrentLocation(event) {
      navigator.geolocation.getCurrentPosition(searchLocation);
    }

    let currentLocationBtn = document.querySelector("#btnLocation");
    currentLocationBtn.addEventListener("click", getCurrentLocation);