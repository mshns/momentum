// time

const time = document.querySelector('.time');
const dateContainer = document.querySelector('.date');
const greeting = document.querySelector('.greeting');

let lang;
localStorage.getItem('lang') ? lang = localStorage.getItem('lang') : lang = 'en';

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000); 

  showDate(lang);
  showGreeting(lang);
}
showTime();

// greeting

function showGreeting(lang) {
  const date = new Date();
  const hours = date.getHours();
  const greetingTranslation =
  [
    {
      'en': 'Good night,',
      'ru': 'Доброй ночи,'},
    {
      'en': 'Good morning,',
      'ru': 'Доброе утро,'},
    {
      'en': 'Good afternoon,',
      'ru': 'Добрый день,'},
    {
      'en': 'Good evening,',
      'ru': 'Добрый вечер,'}
  ]
  greeting.textContent = greetingTranslation[Math.trunc(hours / 6)][lang];
}

// date

function showDate(lang) {
  const date = new Date();
  const options = {month: 'long', day: 'numeric', weekday: 'long'};
  const currentDate = date.toLocaleDateString(lang, options);
  dateContainer.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
}

// enter name

const yourName = document.querySelector('.name');

function setLocalStorageName() {
  localStorage.setItem('name', yourName.value);
}
window.addEventListener('beforeunload', setLocalStorageName);

function getLocalStorageName() {
  if (localStorage.getItem('name')) {
    yourName.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorageName);

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

const img = new Image();
const timeOfDay = getTimeOfDay();

function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
let randomNum = getRandomNum(1, 20);

const imgSourceSelect = document.getElementById('img-source');
const imgTag = document.getElementById('img-tag');


function getLocalStorageImg() {
  if (localStorage.getItem('imgSource')) {
    imgSourceSelect.value = localStorage.getItem('imgSource');
  }
  if (localStorage.getItem('imgTag')) {
    imgTag.value = localStorage.getItem('imgTag');
  }
};

window.addEventListener('load', function() {
  getLocalStorageImg();
});

imgSourceSelect.addEventListener('change', function() {
  setBg()
  localStorage.setItem('imgSource', imgSourceSelect.value);
});

imgTag.addEventListener('change', function() {
  setBg()
  localStorage.setItem('imgTag', imgTag.value);
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
lang === 'en' ? city.value = 'Minsk' : city.value = 'Минск';

function setLocalStorageCity() {
  localStorage.setItem('city', city.value);
}
city.addEventListener('change', setLocalStorageCity)

function getLocalStorageCity() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    getWeather(lang);
  }
}
window.addEventListener('load', getLocalStorageCity);

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

const weatherTranslation =
  [
    {
      'en': 'Wind speed',
      'ru': 'Скорость ветра'},
    {
      'en': 'm/s',
      'ru': 'м/с'},
    {
      'en': 'Humidity',
      'ru': 'Влажность'},
    {
      'en': 'Please enter your city to check the weather 🙂',
      'ru': 'Введите свой город, чтобы узнать погоду 🙂'},
    {
      'en': 'Error! The weather in ',
      'ru': 'Ошибка! Погода в городе "'},
    {
      'en': '" is unknown 😐',
      'ru': '" неизвестна 😐'}
  ]

async function getWeather(lang) {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=31df4aedff183fc292facbbf30cdb742&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === 200) {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherError.textContent = undefined;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = weatherTranslation[0][lang] + ': ' + Math.round(data.wind.speed) + ' ' + weatherTranslation[1][lang];
    humidity.textContent = weatherTranslation[2][lang] + ': ' + Math.round(data.main.humidity) + '%';
  } else if (city.value === '') {
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = weatherTranslation[3][lang];
    temperature.textContent = undefined;
    weatherDescription.textContent = undefined;
    wind.textContent = undefined;
    humidity.textContent = undefined;
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = weatherTranslation[4][lang] + city.value + weatherTranslation[5][lang];
    temperature.textContent = undefined;
    weatherDescription.textContent = undefined;
    wind.textContent = undefined;
    humidity.textContent = undefined;
  }
}
getWeather(lang);

city.addEventListener('change', function () {
  getWeather(lang);
});

// quotes

const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');

let quoteNum = getRandomNum(0, 9);

