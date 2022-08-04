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
window.addEventListener('beforeunload', setLocalStorage)
function getLocalStorage() {
  if(localStorage.getItem('name')) {
    yourName.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)


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

let randomNum;

function setBg() {
  const timeOfDay = getTimeOfDay();
  const randomNum = getRandomNum(1, 20);
  const bgNum = String(randomNum).padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/mshns/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/mshns/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
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