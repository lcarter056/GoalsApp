import React, {useState, useEffect} from "react";
import { View, Text, Button } from 'react-native';
import fetchWeather from "../api/weather";
import { useNavigation } from "@react-navigation/native";


export default function ActivitiesPage() {
  const [weather, setWeather] = useState(null);
  

  
//temporary san antonio coordinates 
const lat = 29.42;
const long = -98.49;
var startDate = "2025-04-04";
var endDate = "2025-04-04";
const timeZone = "America/Denver";

const navigation = useNavigation();

  const getDate = () => {
    startDate = new Date().toISOString().slice(0,10);
    endDate = new Date().toISOString().slice(0,10);
 }

  // socket.io
  useEffect(() => {
    const getWeather = async () => {
      getDate();
      const data = await fetchWeather(lat, long, startDate, endDate, timeZone);
      setWeather(data[0]);
    };

    getWeather(); 
  }, []);

  return (
    <View>      
      <Text>Activity Page</Text>

      <Text>{JSON.stringify(weather)}</Text>

      
    </View>
  );
}  