const app = {
  init: () => {
    document
      .getElementById('weatherbt')
      .addEventListener('click', app.fetchWeather);
  },
  fetchWeather: (ev) => {
    let lat = document.getElementById('lat').value;
    let lon = document.getElementById('long').value;
    let key = '9b05386a560251aef228a017ef0b541d';
    let lang = 'en';
    let units = 'metric';
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        app.showWeather(data);
      })
      .catch(console.err);
  },
  showWeather: (resp) => {
    console.log(resp);
    let row = document.querySelector('.weather.row');
    row.innerHTML = resp.daily
      .map((day, idx) => {
        if (idx <= 2) {
          let dt = new Date(day.dt * 1000); 
          return `<div class="col">
              <div class="card">
              <h5 class="card-title p-2">${dt.toDateString()}</h5>
                <img
                  src="https://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@4x.png"
                  class="card-img-top"
                  alt="${day.weather[0].description}"
                />
                <div class="card-body">
                  <h3 class="card-title">${day.weather[0].main}</h3>
                  <p class="card-text">High ${day.temp.max}&deg;C Low ${
            day.temp.min
          }&deg;C</p>
                  <p class="card-text">High Feels like ${
                    day.feels_like.day
                  }&deg;C</p>
                  <p class="card-text">Pressure ${day.pressure}mb</p>
                  <p class="card-text">Humidity ${day.humidity}%</p>
                  <p class="card-text">UV Index ${day.uvi}</p>
                  <p class="card-text">Precipitation ${day.pop * 100}%</p>
                </div>
              </div>
            </div>
          </div>`;
        }
      })
      .join(' ');
  },
};

app.init();