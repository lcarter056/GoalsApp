

const activities = [
        {
          "activity_name": "Olmos Park",
          "activity_category": "Exercise",
          "weather_condition": "Clear Skies",
          "time": ["Morning"],
          "distance_campus": "1.2", // distance from campus is miles 
          "address": "651 Devine Rd. San Antonio, TX 78212"
        },
        {
          "activity_name": "Trinity Bell Center",
          "activity_category": "Exercise",
          "weather_condition": "Windy",
          "time": ["Morning"],
          "distance_campus": "0",
          "address": "One Trinity Place, San Antonio, Texas 78212"
        },
        {
          "activity_name": "Youtube Workout Channel's: 'Rowan Row' or 'MadFit'",
          "activity_category": "Exercise",
          "weather_condition": "Rainy",
          "time": ["Afternoon", "Evening"],
          "distance_campus": "0",
          "address": ""
        },
        
        {
          "activity_name": "L&L Hawaiian BBQ",
          "activity_category": "Restaurant",
          "weather_condition": "Clear Skies",
          "time": ["Afternoon"],
          "distance_campus": "4.1",
          "address": "1302 Austin Highway San Antonio, TX 78209"
        },
        {
          "activity_name": "Aroy Ver Food Truck",
          "activity_category": "Restaurant",
          "weather_condition": "Clear Skies",
          "time": ["Afternoon"],
          "distance_campus": "1.6",
          "address": "2202 broadway San Antonio, TX 78215"
        },
        {
          "activity_name": "Postino South Broadway",
          "activity_category": "Restaurant",
          "weather_condition": "Windy",
          "time": ["Afternoon"],
          "distance_campus": "1.8",
          "address": "2600 Broadway Ave San Antonio, TX 78215"
        },
        {
          "activity_name": "Hot Dogs Los Guanajuatenses",
          "activity_category": "Restaurant",
          "weather_condition": "Rainy",
          "time": ["Morning", "Afternoon"],
          "distance_campus": "",
          "address": "4319 Blanco Rd San Antonio, TX 78212 "
        },
        {
          "activity_name": "Picnic at Confluence park",
          "activity_category": "Hang Out",
          "weather_condition": "Clear Skies",
          "time": ["Morning", "Afternoon"],
          "distance_campus": "7.0",
          "address": "310 W Mitchell St, San Antonio, TX 78204-2312"
        },
        {
          "activity_name": "Club 727",
          "activity_category": "Hang Out",
          "weather_condition": "Clear Skies",
          "time": ["Evening"],
          "distance_campus": "1.8",
          "address": "1812 N Main Ave, San Antonio, TX 78212"
        },
         {
          "activity_name": "1 Watson Rooftop Bar",
          "activity_category": "Hang Out",
          "weather_condition": "Clear Skies",
          "time": ["Evening"],
          "distance_campus": "3.6",
          "address": "111 Soledad St, San Antonio, TX 78205"
        },
        {
          "activity_name": "Shops at La Cantera",
          "activity_category": "Hang Out",
          "weather_condition": "Clear Skies",
          "time": ["Morning", "Afternoon"],
          "distance_campus": "13.9",
          "address": "15900 La Cantera Pkwy, Suite 6698, San Antonio, TX 78256"
        },
        {
          "activity_name": "Six Flags Fiesta",
          "activity_category": "Hang Out",
          "weather_condition": "Windy",
          "time": ["Morning", "Afternoon"],
          "distance_campus": "13.9",
          "address": "17000 W I-10, San Antonio, TX 78257"
        },
        {
          "activity_name": "Slab Cinema Outdoor Movies",
          "activity_category": "Hang Out",
          "weather_condition": "Clear Skies",
          "time": ["Evening"],
          "distance_campus": "5.4",
          "address": "134 Blue Star, San Antonio, TX 78204"
        },
        {
          "activity_name": "Indoor Game Night",
          "activity_category": "Hang Out",
          "weather_condition": "Rainy",
          "time": ["Evening"],
          "distance_campus": "0",
          "address": ""

        },
        {
          "activity_name": "Nekter Juice Bar",
          "activity_category": "Hang Out",
          "weather_condition": "Windy",
          "time": ["Morning"],
          "distance_campus": "2.6",
          "address": "5920 Broadway Street, San Antonio, TX 78209"      
        },
        {
          "activity_name": "Japanese Tea Garden",
          "activity_category": "Hang Out",
          "weather_condition": "Clear Skies",
          "time": ["Morning", "Afternoon"],
          "distance_campus": "0.6",
          "address": "3853 N St Mary's St, San Antonio, TX 78212"
        },
        {
          "activity_name": "Pinstack bowling",
          "activity_category": "Hang Out",
          "weather_condition": "Windy",
          "time": ["Afternoon", "Evening"],
          "distance_campus": "6.9",
          "address": "742 Northwest Loop 410 Suite 201, San Antonio, TX 78216"
        },
        {
          "activity_name": "Pegasus Night club",
          "activity_category": "Hang Out",
          "weather_condition": "Clear Skies",
          "time": ["Evening"],
          "distance_campus": "1.7",
          "address": "1402 N Main Ave, San Antonio, TX 78212"
        },
        {
          "activity_name": "Indoor Movie night",
          "activity_category": "Hang Out",
          "weather_condition": "Rainy",
          "time": ["Evening"],
          "distance_campus": "0",
          "address": ""
        },
        {
          "activity_name": "CommonWealth Coffeehouse",
          "activity_category": "Study Spot",
          "weather_condition": "Clear Skies",
          "time": ["Morning"],
          "distance_campus": "1.6",
          "address": "118 Davis Ct, San Antonio, TX 78209"
        },
        {
          "activity_name": "Landa Library",
          "activity_category": "Study Spot",
          "weather_condition": "Windy",
          "time": ["Morning"],
          "distance_campus": "0.3",
          "address": ""
        },
        {
          "activity_name": "Flower in Flour Bakery",
          "activity_category": "Study Spot",
          "weather_condition": "Windy",
          "time": ["Morning", "Afternoon"],
          "distance_campus": "10.8",
          "address": "6915 Bandera Rd #104, San Antonio, TX 78238"
        },
        {
          "activity_name": "Rise up Acai Bowls",
          "activity_category": "Study Spot",
          "weather_condition": "Rainy",
          "time": ["Morning", "Afternoon"],
          "distance_campus": "1.6",
          "address": "2520 McCullough Ave, San Antonio, TX 78212"
        },
        {
          "activity_name": "The Art of Donut",
          "activity_category": "Study Spot",
          "weather_condition": "Clear Skies",
          "time": ["Morning"],
          "distance_campus": "1.0",
          "address": "3428 N St Mary's St, San Antonio, TX 78212"
        },
        {
          "activity_name": "Summer Moon Coffee",
          "activity_category": "Study Spot",
          "weather_condition": "Rainy",
          "time": ["Morning"],
          "distance_campus": "0.6",
          "address": "3233 N St Mary's St #102, San Antonio, TX 78212"
        },
        {
          "activity_name": "Indoor Baking night",
          "activity_category": "Hang out",
          "weather_condition": "Rainy",
          "time": ["Afternoon", "Evening"],
          "distance_campus": "0",
          "address": ""
        },
        {
          "activity_name": "San Antonio museum of art",
          "activity_category": "Hang out",
          "weather_condition": "Rainy",
          "time": ["Morning"],
          "distance_campus": "1.8",
          "address": "200 W Jones Ave, San Antonio, TX 78215"
        },
        {
          "activity_name": "San Antonio Public Library (Central Library)",
          "activity_category": "Study Spot",
          "weather_condition": "Rainy",
          "time": ["Morning", "Afternoon"],
          "distance_campus": "2.4",
          "address": "3428 N St Mary's St, San Antonio, TX 78212"
        }
  
      ];
      



export default activities;
