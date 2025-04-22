

let favActivities = [];
class Activity {
    constructor(name, category, weather, time, distance, addy){
        this.name = name;
        this.category = category;
        this.weather = weather;
        this.time = time;
        this.distance = distance;
        this.addy = addy;
    }

    favActivity(activity){
    favActivities.push(activity);
    }

}

export { Activity };