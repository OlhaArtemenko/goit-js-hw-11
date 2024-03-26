import { fetchImagesFromPixabay } from './js/pixabay-api';
import { renderImages } from './js/render-function';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
export const inputSearch = form.elements.search;
export const listOfGallery = document.querySelector('.gallery');
export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});
const loader = document.querySelector('.loader');
loader.style.display = 'none';
export const showLoaderIcon = () => {
  loader.style.display = 'flex';
};
const unshowLoaderIcon = () => {
  loader.style.display = 'none';
};

form.addEventListener('submit', searchImages);

function searchImages(event) {
  event.preventDefault();
  listOfGallery.innerHTML = '';

  const input = event.target.elements.search.value.trim();
  if (input !== '') {
    window.onload = () => {
      fetchImagesFromPixabay()
        .then(images => {
          renderImages(images.hits);
          unshowLoaderIcon();
        })
        .catch(error => {
          console.log(error);
          unshowLoaderIcon();
          iziToast.error({
            message:
              'Sorry, an error occurred while loading. Please try again!',
            position: 'topRight',
            icon: null,
            backgroundColor: '#ef4040',
            titleColor: '#fff',
            messageColor: '#fff',
          });
        });
    };
    window.onload();
    form.reset();
  }
}
