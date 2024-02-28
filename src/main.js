// логика работы приложения

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import searchImages from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loader = document.querySelector('.loader');

// Определение функции clearGallery за пределами обработчика событий

function clearGallery() {
  const galleryContainer = document.getElementById('gallery');
  galleryContainer.innerHTML = '';
}



searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
    });
    return;
  }

  showLoader();

 // Вызов функции clearGallery перед новым поиском
  clearGallery();

searchImages(query)
    .then(images => {
      if (images.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again.',
        });
      } else {
        renderGallery(images);
      }
    })
    .catch(error => {
      console.error('Error in search:', error);
      searchInput.value = '';
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching images. Please try again.',
      });
    })
    .finally(hideLoader);
});

const showLoader = () => {
  loader.style.display = 'block';
};

function hideLoader() {
    loader.style.display = 'none';
}

