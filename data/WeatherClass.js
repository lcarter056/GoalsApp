

import { Image } from 'react-native';

  function getImage(weatherTag, time){
 
   if(weatherTag == 'Thunderstorm'){
    return (
        <Image style={{ width: 60, height: 60}} source = {require('./clearDay.png')}
        />
       )
   }
   else if (weatherTag == 'Snow') {
    return (
        <Image style={{ width: 60, height: 60}} source = {require('./clearDay.png')}
        />
       )
   }
   
  else if (time == 'Morning' || time == 'Afternoon'){
        if (weatherTag == 'Clear Skies'){
           return (
            <Image style={{ width: 60, height: 60}} source = {require('./clearDay.png')}
            />
           )
        }
        else if (weatherTag == 'Rainy'){
            return (
                <Image style={{ width: 60, height: 60}} source = {require('./rainDay.png')}
                />
               )
        }
        else {
            return (
                <Image style={{ width: 60, height: 60}} source = {require('./windDay.png')}
                />
               )
         } 
    }

       else {
        if (weatherTag == 'Clear Skies'){
            return (
             <Image style={{ width: 60, height: 60}} source = {require('./clearNight.png')}
             />
            )
         }
         else if (weatherTag == 'Rainy'){
             return (
                 <Image style={{ width: 60, height: 60}} source = {require('./nightRain.png')}
                 />
                )
         }
         else {
             return (
                 <Image style={{ width: 60, height: 60}} source = {require('./windNight.png')}
                 />
                )
          } 
       }

     }
 


export { getImage };