
//temporary san antonio coordinates 
const lat = 29.42;
const long = -98.49;
const startDate = "2025-04-04";
const endDate = "2025-04-04";
const timeZone = "America/Denver";



const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&temperature_unit=fahrenheit&start_date=${startDate}&end_date=${endDate}&timezone=${timeZone}`;

async function fetchWeather() {

    return await fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('error with response');
      }
      return response.json();
    })
    .then(data => {
      const temps = data.hourly.temperature_2m;
      const temptimes = data.hourly.time;

      //create objects then return them 
      var weather = [];
      // unharcode 25
      for (let i=0; i < 24; i++){
        weather.push({"Time": temptimes[i].split('T')[1], "Temp": temps[i]});
      }
    
      return weather;
      
    })
    .catch(error => {
    
    });

}

export default fetchWeather;