async function getQuotes(lang) {  
  const quotes = 'json/quote.json';
  const res = await fetch(quotes);
  const data = await res.json();
  if (lang === 'en') {
    quoteText.textContent = data[quoteNum].enQuote;
    quoteAuthor.textContent = data[quoteNum].enAuthor;
  } else {
    quoteText.textContent = data[quoteNum].ruQuote;
    quoteAuthor.textContent = data[quoteNum].ruAuthor;
  }
}
getQuotes(lang);

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', function() {
  let quoteNext = quoteNum;
  while (quoteNext === quoteNum) {
    quoteNext = getRandomNum(0, 9);
  }
  quoteNum = quoteNext;
  getQuotes(lang);
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

let pauseTime = 0;

function playAudio() {
  play.classList.toggle('pause');
  musicTrack[playNum].classList.toggle('item-active');
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = pauseTime;
    audio.play();
    currentTrackTitle.textContent = playList[playNum].title;
    isPlay = true;
  } else {
    pauseTime = audio.currentTime;
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
  pauseTime = 0;
  playAudio();
});

function nextTrack() {
  musicTrack[playNum].classList.remove('item-active');
  playNum === playList.length - 1 ? playNum = 0 : playNum++;
  isPlay = false;
  play.classList.remove('pause');
  pauseTime = 0;
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
    if (playNum != index) {
      pauseTime = 0;
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

langSelect.addEventListener('change', function() {
  lang = langSelect.value;
  showTime(lang);
  if (lang === 'en') {
    localStorage.getItem('city') ? city.value = localStorage.getItem('city') : city.value = 'Minsk';
  } else {
    localStorage.getItem('city') ? city.value = localStorage.getItem('city') : city.value = 'Минск';
  }
  loadSettings(lang);
  getWeather(lang);
  getQuotes(lang);
  localStorage.setItem('lang', lang);
})

// settings

const settingsTranslation =
  [
    {
      'en': 'Settings',
      'ru': 'Настройки'},
    {
      'en': 'Language',
      'ru': 'Язык'},
    {
      'en': 'Photo Gallery',
      'ru': 'Фото галерея'},
    {
      'en': 'Image Source',
      'ru': 'Источник фото'},
    {
      'en': 'Image Tags',
      'ru': 'Тег фото'},
    {
      'en': 'Еnter tag for photo please',
      'ru': 'Введите тег для фото'},
    {
      'en': 'Widgets',
      'ru': 'Виджеты'},
    {
      'en': 'Time',
      'ru': 'Время'},
    {
      'en': 'Date',
      'ru': 'Дата'},
    {
      'en': 'Greeting',
      'ru': 'Приветствие'},
    {
      'en': 'Weather',
      'ru': 'Погода'},
    {
      'en': 'Audio Player',
      'ru': 'Плеер'},
    {
      'en': 'Quote',
      'ru': 'Цитата'},
    {
      'en': 'ToDo List',
      'ru': 'Список дел'},
    {
      'en': '[enter name]',
      'ru': '[введите имя]'},
    {
      'en': 'enter city please',
      'ru': 'введите город'}
]

const settingsTitle = document.querySelector('.settings-title');
const settingsLang = document.querySelector('.language-label');
const photoGallary = document.querySelector('.photo-gallary');
const imageSource = document.querySelector('.image-source-label');
const imageTag = document.querySelector('.image-tag-label');
const imageTagInput = document.querySelector('.image-tag-input');
const widgets = document.querySelector('.widgets');
const labelTime = document.querySelector('.input-label-time');
const labelDate = document.querySelector('.input-label-date');
const labelGreeting = document.querySelector('.input-label-greeting');
const labelWeather = document.querySelector('.input-label-weather');
const labelPlayer = document.querySelector('.input-label-player');
const labelQuote = document.querySelector('.input-label-quote');
const labelTodo = document.querySelector('.input-label-todo');

const btnSettingsTitle = document.querySelector('.settings-button-title');
const btnTodoTitle = document.querySelector('.todo-button-title');

function loadSettings(lang) {
  settingsTitle.textContent = settingsTranslation[0][lang];
  settingsLang.textContent = settingsTranslation[1][lang];
  photoGallary.textContent = settingsTranslation[2][lang];
  imageSource.textContent = settingsTranslation[3][lang];
  imageTag.textContent = settingsTranslation[4][lang];
  imageTagInput.placeholder = settingsTranslation[5][lang];
  widgets.textContent = settingsTranslation[6][lang];
  labelTime.textContent = settingsTranslation[7][lang];
  labelDate.textContent = settingsTranslation[8][lang];
  labelGreeting.textContent = settingsTranslation[9][lang];
  labelWeather.textContent = settingsTranslation[10][lang];
  labelPlayer.textContent = settingsTranslation[11][lang];
  labelQuote.textContent = settingsTranslation[12][lang];
  labelTodo.textContent = settingsTranslation[13][lang];
  btnSettingsTitle.textContent = settingsTranslation[0][lang];
  btnTodoTitle.textContent = settingsTranslation[13][lang];

  yourName.placeholder = settingsTranslation[14][lang];
  city.placeholder = settingsTranslation[15][lang];

  langSelect.value = lang;
}
loadSettings(lang);

const settingsBtn = document.querySelector('.settings-button');
const settingsContainer = document.querySelector('.settings-container');

settingsBtn.addEventListener('click', function() {
  settingsContainer.classList.toggle('active');
});

// show widgets

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

const todoBtn = document.querySelector('.todo-button');
const todoContainer = document.querySelector('.todolist-container');

checkboxTime.addEventListener('change', function() {
  checkboxTime.checked ? time.style.opacity = '1' : time.style.opacity = '0';
});
checkboxDate.addEventListener('change', function() {
  checkboxDate.checked ? dateContainer.style.opacity = '1' : dateContainer.style.opacity = '0';
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

// save settings in local storage

function setLocalStorageChekbox() {
  localStorage.setItem('checkboxTime', checkboxTime.checked);
  localStorage.setItem('checkboxDate', checkboxDate.checked);
  localStorage.setItem('checkboxGreeting', checkboxGreeting.checked);
  localStorage.setItem('checkboxWeather', checkboxWeather.checked);
  localStorage.setItem('checkboxPlayer', checkboxPlayer.checked);
  localStorage.setItem('checkboxQuote', checkboxQuote.checked);
  localStorage.setItem('checkboxTodo', checkboxTodo.checked);
}
window.addEventListener('beforeunload', setLocalStorageChekbox);

function loadCheckbox(checkbox, value) {
  if (localStorage.getItem(value)) {
    checkbox.checked = localStorage.getItem(value) === 'false' ? false : true;
  }
}

loadCheckbox(checkboxTime, 'checkboxTime');
loadCheckbox(checkboxDate, 'checkboxDate');
loadCheckbox(checkboxGreeting, 'checkboxGreeting');
loadCheckbox(checkboxWeather, 'checkboxWeather');
loadCheckbox(checkboxPlayer, 'checkboxPlayer');
loadCheckbox(checkboxQuote, 'checkboxQuote');
loadCheckbox(checkboxTodo, 'checkboxTodo');

checkboxTime.checked ? time.style.opacity = '1' : time.style.opacity = '0';
checkboxDate.checked ? dateContainer.style.opacity = '1' : dateContainer.style.opacity = '0';
checkboxGreeting.checked ? greetingContainer.style.opacity = '1' : greetingContainer.style.opacity = '0';
checkboxWeather.checked ? weatherContainer.style.opacity = '1' : weatherContainer.style.opacity = '0';
checkboxPlayer.checked ? audioPlayer.style.opacity = '1' : audioPlayer.style.opacity = '0';
checkboxQuote.checked ? quotesContainer.style.opacity = '1' : quotesContainer.style.opacity = '0';

if (!checkboxTodo.checked) {
  todoBtn.style.opacity = '0';
  todoContainer.style.opacity = '0';
}

// todo list

todoBtn.addEventListener('click', function() {
  todoContainer.classList.toggle('active');
});

const newTodo = document.querySelector('.todo-new');
const listTodo = document.querySelector('.todo-list');
const todoSelect = document.querySelector('.todo-select');

newTodo.addEventListener('change', function () {
	if (todoSelect.value === 'today' && newTodo.value !== '') {
		const li = document.createElement('li');
		const input = document.createElement('input');
		const label = document.createElement('label');
		const button = document.createElement('button');
		li.classList.add('checkbox-item-todo');
		input.classList.add('checkbox-new-todo');
		input.type = 'checkbox';
		input.id = newTodo.value;
		label.classList.add('checkbox-text-todo');
		label.textContent = newTodo.value
		label.htmlFor = newTodo.value
		button.classList.add('btn-todo-del')
		listTodo.append(li)
		li.append(input)
		li.append(label)
		li.append(button)
		const todoDel = document.querySelectorAll('.btn-todo-del')
		const checkboxItemTodo = document.querySelectorAll('.checkbox-item-todo')
		todoDel.forEach((el, index) => {
			el.addEventListener('click', () => {
				checkboxItemTodo[index].remove()
			})
		})
	}
})

todoSelect.addEventListener('change', function () {
	const checkboxNewTodo = document.querySelectorAll('.checkbox-new-todo')
	const checkboxItemTodo = document.querySelectorAll('.checkbox-item-todo')

	checkboxNewTodo.forEach((el, index) => {
		if (todoSelect.value === 'done' && el.checked === false) {
			checkboxItemTodo[index].classList.add('hidden')
		} else if (todoSelect.value === 'today') {
			checkboxItemTodo[index].classList.remove('hidden')
		}
	})
})

// score console

console.log(
  'Contacts:\n',
  '📧 Discord: mishanos#6940\nhttps://discordapp.com/users/561035807046238209\n',
  '📧 Telegram: @msh_ns\nhttps://t.me/msh_ns\n\n',

  '📂 Score: 160 / 160\n\n',

  '✅ [+15] Часы и календарь:\n',
  '✔️ Время выводится в 24-часовом формате 21:01:00 (+5)\n',
  '✔️ Время обновляется каждую секунду. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) (+5)\n',
  '✔️ Выводится день недели, число, месяц "Воскресенье, 16 мая" / "Sunday, May 16". Язык и формат вывода даты определяется языком приложения. При изменении дня недели, даты, месяца эти данные меняются (+5)\n\n',

  '✅ [+10] Приветствие:\n',
  '✔️ Текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь). При изменении времени суток, если в это время приложение открыто, меняется текст приветствия (+5)\n',
  '✔️ Пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется (+5)\n\n',
  
  '✅ [+20] Смена фонового изображения:\n',
  '✔️ Ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения. Изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана (+5)\n',
  '✔️ Изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) (+5)\n',
  '✔️ Изображения перелистываются по кругу: после 20 изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) (+5)\n',
  '✔️ При смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения (+5)\n\n',
  
  '✅ [+15] Виджет погоды:\n',
  '✔️ Город по умолчанию - Минск, пока пользователь не ввёл другой город. При перезагрузке страницы указанный пользователем город сохраняется (+5)\n',
  '✔️ Для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API. Данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел (+5)\n',
  '✔️ Выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) (+5)\n\n',

  '✅ [+10] Виджет цитата дня:\n',
  '✔️ При загрузке страницы приложения отображается рандомная цитата и её автор (+5)\n',
  '✔️ При перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) (+5)\n\n',
  
  '✅ [+15] Аудиоплеер:\n',
  '✔️ При клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause (+3)\n',
  '✔️ При клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play (+3)\n',
  '✔️ Треки можно пролистывать кнопками Play-next и Play-prev. Треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) (+3)\n',
  '✔️ Трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем (+3)\n',
  '✔️ После окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый (+3)\n\n',
    
  '✅ [+20] Продвинутый аудиоплеер:\n',
  '✔️ Добавлен прогресс-бар, в котором отображается прогресс проигрывания (+3)\n',
  '✔️ При перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека (+3)\n',
  '✔️ Над прогресс-баром отображается название трека (+3)\n',
  '✔️ Отображается текущее и общее время воспроизведения трека (+3)\n',
  '✔️ Есть кнопка звука, при клике по которой можно включить/отключить звук (+2)\n',
  '✔️ Добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука (+3)\n',
  '✔️ Можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте (+3)\n\n',

  '✅ [+15] Перевод приложения на два языка (en/ru):\n',
  '✔️ Переводится язык и меняется формат отображения даты (+3)\n',
  '✔️ Переводится приветствие и placeholder (+3)\n',
  '✔️ Переводится прогноз погоды в т.ч описание погоды и город по умолчанию (+3)\n',
  '✔️ Переводится цитата дня (+3)\n',
  '✔️ Переводятся настройки приложения. При переключении языка приложения в настройках язык настроек тоже меняется (+3)\n\n',

  '✅ [+10] Получение фонового изображения от API:\n',
  '✔️ В качестве источника изображений может использоваться Unsplash API (+5)\n',
  '✔️ В качестве источника изображений может использоваться Flickr API (+5)\n\n',

  '✅ [+20] Настройки приложения:\n',
  '✔️ В настройках приложения можно указать язык приложения (en/ru) (+3)\n',
  '✔️ В настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API (+3)\n',
  '✔️ Если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото (+3)\n',
  '✔️ В настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел (+3)\n',
  '✔️ Скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице (+3)\n',
  '✔️ настройки приложения сохраняются при перезагрузке страницы (+5)\n\n',

  '✅ [+10] Дополнительный функционал на выбор:\n',
  '✔️ ToDo List - список дел (+10)\n\n'
  );