import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import fetchWeather from "../api/weather";
import activities from "../data/Activities";
import { Activity } from '../data/ActivityClass';
import DropDownPicker from 'react-native-dropdown-picker';
import { getImage } from '../data/WeatherClass';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

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

  const storeActivities = async (act) => {
    try {
      let currList = await AsyncStorage.getItem('FavActs');
      if (currList != null){
       currList =  JSON.parse(currList);
      }
      else {
        currList = [];
      }
      
      if(!currList.includes(act.name) && currList.length < 5){
        currList.push(act.name);
      }
      await AsyncStorage.setItem('FavActs', JSON.stringify(currList));
      
    } catch (error) {
      console.error('Error adding activity to the list');
    }
  
}
/*
  
  useEffect(() => {

    if (weather != null){
     //let filteredActivites = acts.filter(act => act.weather == (weather[value]).description && (act.time).includes(time) && (act.category) == title); 

     let filteredActs = [];
     for (let i=0; i < acts.length; i++){
      if(weather[value].description !== undefined){
        if ((acts[i].weather == (weather[value]).description) && (acts[i].time).includes(time) && acts[i].category == title){
          filteredActs.push(acts[i]);
       }
      }
    }
    
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
*/


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
        sliced = data.slice(18, 22);
      }
      
      if (sliced != null){
        var temper = []
        for (let i=0; i < sliced.length; i++){
         let image = getImage(getCode(sliced[i].code, sliced[i].wind), time);
         temper.push({'time': `${convertTime(sliced[i].time)}`, 'temp' : `${sliced[i].temp} F`, 
         'description' : `${getCode(sliced[i].code, sliced[i].wind)}`, 'image': image});
        }
        setWeather(temper);
        if (temper){
        getDropDown(temper); 
        }
      }
         
      
    }

    getWeather();
    let filteredActs = [];
    if (weather != null){
      for (let i=0; i < acts.length; i++){
       if(weather && weather[value] && weather[value].description !== undefined){
         if ((acts[i].weather == (weather[value]).description) && (acts[i].time).includes(time) && acts[i].category == title){
           filteredActs.push(acts[i]);
        }
       }
     }
      
       let midPoint = Math.floor((filteredActs.length-1)/ 2);
       let x = Math.floor(Math.random() * (midPoint+1));
       let y = Math.floor(Math.random() * (filteredActs.length - midPoint - 1) + midPoint + 1); 
      
       if (filteredActs.length > 1) { 
         setActivity1(filteredActs[x]);
         setActivity2(filteredActs[y]);
       }
 
       else if(filteredActs.length == 1){
         setActivity1(filteredActs[0]);
         setActivity2('');
       }
       else {
         setActivity1('');
         setActivity2('');
       }
     }
    


  }, [time, value]);

  return (
    <View style={styles.background}>    
       <Text style={{ color: '#5C4033', fontSize: 20, fontWeight:'bold'}}> Category: {(title)}</Text>
       <Text style={{ color: '#5C4033', fontSize: 17, paddingBottom: 20}}> Time: {(time)}</Text>
       

  
   <ScrollView horizontal={true} paddingTop='16'>

      {(weather !== null) ? 
        <View style={styles.grid_row}>
            {weather.map((obj, index) => (
              <View style={styles.grid_col} key={index}> 
    
                  <Text style={{ color: 'white', fontSize: 16}}> {obj.time || 'N/A'} </Text>
                  {obj.image} 
                  <Text style={{ color: 'white', fontSize: 16}}> {obj.description || 'N/A'} </Text>
                  <Text style={{ color: 'white', fontSize: 23}}> {`${obj.temp.split('.')[0]} F` || 'N/A'} </Text>
                  </View>
                   ))}
           </View>
            : null }
      </ScrollView>
     
      <View style = {styles.dropDown}>
      <DropDownPicker style={[styles.dropDown, {}]} items={hour} open={open} 
      value={value} setOpen={setOpen} setValue={setValue} onChange={item => {setValue(item.value)}}
        setItems={setHour} dropDownContainerStyle={[styles.label, {flexDirection: 'row'}]} placeholder="Select time">
      </DropDownPicker>
     </View>
     <View>
     <View style={styles.row}>
        <Text style={[styles.row, styles.text, {color:'#5C4033'}]}>
          Suggestion 1: {activity1?.name ? (activity1.name) : 'N/A'}!{"\n"}
          Address: {activity1?.addy ? (activity1.addy): 'N/A'}
          </Text>
        <Button title="Like" onPress={() => storeActivities(activity1)} color="#5C4033" />
      </View>
      <View style={styles.row}>
      <Text style={[styles.row, styles.text, {color:'#5C4033'}]}>
          Suggestion 2: {activity2?.name ? (activity2.name) : 'N/A'}!{"\n"}
           Address: {activity2?.addy ? (activity2.addy): 'N/A'}
          </Text>
        <Button title="Like" onPress={() => storeActivities(activity2)} color="#5C4033"/>
      </View>
    </View>
    </View>
  );
}  

const styles = StyleSheet.create({
  background: {
    paddingTop: 30,
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
    width: 300,
    backgroundColor: '#FFD996', 
    borderColor: '#6D803C'  
  }, 

  dropDownContainer: {
    width: 40
  }, 
  
  label: {
    backgroundColor: '#FFD996',
  },
  row: { 
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 10, 
    flexWrap: 'nowrap',
    justifyContent: 'space-center'
  },
  col: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 13, 
    flexWrap: 'nowrap', 
  }, 
  grid_row: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-around'
  },
  grid_col: {
    flexDirection: 'column', 
    alignItems: 'center',
    marginRight: 15, 
  
  }, 
  text: {
    paddingTop: 25,
    color: 'white',
    maxWidth: '70%',
    fontSize: 20,
    marginRight: 10, 
  }

});
