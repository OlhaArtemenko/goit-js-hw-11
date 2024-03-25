import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Declare variables for DOM elements
const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let userSelectedDate;
let countdownInterval;
let difference;

// Initialize flatpickr to pick the date and time
flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    // Check if the selected date is in the future
    if (selectedDate > new Date()) {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    } else {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
        position: 'topCenter',
        timeout: false, // Disables automatic message closing
      });
      startButton.disabled = true;
    }
  },
});

// Handler of the "Start" button click event
startButton.addEventListener('click', function () {
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  // Calculation of the difference between the selected date and the current
  difference = userSelectedDate - new Date();
  clearInterval(countdownInterval); // Stopping the advance timer
  updateTimer(); // Call the function to display the initial value of the timer
  countdownInterval = setInterval(updateTimer, 1000); // Setting the timer update interval
});

//* A function that adds the passed value with a leading zero if it is less than 10
function addZero(value) {
  return value < 10 ? `0${value}` : value;
}

//* Function to convert milliseconds to an object with days, hours, minutes, and seconds
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//* Function that updates the timer every second
function updateTimer() {
  const { days, hours, minutes, seconds } = convertMs(difference);

  daysElement.textContent = addZero(days);
  hoursElement.textContent = addZero(hours);
  minutesElement.textContent = addZero(minutes);
  secondsElement.textContent = addZero(seconds);

  if (difference <= 0) {
    clearInterval(countdownInterval); // Stop the timer when the end date is reached
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    dateTimePicker.disabled = false;
    startButton.disabled = false;
  }
  difference = difference - 1000; // Decrement the difference by 1 second
}
