import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Handle the submit event for the form
document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get the value of the delay and the state of the promise from the form
  const delay = parseInt(this.querySelector('input[name="delay"]').value);
  const state = this.querySelector('input[name="state"]:checked').value;

  // Creating a new profession
  const promise = new Promise((resolve, reject) => {
    // Set a delay for fulfilling or rejecting a promise
    setTimeout(() => {
      // Depending on the selected state, we call the resolve or reject method
      if (state === 'fulfilled') {
        resolve(delay); // Done
      } else {
        reject(delay); // Rejected
      }
    }, delay);
  });

  // Process the results of the fulfillment of the promise
  promise
    .then(delay => {
      // If the promise is completed successfully, display a success message
      iziToast.success({
        position: 'topRight',
        icon: null,
        backgroundColor: '#59a10d',
        titleColor: '#fff',
        messageColor: '#fff',
        close: false,
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      // If the promise is rejected, display an error message
      iziToast.error({
        position: 'topRight',
        icon: null,
        backgroundColor: '#ef4040',
        titleColor: '#fff',
        messageColor: '#fff',
        close: false,
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
