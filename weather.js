// XMLHttpRequests and API links for each of the 4 cities
let http1 = new XMLHttpRequest();
let lakelandWeather = `https://api.openweathermap.org/data/2.5/weather?q=Lakeland,FL,US&units=imperial&appid=ef83e5c02ad767bc8b46a8e09f21ba5f`
let http1Forecast = new XMLHttpRequest();
let lakelandForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=28.04&lon=-81.95&exclude=current,minutely,hourly,alerts&units=imperial&appid=ef83e5c02ad767bc8b46a8e09f21ba5f`
let http2 = new XMLHttpRequest();
let ocoeeWeather = `https://api.openweathermap.org/data/2.5/weather?q=Ocoee,FL,US&units=imperial&appid=ef83e5c02ad767bc8b46a8e09f21ba5f`
let http2Forecast = new XMLHttpRequest();
let ocoeeForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=28.57&lon=-81.54&exclude=current,minutely,hourly,alerts&units=imperial&appid=ef83e5c02ad767bc8b46a8e09f21ba5f`
let http3 = new XMLHttpRequest();
let chicagoWeather = `https://api.openweathermap.org/data/2.5/weather?q=Chicago,IL,US&units=imperial&appid=ef83e5c02ad767bc8b46a8e09f21ba5f`
let http3Forecast = new XMLHttpRequest();
let chicagoForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=41.88&lon=-87.63&exclude=current,minutely,hourly,alerts&units=imperial&appid=ef83e5c02ad767bc8b46a8e09f21ba5f`
let http4 = new XMLHttpRequest();
let bostonWeather = `https://api.openweathermap.org/data/2.5/weather?q=Boston,MA,US&units=imperial&appid=ef83e5c02ad767bc8b46a8e09f21ba5f`
let http4Forecast = new XMLHttpRequest();
let bostonForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=42.36&lon=-71.06&exclude=current,minutely,hourly,alerts&units=imperial&appid=ef83e5c02ad767bc8b46a8e09f21ba5f`

// Different elements within the weather cards
let cards = document.getElementsByClassName('card-body');
let cities = document.getElementsByClassName('card-title');
let weatherAndTemps = document.getElementsByClassName('card-subtitle');
let icons = document.querySelectorAll('p > i');

let id; // Weather ID

let response1, response2, response3, response4, response5, response6, response7, response8;

// Shows cards when data is updated
for (let i = 0; i < cards.length; i++) {
  cards[i].style.display = "none"
}
for (let i = 0; i < cards.length; i++) {
  setTimeout(function() {cards[i].style.display = "initial";}, 400);
}

// Next 4 Event listeners displays the weather for 4 different cities on each of the cards
http1.addEventListener('readystatechange', function() {
  if (http1.readyState == 4 && http1.status == 200) {
    response1 = JSON.parse(http1.response);
    updateCard(0, response1);
  }
});

http2.addEventListener('readystatechange', function() {
  if (http2.readyState == 4 && http2.status == 200) {
    response2 = JSON.parse(http2.response);
    updateCard(1, response2);
  }
});

http3.addEventListener('readystatechange', function() {
  if (http3.readyState == 4 && http3.status == 200) {
    response3 = JSON.parse(http3.response);
    updateCard(2, response3);
  }
});

http4.addEventListener('readystatechange', function() {
  if (http4.readyState == 4 && http4.status == 200) {
    response4 = JSON.parse(http4.response);
    updateCard(3, response4);
  }
});

let links = document.getElementsByClassName('card-link'); // Array of forecast links
let forecastModal = document.querySelector('#weather-modal'); // Weather forecast modal
let cardNumber; // Which link was clicked

// When forecast modal is about to be opened
forecastModal.addEventListener('show.bs.modal', function(event) {
  document.getElementsByClassName('modal-content')[0].style.display = "none";
  for (let i = 0; i < links.length; i++) {
    if (event.relatedTarget == links[i]) {
      cardNumber = i; // Save index of link that was clicked
    }
  }

  http1Forecast.open("GET", lakelandForecast, true);
  http1Forecast.send();
  http2Forecast.open("GET", ocoeeForecast, true);
  http2Forecast.send();
  http3Forecast.open("GET", chicagoForecast, true);
  http3Forecast.send();
  http4Forecast.open("GET", bostonForecast, true);
  http4Forecast.send();

  // Next 4 event listeners for 7-day forecast data
  http1Forecast.addEventListener('readystatechange', function() {
    if ((http1Forecast.readyState == 4 && http1Forecast.status == 200) && cardNumber == 0) {
      response5 = JSON.parse(http1Forecast.response);
      updateForecast(response5, 0);
    }
  });

  http2Forecast.addEventListener('readystatechange', function() {
    if ((http2Forecast.readyState == 4 && http2Forecast.status == 200) && cardNumber == 1) {
      response6 = JSON.parse(http2Forecast.response);
      updateForecast(response6, 1);
    }
  });

  http3Forecast.addEventListener('readystatechange', function() {
    if ((http3Forecast.readyState == 4 && http3Forecast.status == 200) && cardNumber == 2) {
      response7 = JSON.parse(http3Forecast.response);
      updateForecast(response7, 2);
    }
  });

  http4Forecast.addEventListener('readystatechange', function() {
    if ((http4Forecast.readyState == 4 && http4Forecast.status == 200) && cardNumber == 3) {
      response8 = JSON.parse(http4Forecast.response);
      updateForecast(response8, 3);
    }
  });

  setTimeout(function() {document.getElementsByClassName('modal-content')[0].style.display = "initial";}, 400);
});

// Returns bootstrap icon depending on weather ID
function determineIcon(id) {
  if (id >= 200 && id <= 232)
    return "bi bi-cloud-lightning";
  else if (id >= 300 && id <= 321)
    return "bi bi-cloud-rain";
  else if (id >= 500 && id <= 531)
    return "bi bi-cloud-rain-heavy";
  else if (id >= 600 && id <= 622)
    return "bi bi-cloud-snow";
  else if (id >= 700 && id <= 771)
    return "bi bi-cloud-fog";
  else if (id == 781)
    return "bi bi-tornado";
  else if (id == 800)
    return "bi bi-sun";
  else if (id >= 801 && id <= 804)
    return "bi bi-cloudy";
}

// Changes the information on the weather cards
function updateCard(index, response) {
  cities[index].innerText = response.name;
  weatherAndTemps[index].innerText = response.weather[0].description + " - " + Math.round(response.main.temp) + '\u00B0F';
  id = response.weather[0].id;
  icons[index].className = determineIcon(id);
}

let forecastIcons = document.querySelectorAll('li > i');
let dailyWeather = document.querySelectorAll('li');

// Changes the information on the weather forecast modal
function updateForecast(response, cityNum) {
  document.querySelector('#modal-title').innerText = "Forecast for " + cities[cityNum].innerText;
  for (let i = 0; i < 7; i++) {
    id = response.daily[i].weather[0].id;
    dailyWeather[i].innerHTML = "<i class=\"" + determineIcon(id) + " me-3\"></i>"+ " " + Math.round(response.daily[i].temp.max) + "\u00B0F / " + Math.round(response.daily[i].temp.min) + "\u00B0F - " + response.daily[i].weather[0].description + ", " + Math.round(response.daily[i].wind_speed) + " mph wind";
  }
}

http1.open("GET", lakelandWeather, true);
http1.send();
http2.open("GET", ocoeeWeather, true);
http2.send();
http3.open("GET", chicagoWeather, true);
http3.send();
http4.open("GET", bostonWeather, true);
http4.send();
