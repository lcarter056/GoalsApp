import React, {useState, useEffect} from "react";
import { View, Text, Button } from 'react-native';
import fetchWeather from "../api/weather";
import { useNavigation } from "@react-navigation/native";
import activities from "../data/Activities";
import { Activity } from '../data/ActivityClass'


export default function ActivitiesPage( {route} ) {
  const [weather, setWeather] = useState(null);
  const { title, time } = route.params;
  let acts = [];
  
//temporary san antonio coordinates 
  const lat = 29.42;
  const long = -98.49;  
  var startDate = "2025-04-04";
  var endDate = "2025-04-04";
  const timeZone = "America/Denver";
  let sliced = [];

  const navigation = useNavigation();
 
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

  const getWeather = (temp) => {
    // Clear Skies, Windy, or Rainy
    
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
  
  // socket.io
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
         temper.push(`${convertTime(sliced[i].time)}: ${sliced[i].temp} F\n`);
        }
        setWeather(temper);
        

        }
      
    };

    getWeather(); 
  }, [time]);

  return (
    <View>      
       <Text>{title}</Text>
       <Text>{time}</Text>
      <Text>{weather}</Text>
      <Text>{JSON.stringify(acts[0].name)}</Text>
      <Text>Temp Suggestion 1</Text>
      <Text>Temp Suggestion 2</Text>
    </View>
  );
}  