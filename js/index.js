var search = document.querySelector("input.search-inp");

var request = new XMLHttpRequest(); 
request.open("GET" , "https://api.weatherapi.com/v1/forecast.json?key=c4a47a36c42c4ac0a1f203403241210&q=cairo&days=3");
request.responseType = "json";
request.send();
var response;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var firstTomorrowCard = document.querySelector("div.card-2");
var todayCard = firstTomorrowCard.previousElementSibling;
var secondTomorrowCard = firstTomorrowCard.nextElementSibling;


request.addEventListener("load" , function(){
    response = request.response;
    setCurrentWeather();
    setForeCast(firstTomorrowCard , 1);
    setForeCast(secondTomorrowCard , 2);
});

function setCurrentWeather(){
    var temp = todayCard.querySelector("div.card-content h1");
    temp.innerHTML = response["current"]["temp_c"] + `<sup>o</sup>C`;
    var city = todayCard.querySelector("div.card-content h4");
    city.innerHTML = response["location"]["name"];
    var date = new Date(response["location"]["localtime"]);
    var day = todayCard.querySelector("header").firstElementChild;
    day.innerHTML = days[date.getDay()];
    var dayInfo = day.nextElementSibling;
    dayInfo.innerHTML = date.getDate() + " " + months[date.getMonth()];
    var icon = todayCard.querySelector("div.card-content div img");
    icon.src = "https:"+ response["current"]["condition"]["icon"];
    todayCard.querySelector("div.card-content h5").innerHTML = response["current"]["condition"]["text"];

}
function setForeCast(card , dayIndex){
    var day = card.querySelector("header p");
    var date = new Date(response["forecast"]["forecastday"][dayIndex]["date"]);
    day.innerHTML = days[date.getDay()];
    var maxTem = card.querySelector("div.card-content h3");
    maxTem.innerHTML = response["forecast"]["forecastday"][dayIndex]["day"]["maxtemp_c"] + `<sup>o</sup>C`;
    var minTemp = card.querySelector("div.card-content p");
    minTemp.innerHTML = response["forecast"]["forecastday"][dayIndex]["day"]["mintemp_c"] + `<sup>o</sup>C`;
    var icon = card.querySelector("div.card-content img");
    icon.src = "https:" + response["forecast"]["forecastday"][dayIndex]["day"]["condition"]["icon"];
    card.querySelector("div.card-content h5").innerHTML = response["forecast"]["forecastday"][dayIndex]["day"]["condition"]["text"];
}
search.addEventListener("input" , function(){
    var searchRequest = new XMLHttpRequest();
    searchRequest.open("GET" , `https://api.weatherapi.com/v1/forecast.json?key=c4a47a36c42c4ac0a1f203403241210&q=${search.value}&days=3`);
    searchRequest.responseType = "json";
    searchRequest.send();
    searchRequest.addEventListener("load" , function(){
        if(searchRequest.status == 200)
            {
                response = searchRequest.response;
                setCurrentWeather();
                setForeCast(firstTomorrowCard , 1);
                setForeCast(secondTomorrowCard , 2);
            }
    });
    
})