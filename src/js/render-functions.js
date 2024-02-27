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

    const lightbox = new SimpleLightbox('.gallery-item' , {
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

  const likes = document.createElement('span');
  likes.textContent = `Likes: ${image.likes}`;

  const views = document.createElement('span');
  views.textContent = `Views: ${image.views}`;

  const comments = document.createElement('span');
  comments.textContent = `Comments: ${image.comments}`;

  const downloads = document.createElement('span');
  downloads.textContent = `Downloads: ${image.downloads}`;

  card.appendChild(img);
  card.appendChild(likes);
  card.appendChild(views);
  card.appendChild(comments);
  card.appendChild(downloads);

  return card;
};
