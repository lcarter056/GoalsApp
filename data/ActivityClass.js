

let favActivities = [];
class Activity {
    constructor(name, category, weather, time, distance){
        this.name = name;
        this.category = category;
        this.weather = weather;
        this.time = time;
        this.distance = distance;
    }

    favActivity(activity){
    favActivities.push(activity);
    }

}

export { Activity };