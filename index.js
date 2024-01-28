      function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;

    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    
    console.log(response.data.condition.description);

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/hr`;
    temperatureElement.innerHTML = Math.round(temperature); 
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class="weather-app-icon" />`;
    console.log(response.data.temperature.current);

    getForecast(response.data.city);
}

function formatDate(date){
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days =[
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];

    let day = days[date.getDay()];

    if (minutes <10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    // make API call and update the interface
    //separation of concerns
    let apiKey = "1de043300tfb174cf1a30ef403a9aobc";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    console.log(apiUrl);
    //get results of the API
    axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    console.log(searchInput.value);
    
    searchCity(searchInput.value);
}

function formatDay(timestomp) {
    let date = new Date(timestomp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Frid", "Sat"];

    return days[date.getDay()];

}


function getForecast(city) {
    let apiKey = "1de043300tfb174cf1a30ef403a9aobc";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    
    axios(apiUrl).then(displayForecast);
    }

function displayForecast(response) {
let forecastHtml = "";

response.data.daily.forEach(function (day, index){
    if (index <5) {

forecastHtml = 
   forecastHtml +
   `
    <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>

    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
    </div>
     <div class="weather-forecast-temperatures">
     <div class="weather-forecast-temperature">
     <strong>${Math.round(day.temperature.maximum)}°</strong>
     </div>
     <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°       
 </div> 
 </div>
  `;
 }
});

let forecast = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);


searchCity("La Villatte");


