import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from 'react-native';
import fetchWeather from "../api/weather";


export default function ActivitiesPage() {
  const [weather, setWeather] = useState(null);
  const navigation = useNavigation();

//temporary san antonio coordinates 
  const lat = 29.42;
  const long = -98.49;
  var startDate = "2025-04-04";
  var endDate = "2025-04-04";
  const timeZone = "America/Denver";

  const getDate = () => {
     startDate = new Date().toISOString().slice(0,10);
     endDate = new Date().toISOString().slice(0,10);
  }

  const loadPage = () => {
    navigation.navigate(`Activity`);
  }

  useEffect(() => {
    const getWeather = async () => {
      getDate();
      const data = await fetchWeather(lat, long, startDate, endDate, timeZone);
      setWeather(data);
    };

    getWeather(); 
  }, []);


  return (
    <View>
      <Text>Activities Page</Text>

      <Button title="Exercise" onPress={loadPage}>  </Button>
      <Button title="Restaurant" onPress={console.log("HEF")}>  </Button>
      <Button title="Hang Out">  </Button>
      <Button title="Study Spot">  </Button>

    </View>
  );
}  