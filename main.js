const topWidgets = document.querySelector('.main');
const bottomWidget = document.querySelector('.additional-info');
const quote = document.querySelector('.quotes__quote');
const author = document.querySelector('.quotes__author');
const quotesBtn = document.querySelector('.quotes__btn');
const quotesBtnIcon = document.querySelector('.quotes__btn-icon');
const clockGreeting = document.querySelector('.clock-greeting__greeting');
const clockGreetingIcon = document.querySelector('.clock-greeting__icon');
const clockTime = document.querySelector('.clock-time__time');
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnText = document.querySelector('.toggle-btn__text');
const toggleBtnIcon = document.querySelector('.toggle-btn__icon');
const background = document.querySelector('.background');

// FUNCTIONS
function getQuote() {
  quote.innerHTML = `Loading quote..`;
  author.innerHTML = '';
  fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => {
      quote.innerHTML = `“${data.content}”`;
      data.author === null
        ? (author.innerHTML = 'Unknown Author')
        : (author.innerHTML = data.author);
    })
    .catch((error) => {
      console.log(error);
      quote.innerHTML = `Network Error: Can't load quote.`;
    });
}

function getTime() {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();
  let interval = (60 - new Date().getSeconds()) * 1000 + 5;

  // set clock greeting based on time of day
  let greet = '';
  if (hour >= 5 && hour <= 11) {
    greet = 'morning';
  } else if (hour >= 12 && hour <= 17) {
    greet = 'afternoon';
  } else {
    greet = 'evening';
  }

  clockGreeting.firstElementChild.innerHTML = `good ${greet}`;

  //   add background and styles to clock based on time of day
  if (hour >= 5 && hour <= 17) {
    background.classList.add('background--day');
    clockGreetingIcon.src = './assets/desktop/icon-sun.svg';
    clockGreetingIcon.setAttribute('alt', 'sun');
    bottomWidget.classList.add('additional-info--day');
  } else {
    background.classList.add('background--night');
    clockGreetingIcon.src = './assets/desktop/icon-moon.svg';
    clockGreetingIcon.setAttribute('alt', 'moon');
    bottomWidget.classList.remove('additional-info--day');
  }

  //   format hours and minutes
  hour < 10 ? (hour = `0${hour}`) : hour;
  minute < 10 ? (minute = `0${minute}`) : minute;

  //   set clock time
  clockTime.innerHTML = /* HTML */ `
    ${hour}<span class="blink">:</span>${minute}
  `;
  setTimeout(getTime, interval);
}

function getTimezone() {
  fetch('https://worldtimeapi.org/api/ip')
    .then((results) => results.json())
    .then((data) => {
      //display local timezone
      document.querySelector('.clock-time__timezone').innerHTML =
        data.abbreviation;
      // display additional details
      document.querySelector('.additional-info__timezone').innerHTML =
        data.timezone;
      document.querySelector('.additional-info__doty').innerHTML =
        data.day_of_year;
      document.querySelector('.additional-info__dotw').innerHTML =
        data.day_of_week;
      document.querySelector('.additional-info__week-number').innerHTML =
        data.week_number;
    })
    .catch((err) => console.error(err));
}

function getLocation() {
  fetch('https://ip-api.com/json/')
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('.clock-location__city').innerHTML = data.city;
      document.querySelector('.clock-location__country-code').innerHTML =
        data.countryCode;
    })
    .catch((error) => console.error(error));
}

function toggleActive() {
  topWidgets.classList.toggle('active');
  bottomWidget.classList.toggle('active');
  toggleBtnIcon.classList.toggle('flip');

  toggleBtnText.innerHTML === 'More'
    ? (toggleBtnText.innerHTML = 'Less')
    : (toggleBtnText.innerHTML = 'More');
}

// invoke functions on page load
getQuote();
getTime();
getTimezone();
getLocation();

// EVENT LISTENERS
quotesBtn.addEventListener('click', () => {
  getQuote();
  quotesBtnIcon.classList.add('rotate');
});

quotesBtnIcon.addEventListener('animationend', () => {
  quotesBtnIcon.classList.remove('rotate');
});

toggleBtn.addEventListener('click', toggleActive);
