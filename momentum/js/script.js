// time and greeting

const time = document.querySelector('.time');
const showDate = document.querySelector('.date');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);

  const options = {month: 'long', day: 'numeric', weekday: 'long'};
  const currentDate = date.toLocaleDateString('en-En', options);
  showDate.textContent = currentDate;

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

const imgSourceSelect = document.getElementById('img-source');
imgSourceSelect.addEventListener('change', function() {
  setBg()
});

const img = new Image();
const timeOfDay = getTimeOfDay();

const imgTag = document.getElementById('img-tag');
imgTag.addEventListener('change', function() {
  setBg()
});

function setBg() {   
  const bgNum = String(randomNum).padStart(2, '0');

  if (imgSourceSelect.value === 'github') {
    img.src = `https://raw.githubusercontent.com/mshns/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  } else if (imgSourceSelect.value === 'unsplash') {
    getLinkFromUnsplash();
  } else {
    getLinkFromFlickr();
  }
    img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  }; 
}
setBg();

async function getLinkFromUnsplash() {
  if (imgTag.value.length === 0) {
    url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=7wwh-fH0gsmQEomAN8GmRIpI35T1KRvY3MK2N72vuwM`;
  } else {
    url = `https://api.unsplash.com/photos/random?query=${imgTag.value}&client_id=7wwh-fH0gsmQEomAN8GmRIpI35T1KRvY3MK2N72vuwM`;
  }  
  const res = await fetch(url);
  const data = await res.json();
  img.src = await data.urls.regular;
}

 async function getLinkFromFlickr() {
  if (imgTag.value.length === 0) {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4cfde6c942ca8c9fc4243134ccd13223&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
  } else {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4cfde6c942ca8c9fc4243134ccd13223&tags=${imgTag.value}&extras=url_l&format=json&nojsoncallback=1`;
  }
  const res = await fetch(url);
  const data = await res.json();
  const randomNum = Math.floor(Math.random() * data.photos.photo.length);
  img.src = await data.photos.photo[randomNum].url_l;
}

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
let url;
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
const weatherError = document.querySelector('.weather-error');
async function getWeather() {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=31df4aedff183fc292facbbf30cdb742&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === 200) {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherError.textContent = undefined;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
  } else if (city.value === '') {
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = 'Please enter your city to check the weather 🙂';
    temperature.textContent = undefined;
    weatherDescription.textContent = undefined;
    wind.textContent = undefined;
    humidity.textContent = undefined;
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = `Error! The weather in "${city.value}" is unknown 😐`;
    temperature.textContent = undefined;
    weatherDescription.textContent = undefined;
    wind.textContent = undefined;
    humidity.textContent = undefined;
  }
}
getWeather();

city.addEventListener('change', function () {
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

// audio player

import playList from './playList.js';
const playListContainer = document.querySelector('.play-list');
playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = `${el.title} / ${el.duration}`;
  playListContainer.append(li);
});

const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const musicTrack = playListContainer.childNodes;
const currentTrackTitle = document.querySelector('.current-track-title');

let playNum = 0;
currentTrackTitle.textContent = playList[playNum].title;
let isPlay = false;
const audio = new Audio();

function playAudio() {
  audio.src = playList[playNum].src;
  play.classList.toggle('pause');
  musicTrack[playNum].classList.toggle('item-active');
  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    currentTrackTitle.textContent = playList[playNum].title;
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
}
play.addEventListener('click', playAudio);

playPrev.addEventListener('click', function() {
  musicTrack[playNum].classList.remove('item-active');
  playNum === 0 ? playNum = playList.length - 1 : playNum--;
  isPlay = false;
  play.classList.remove('pause');
  playAudio();
});

function nextTrack() {
  musicTrack[playNum].classList.remove('item-active');
  playNum === playList.length - 1 ? playNum = 0 : playNum++;
  isPlay = false;
  play.classList.remove('pause');
  playAudio();
}

playNext.addEventListener('click', nextTrack);

musicTrack.forEach((el, index) => {
  el.addEventListener('click', function() {
    if (playNum === index && isPlay === true) {
      isPlay = true;
    } else {
      isPlay = false;
      play.classList.remove('pause');
      musicTrack[playNum].classList.remove('item-active');
    }
    playNum = index;
    playAudio();
  })
});

const currentTrackProgress = document.querySelector('.current-track-progress');
const currentTrackTime = document.querySelector('.current-track-time');

function TrackProgress() {
  currentTrackProgress.style.width = (Math.floor(audio.currentTime) * 100) / Math.floor(audio.duration) + '%';
  currentTrackTime.textContent = `${String(Math.floor(audio.currentTime / 60))}:${String(Math.floor(audio.currentTime % 60)).padStart(2, '0')} / ${playList[playNum].duration}`;
  if (currentTrackProgress.style.width === '100%') {
    currentTrackProgress.style.width = 0;
    nextTrack();
  }
}
setInterval (TrackProgress, 1000);

const currentTrackScale = document.querySelector('.current-track-scale');

currentTrackScale.addEventListener('click', function(currentDuration) {
  audio.currentTime = currentDuration.offsetX / parseInt(window.getComputedStyle(currentTrackScale).width) * audio.duration;  
})

audio.volume = .5;
const volumeBtn = document.querySelector('.volume-icon');
const volumeBar = document.querySelector('.volume-bar');
const volumeProgress = document.querySelector('.volume-progress');

volumeBtn.addEventListener('click', function() {
  if (audio.muted === false) {
    audio.muted = true;
    volumeProgress.style.width = 0;
  } else {
    audio.muted = false;
    volumeProgress.style.width = audio.volume * 100 + '%';
  }
  volumeBtn.classList.toggle('volume-icon-on');
});

volumeBar.addEventListener('click', function(changeVolume) {
  audio.muted = false;
  audio.volume = changeVolume.offsetX / parseInt(window.getComputedStyle(volumeBar).width);
  volumeProgress.style.width = audio.volume * 100 + '%';
  if (volumeBtn.classList.contains('volume-icon-on')) {
    volumeBtn.classList.remove('volume-icon-on');
  }
});

// translate

const langSelect = document.getElementById('language-select');

// settings

const settingsBtn = document.querySelector('.settings-button');
const settingsContainer = document.querySelector('.settings-container');

settingsBtn.addEventListener('click', function() {
  settingsContainer.classList.toggle('active');
});

const checkboxTime = document.getElementById('checkbox-time');
const checkboxDate = document.getElementById('checkbox-date');
const checkboxGreeting = document.getElementById('checkbox-greeting');
const checkboxWeather = document.getElementById('checkbox-weather');
const checkboxPlayer = document.getElementById('checkbox-player');
const checkboxQuote = document.getElementById('checkbox-quote');
const checkboxTodo = document.getElementById('checkbox-todo');

const greetingContainer = document.querySelector('.greeting-container');
const weatherContainer = document.querySelector('.weather');
const audioPlayer = document.querySelector('.player');
const quotesContainer = document.querySelector('.quotes');

checkboxTime.addEventListener('change', function() {
  checkboxTime.checked ? time.style.opacity = '1' : time.style.opacity = '0';
});
checkboxDate.addEventListener('change', function() {
  checkboxDate.checked ? showDate.style.opacity = '1' : showDate.style.opacity = '0';
});
checkboxGreeting.addEventListener('change', function() {
  checkboxGreeting.checked ? greetingContainer.style.opacity = '1' : greetingContainer.style.opacity = '0';
});
checkboxWeather.addEventListener('change', function() {
  checkboxWeather.checked ? weatherContainer.style.opacity = '1' : weatherContainer.style.opacity = '0';
});
checkboxPlayer.addEventListener('change', function() {
  checkboxPlayer.checked ? audioPlayer.style.opacity = '1' : audioPlayer.style.opacity = '0';
});
checkboxQuote.addEventListener('change', function() {
  checkboxQuote.checked ? quotesContainer.style.opacity = '1' : quotesContainer.style.opacity = '0';
});
checkboxTodo.addEventListener('change', function() {
  if (checkboxTodo.checked) {
    todoBtn.style.opacity = '1';
    todoContainer.style.opacity = '1';
  } else {
    todoBtn.style.opacity = '0';
    todoContainer.style.opacity = '0';
  }
});

// todo list

const todoBtn = document.querySelector('.todo-button');
const todoContainer = document.querySelector('.todolist-container');

todoBtn.addEventListener('click', function() {
  todoContainer.classList.toggle('active');
});

const arrTodoItems = [];
const newTodo = document.querySelector('.todo-new');
const listTodo = document.querySelector('.todo-list');

newTodo.addEventListener('change', function() {
  arrTodoItems.push(newTodo.value);
  const li = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');

  input.type = 'checkbox';
  input.id = newTodo.value;

  label.classList.add('todo-item-label');
  label.innerHTML = newTodo.value;
  label.htmlFor = newTodo.value;

  li.append(input)
  li.append(label)
  listTodo.append(li);
});