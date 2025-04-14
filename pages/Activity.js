import React, {useState, useEffect, act} from "react";
import { View, Text, Button} from 'react-native';
import fetchWeather from "../api/weather";
import activities from "../data/Activities";
import { Activity } from '../data/ActivityClass';
import DropDownPicker from 'react-native-dropdown-picker';



export default function ActivitiesPage( {route} ) {
  const [weather, setWeather] = useState(null);
  const [activity1, setActivity1] = useState('');
  const [activity2, setActivity2] = useState('');

   const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [hour, setHour] = useState([]);
    

  const { title, time } = route.params;
  
  let acts = [];
  
//temporary san antonio coordinates 
  const lat = 29.42;  // gps values
  const long = -98.49;   //gps values
  var startDate = "2025-02-11";
  var endDate = "2025-02-11";
  const timeZone = "America/Denver";
  let sliced = [];
 
  for(let i=0; i < activities.length; i++){
    acts.push(new Activity(activities[i].activity_name, 
     activities[i].activity_category, 
     activities[i].weather_condition,activities[i].time, 
     activities[i].distance_campus));
  }

  const getDate = () => {
    startDate = new Date().toISOString().slice(0,10);
    endDate = new Date().toISOString().slice(0,10);
 }

  
  const getDropDown = (weatherData) => {
    //what about null drop down from activity page // check this
   let hours = [];
    for(let i=0; i< weatherData.length; i++){
      hours.push({label : convertTime(weatherData[i].time) , value: i}); 
    }
    setHour(hours);
  }

  const getCode = (code, wind) => {
    // Clear Skies 0-48, or Rainy 51 - 67, Snow 75 -77 Storm 95 - 99, no code should be missing go from 0-100
    if (wind > 19){
      return "Windy";
    }
    else if (code > -1 && code < 49){
      return "Clear Skies";
    }
    else if (code > 50 && code < 68){
      return "Rainy";
    }
    else if (code > 74 && code < 78){
      return "light Snow";
    }
    else if (code > 84 && code < 89){
      return "Snow";
    }
    else if (code > 95 && code < 99){
      return "Thunderstorm";
    }
    else {
      return JSON.stringify(code);
    }
  }
  

  const convertTime = (time) => {
    let sndDigit = parseInt(time.split(':')[0]) % 10;
    let num = parseInt(time.split(':')[0]);
    if(num < 13){
      return `${time}am`;
    }
    else if (num > 12 && num < 20){
      return `${sndDigit -2}:00pm`;
    }
    else {
      return `${10 + (sndDigit - 2)}:00pm`;
    }
    
  }
  
  useEffect(() => {
    //suggest Activity function
    //drop down for morning doesnt have 10 and 11, can only hold 5 elems? 
    if (weather != null){
     
   let filteredActivites = acts.filter(act => act.weather == (weather[value]).description && (act.time).includes(time) && (act.category) == title); 
      let x = Math.floor(Math.random(0, filteredActivites.length/2));
      let y = Math.floor(Math.random((filteredActivites.length/2) + 1,filteredActivites.length));
     
      //clean up code should have at least one/ two activites for each hour
      if (filteredActivites.length > 1) { 
      setActivity1(filteredActivites[x].name);
      setActivity2(filteredActivites[y].name);
      }
      else {
        setActivity1(filteredActivites[0].name);
        setActivity2('');
      }
      
    }
   
  }, [value]);





  useEffect(() => { 
    const getWeather = async () => {
      getDate();
      const data = await fetchWeather(lat, long, startDate, endDate, timeZone);
      
      if (time == 'Morning'){
        sliced = data.slice(5, 12);
      }
      else if (time == 'Afternoon'){
        sliced = data.slice(13, 18);
      }
      else {
        sliced = data.slice(19, 22);
      }
      
      if (sliced != null){
        var temper = []
        for (let i=0; i < sliced.length; i++){
         temper.push({'time': `${convertTime(sliced[i].time)}`, 'temp' : `${sliced[i].temp} F`, 
         'description' : `${getCode(sliced[i].code, sliced[i].wind)}`});
        }
        setWeather(temper);
        getDropDown(sliced); //set these as same variables ^
        }
         
      
    };

    getWeather();

  }, [time]);

  return (
    <View>      
       <Text>{title}</Text>
       <Text>{time}</Text>
      <Text>{JSON.stringify(weather)}</Text>

      <DropDownPicker items={hour} open={open} 
      value={value} setOpen={setOpen} setValue={setValue} onChange={item => {setValue(item.value)}}
        setItems={setHour} placeholder="Select time">
        Preferred Hour
      </DropDownPicker>

      <Text>We suggest you go to {JSON.stringify(activity1)}!</Text>
      <Text>Another suggestion is to go to {JSON.stringify(activity2)}!</Text>
    </View>
  );
}  