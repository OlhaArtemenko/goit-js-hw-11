import { fetchImagesFromPixabay } from './js/pixabay-api';
import { renderImages } from './js/render-function';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const inputSearch = form.elements.search;
const listOfGallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});
const loader = document.querySelector('.loader');
loader.style.display = 'none';

const showLoaderIcon = () => {
  loader.style.display = 'flex';
};

const hideLoaderIcon = () => {
  loader.style.display = 'none';
};

form.addEventListener('submit', searchImages);

function searchImages(event) {
  event.preventDefault();
  listOfGallery.innerHTML = '';

  const input = event.target.elements.search.value.trim();
  if (input.length >= 3) {
    showLoaderIcon();
    fetchImagesFromPixabay(input)
      .then(images => {
        renderImages(images.hits);
        hideLoaderIcon();
      })
      .catch(error => {
        console.error(error);
        hideLoaderIcon();
        iziToast.error({
          message: 'Sorry, an error occurred while loading. Please try again!',
          position: 'topRight',
          icon: null,
          backgroundColor: '#ef4040',
          titleColor: '#fff',
          messageColor: '#fff',
        });
      });
    form.reset();
  } else {
    iziToast.warning({
      message: 'Please enter at least 3 characters for search',
      position: 'topRight',
      icon: null,
      backgroundColor: '#ffc107',
      titleColor: '#fff',
      messageColor: '#fff',
    });
  }
}
