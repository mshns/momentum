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
}
showTime();