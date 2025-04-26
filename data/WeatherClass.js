

import { Image } from 'react-native';

class Weather {
    constructor(weatherTag, weatherCode){
        this.tag = weatherTag;
        this.code = weatherCode;
    }

    getCode(){
        if (this.weatherTag == 'Clear Skies'){
           return (
            <Image source = {require('./path')}
            />
           )
        }
        else if (this.weatherTag == 'Rainy'){
            return (
                <Image source = {require('./path')}
                />
               )
        }
        else if (this.weatherTag == 'Windy'){
            return (
                <Image source = {require('./path')}
                />
               )

        } else {
            //still have weather tags to contribute
        }
    }

}

export { Weather };