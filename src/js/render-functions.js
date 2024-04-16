import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderLoader() {
  const loader = document.createElement('span');
  loader.classList.add('loader');
  document.body.append(loader);
}

export function renderGallery(imagesData) {
  const gallery = document.querySelector('.gallery');


  if (!gallery) {
    console.error('Error: Gallery container not found');
    return;
  }

  imagesData.forEach(image => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery-item');

    const link = document.createElement('a');
    link.classList.add('gallery-link');
    link.href = image.largeImageURL;

    const img = document.createElement('img');
    img.classList.add('gallery-image');
    img.src = image.webformatURL;
    img.dataset.source = image.largeImageURL;
    img.alt = image.tags;
    img.width = '360px';
    img.height = 'auto';

    link.appendChild(img);

    const descItems = {
      Likes: image.likes,
      Views: image.views,
      Comments: image.comments,
      Downloads: image.downloads,
    };

    const descList = document.createElement('ul');
    descList.classList.add('gallery-desc-list');

    for (let item in descItems) {
      const descItem = document.createElement('li');
      descItem.classList.add('gallery-desc-item');
      const descTtl = document.createElement('p');
      descTtl.classList.add('gallery-desc-ttl');
      descTtl.textContent = item;
      const descText = document.createElement('p');
      descText.classList.add('gallery-desc-text');
      descText.textContent = descItems[item];
      descItem.append(descTtl, descText);
      descList.append(descItem);
    }

    galleryItem.append(link, descList);
    gallery.appendChild(galleryItem);
  });

  if (imagesData.length === 0) {
    iziToast.error({
      theme: 'dark',
      position: 'topRight',
      message:
        'An error occurred while fetching images. Please try again later.',
      backgroundColor: '#ef4040',
      iconUrl: errorPng,
      maxWidth: '432px',
      timeout: 2000,
    });
    toggleLoadMoreButton(false, 'No images found.'); // Скрыть кнопку "Загрузить еще"
  }

  if (imagesData.length > 0) {
    new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function toggleLoadMoreButton(show,  message = '') {
  const loadMoreBtn = document.querySelector('.load-button');
  if (show) {
    loadMoreBtn.classList.remove('is-hidden');
  } else {
    loadMoreBtn.classList.add('is-hidden');
    if (message) {
      iziToast.warning({
        title: 'Caution',
        message: message,
        backgroundColor: '#FFA000',
        position: 'topRight',
        theme: 'dark',
        iconUrl: '',
        timeout: 2000,
      });
    }
    
  }
  
}
 