

import { Image } from 'react-native';

  function getImage(weatherTag, time){
 
   if(weatherTag == 'Thunderstorm'){
    return (
        <Image style={{ width: 75, height: 75}} source = {require('./clearDay.png')}
        />
       )
   }
   else if (weatherTag == 'Snow') {
    return (
        <Image style={{ width: 75, height: 75}} source = {require('./clearDay.png')}
        />
       )
   }
   
  else if (time == 'Morning' || time == 'Afternoon'){
        if (weatherTag == 'Clear Skies'){
           return (
            <Image style={{ width: 75, height: 75}} source = {require('./clearDay.png')}
            />
           )
        }
        else if (weatherTag == 'Rainy'){
            return (
                <Image source = {require('./rainDay.png')}
                />
               )
        }
        else {
            return (
                <Image source = {require('./windDay.png')}
                />
               )
         } 
    }

       else {
        if (weatherTag == 'Clear Skies'){
            return (
             <Image style={{ width: 75, height: 75}} source = {require('./clearNight.png')}
             />
            )
         }
         else if (weatherTag == 'Rainy'){
             return (
                 <Image source = {require('./nightRain.png')}
                 />
                )
         }
         else {
             return (
                 <Image source = {require('./windNight.png')}
                 />
                )
          } 
       }

     }
 


export { getImage };