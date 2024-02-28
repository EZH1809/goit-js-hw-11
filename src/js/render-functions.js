// функции для отображения элементов интерфейса


import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const renderGallery = (images) => {
  const galleryContainer = document.getElementById('gallery');

  galleryContainer.innerHTML = '';

  if (images.length === 0) {
    iziToast.info({
      title: 'Info',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  images.forEach((image) => {
    const card = createImageCard(image);
    galleryContainer.appendChild(card);
  });

  const lightbox = new SimpleLightbox('.gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  lightbox.refresh();
};

const createImageCard = (image) => {
  const card = document.createElement('a');
  card.classList.add('gallery-item');
  card.href = image.largeImageURL;

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;

  const infoContainer = document.createElement('div');
  infoContainer.classList.add('gallery-item-info');

  const likes = createInfoElement('Likes', image.likes);
  const views = createInfoElement('Views', image.views);
  const comments = createInfoElement('Comments', image.comments);
  const downloads = createInfoElement('Downloads', image.downloads);

  infoContainer.appendChild(likes);
  infoContainer.appendChild(views);
  infoContainer.appendChild(comments);
  infoContainer.appendChild(downloads);

  card.appendChild(img);
  card.appendChild(infoContainer);

  return card;
};

const createInfoElement = (label, value) => {
  const infoElement = document.createElement('div');
  infoElement.classList.add('gallery-item-info-element');
  
  const labelElement = document.createElement('span');
  labelElement.textContent = `${label}: `;
  
  const valueElement = document.createElement('span');
  valueElement.textContent = value;
  
  infoElement.appendChild(labelElement);
  infoElement.appendChild(valueElement);

  return infoElement;
};
