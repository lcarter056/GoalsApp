
async function fetchWeather(lat, long, startDate, endDate, timeZone) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&temperature_unit=fahrenheit&start_date=${startDate}&end_date=${endDate}&timezone=${timeZone}`;

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

      //create objects then return them 
      var weather = [];
      // unharcode 24
      for (let i=0; i < 24; i++){
        weather.push({"time": temptimes[i].split('T')[1], "temp": temps[i]});
      }
    
      return weather;
      
    })
    .catch(error => {
      console.error('Error when fetching weather', error);
    });

}

export default fetchWeather;
