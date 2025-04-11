import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


export default function ActivitiesPage() {

  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [time, setTime] = useState([{label: 'Morning', value: 'Morning'},
    {label: 'Afternoon', value: 'Afternoon'},
    {label: 'Evening', value: 'Evening'}
  ]);

//GPS fix: 4-6 okay, <4 good, >9
  const loadPage = (page) => {
    navigation.navigate(`Activity` , {title : page, time : value});
  }

  return (
    <View>
      <Text>Activities Page</Text>

      <DropDownPicker items={time} open={open} 
      value={value} setOpen={setOpen} setValue={setValue} onChange={item => {setValue(item.value)}}
        setItems={setTime} placeholder="Select time"
      >
      </DropDownPicker>
      <Button title="Exercise" onPress={() => loadPage('Exercise')}>  </Button>
      <Button title="Restaurant" onPress={() => loadPage('Restaurant')}>  </Button>
      <Button title="Hang Out" onPress={() => loadPage('Hang Out')}>  </Button>
      <Button title="Study Spot" onPress={() => loadPage('Study Spot')}>  </Button>
      
     

    </View>
  );
}  