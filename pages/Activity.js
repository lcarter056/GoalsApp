import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
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
    

  const { title, time, lat, long } = route.params;
  let acts = [];
  var startDate = "";
  var endDate = "";
  const timeZone = "America/Denver";
  let sliced = [];
 
  for(let i=0; i < activities.length; i++){
    acts.push(new Activity(activities[i].activity_name, 
     activities[i].activity_category, 
     activities[i].weather_condition, activities[i].time, 
     activities[i].distance_campus, activities[i].address));
  }

  const getDate = () => {
    startDate = new Date().toISOString().slice(0,10);
    endDate = new Date().toISOString().slice(0,10);
 }

  const getDropDown = (weatherData) => {
    //what about null drop down from activity page // TODO
   let hours = [];
    for(let i=0; i< weatherData.length; i++){
      hours.push({label : weatherData[i].time, value: i}); 
    }
    setHour(hours);
  }

  const getCode = (code, wind) => {
    if (wind > 19){
      return "Windy";
    }
    else if (code > -1 && code < 50){
      return "Clear Skies";
    }
    else if (code > 49 && code < 70 || code == 81 || code == 82 || code == 80 ){
      return "Rainy";
    }
    else if (code > 69 && code < 80){
      return "Light Snow";
    }
    else if (code > 82 && code < 95){
      return "Snow";
    }
    else if (code > 94 && code < 100){
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
      return `${sndDigit-2}:00pm`;
    }
    else {
      return `${10 + (sndDigit-2)}:00pm`;
    }
  }
  
  useEffect(() => {

    if (weather != null){
      /*
      let timetag = time;
      if(timetag == null){
        timetag = "Evening";
      }
        */
     
   let filteredActivites = acts.filter(act => act.weather == (weather[value]).description && (act.time).includes(time) && (act.category) == title); 
      let midPoint = Math.floor((filteredActivites.length-1)/ 2);
      let x = Math.floor(Math.random() * (midPoint+1));
      let y = Math.floor(Math.random() * (filteredActivites.length - midPoint - 1) + midPoint + 1); 
     
      if (filteredActivites.length > 1) { 
      setActivity1(filteredActivites[x]);
      setActivity2(filteredActivites[y]);
      }

      else if(filteredActivites.length == 1){
        setActivity1(filteredActivites[0]);
        setActivity2('');
      }
      else {
        setActivity1('');
        setActivity2('');
      }
    }
   
  }, [value]);





  useEffect(() => { 
    const getWeather = async () => {
      getDate();
      const data = await fetchWeather(lat, long, startDate, endDate, timeZone);

      if (time == 'Morning'){
        sliced = data.slice(6, 12);
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
        if (temper){
         getDropDown(temper); 
        }
      }
         
      
    };

    getWeather();

  }, [time]);

  return (
    <View style={styles.background}>    
     <Text style={{ color: 'white', fontSize: 23}}>Activities!</Text>  
       <Text style={{ color: 'white', fontSize: 20}}>{title}</Text>
       <Text style={{ color: 'white', fontSize: 17}}>{time}</Text>
      <Text style={{paddingTop: 100, color: 'black', fontSize: 15}} >{JSON.stringify(weather)}</Text>

      <View style = {styles.dropDown}>
      <DropDownPicker style={styles.dropDown}  items={hour} open={open} 
      value={value} setOpen={setOpen} setValue={setValue} onChange={item => {setValue(item.value)}}
        setItems={setHour} dropDownContainerStyle={styles.label} placeholder="Select time">
        Preferred Hour
      </DropDownPicker>
     </View>
     <View style={styles.row}>
        <Text style={styles.text}>Suggestion 1: {JSON.stringify(activity1.name)}! Address: {JSON.stringify(activity1.addy)}</Text>
        <Button title="Like" onPress={() => activity1.favActivity(activity1.name)} />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Suggestion 2: {JSON.stringify(activity2.name)}!  Address: {JSON.stringify(activity2.addy)}</Text>
        <Button title="Like" onPress={() => console.log(activity2.favActivity(activity2.name))} />
      </View>
    </View>
  );
}  

const styles = StyleSheet.create({
  background: {
    paddingTop: 60,
    alignItems: 'center', 
    width: '100%',
    height: '100%', 
    backgroundColor: '#ABC270'
  },

  button: {     
        paddingRight: 200,
        alignItems: 'center',
        justifyContent: 'center'
  },

  dropDown: {
    width: 120,
    backgroundColor: '#FFD996', // Changes the dropdown background color
    borderColor: '#6D803C'  // Changes the border color
  }, 

  dropDownContainer: {
    width: 40
  }, 
  
  label: {
    backgroundColor: '#FFD996', // Text color
    //fontSize: 16, // Font size
  },
  row: {
    flexDirection: 'row', // Aligns items horizontally
    alignItems: 'center', // Vertically centers items in the row
    marginBottom: 20, // Adds spacing between rows
    flexWrap: 'wrap', // Ensures content wraps if it exceeds
  },
  text: {
    paddingTop: 20,
    color: 'white',
    maxWidth: '70%',
    fontSize: 20,
    marginRight: 10, // Adds spacing between text and button
  }

});