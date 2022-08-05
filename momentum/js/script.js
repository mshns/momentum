// time and greeting

function showTime() {
  const time = document.querySelector('.time');
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);

  const showDate = document.querySelector('.date');
  const options = {month: 'long', day: 'numeric', weekday: 'long'};
  const currentDate = date.toLocaleDateString('en-En', options);
  showDate.textContent = currentDate;

  function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    switch (Math.trunc(hours / 6)) {
      case 3: return 'evening';
        break;
      case 2: return 'afternoon';
        break;
      case 1: return 'morning';
        break;
      case 0: return 'night';
    }
  }
  const greeting = document.querySelector('.greeting');
  const timeOfDay = getTimeOfDay();
  greeting.textContent = `Good ${timeOfDay},`;
}

showTime();

// enter name

const yourName = document.querySelector('.name');
function setLocalStorage() {
  localStorage.setItem('name', yourName.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    yourName.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);


// slider bg images

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  switch (Math.trunc(hours / 6)) {
    case 3: return 'evening';
      break;
    case 2: return 'afternoon';
      break;
    case 1: return 'morning';
      break;
    case 0: return 'night';
  }
}

function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
let randomNum = getRandomNum(1, 20);

function setBg() {
  const timeOfDay = getTimeOfDay();  
  const bgNum = String(randomNum).padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/mshns/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  }; 
}

setBg();

const arrowPrev = document.querySelector('.slide-prev');
const arrowNext = document.querySelector('.slide-next');

arrowPrev.addEventListener('click', function getSlidePrev() {
  if (randomNum === 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBg();
});

arrowNext.addEventListener('click', function getSlideNext() {
  if (randomNum === 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBg();
});

// weather

const city = document.querySelector('.city');
city.value = 'Minsk';

function setLocalStorageCity() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageCity)

function getLocalStorageCity() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    getWeather();
  }
}
window.addEventListener('load', getLocalStorageCity)

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
async function getWeather() {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=31df4aedff183fc292facbbf30cdb742&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === 200) {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
  } else if (city.value === '') {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = 'Please enter your city to check the weather 🙂';
    weatherDescription.textContent = undefined;
    wind.textContent = undefined;
    humidity.textContent = undefined;
  } else {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = `Error! The weather in "${city.value}" is unknown 😐`;
    weatherDescription.textContent = undefined;
    wind.textContent = undefined;
    humidity.textContent = undefined;
  }
}
getWeather();

city.addEventListener('change', function () {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=31df4aedff183fc292facbbf30cdb742&units=metric`;
  getWeather();
});

// quotes

const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');

let quoteNum = getRandomNum(1, 95);

async function getQuotes() {  
  const quotes = 'json/quotes.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  quoteText.textContent = data[quoteNum].quote;
  quoteAuthor.textContent = data[quoteNum].author;
}
getQuotes();

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', function() {
  let quoteNext = quoteNum;
  while (quoteNext === quoteNum) {
    quoteNext = getRandomNum(1, 95);
  }
  quoteNum = quoteNext;
  getQuotes();
});