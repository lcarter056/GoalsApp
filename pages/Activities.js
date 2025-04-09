import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from 'react-native';


export default function ActivitiesPage() {
  const [weather, setWeather] = useState(null);
  const navigation = useNavigation();

//GPS fix: 4-6 okay, <4 good, >9
  const loadPage = () => {
    navigation.navigate(`Activity`);
  }


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