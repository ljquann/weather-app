let now=new Date();
function currentDayAndTime(date){
let days=["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
let day=days[now.getDay()];
let hour=now.getHours();
  if (hour <10){
    hour=`0${hour}`;
  }
let minute=now.getMinutes();
  if (minute<10){
    minute=`0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}
let dayAndTime=document.querySelector("#dayandtime");
dayAndTime.innerHTML=currentDayAndTime(now);

let cityPlaceholder = document.querySelector("#chosencity");
  let apiKey=`2ab0b590fd9866ef804df5849d5ef74a`;
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityPlaceholder.innerHTML}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather) ; 

function changeCity(event) {
  event.preventDefault();
  let cityPlaceholder = `${cityInput.value}`;
  let apiKey=`2ab0b590fd9866ef804df5849d5ef74a`;
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityPlaceholder}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather) ; 
}
let citySubmit = document.querySelector("#cityButton");
citySubmit = addEventListener("submit", changeCity);
let cityInput = document.querySelector("#cityform");


function showWeather(response){
  console.log(response);
  cityPlaceholder.innerHTML= response.data.name;
  document.querySelector("#hi").innerHTML=  `${Math.round(response.data.main.temp_max)}°F`;
  document.querySelector("#lo").innerHTML=`${Math.round(response.data.main.temp_min)}°F`;
  document.querySelector("#weatherd").innerHTML=`${response.data.weather[0].description}`;
  document.querySelector("#windspeed").innerHTML=`${Math.round(response.data.wind.speed)} mph`;
  document.querySelector("#humidity").innerHTML=`${Math.round(response.data.main.humidity)}`;
}
function metricUnit(event){
  event.preventDefault();
  let apiKey=`2ab0b590fd9866ef804df5849d5ef74a`;
  let metricUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityPlaceholder.innerHTML}&units=metric&appid=${apiKey}`;
  axios.get(metricUrl).then(changeUnitToC) ; 
}
function changeUnitToC(response){
document.querySelector("#hi").innerHTML= `${Math.round(response.data.main.temp_max)}°C`;
 document.querySelector("#lo").innerHTML=`${Math.round(response.data.main.temp_min)}°C`;
}
let changeMetricUnit= document.querySelector("#celsiusbutton");
changeMetricUnit.addEventListener("click", metricUnit);

function impUnit(event){
  event.preventDefault();
  let apiKey=`2ab0b590fd9866ef804df5849d5ef74a`;
  let impUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityPlaceholder.innerHTML}&units=imperial&appid=${apiKey}`;
  axios.get(impUrl).then(changeUnitToF) ; 
}
function changeUnitToF(response){
  document.querySelector("#hi").innerHTML= `${Math.round(response.data.main.temp_max)}°F`;
  document.querySelector("#lo").innerHTML=`${Math.round(response.data.main.temp_min)}°F`;
}
let changeImpUnit= document.querySelector("#farenheitbutton");
changeImpUnit.addEventListener("click", impUnit);

function changeToGeolocation(position){
  console.log (position);
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  let apiKey="2ab0b590fd9866ef804df5849d5ef74a";
  let geolocationUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(geolocationUrl).then(showWeather);   
}

function geoClick(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(changeToGeolocation);
}
let currentPosition=document.querySelector("#currentlocation");
currentPosition.addEventListener("click", geoClick);