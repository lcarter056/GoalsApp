
async function fetchWeather(lat, long, startDate, endDate, timeZone) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=mph&temperature_unit=fahrenheit&start_date=${startDate}&end_date=${endDate}&timezone=${timeZone} `;

    return await fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('error with response header');
      }
      return response.json();
    })
    .then(data => {
      const temps = data.hourly.temperature_2m;
      const temptimes = data.hourly.time;
      const code = data.hourly.weather_code;
      const wind = data.hourly.wind_speed_10m;


      var weather = [];
      for (let i=0; i < temps.length; i++){
        weather.push({"time": temptimes[i].split('T')[1], "temp": temps[i], "code": code[i], "wind": wind[i]});
      }
      return weather;
      
    })
    .catch(error => {
      console.error('Error when fetching weather', error);
    });

}

export default fetchWeather;
