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