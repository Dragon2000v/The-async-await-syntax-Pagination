import { getImage } from './pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorPng from '../img/icon-error.png';
//#region form elements
const loader = document.createElement('span');
loader.classList.add('loader');
const container = document.createElement('div');
container.classList.add('container');

const form = document.createElement('form');

const input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('name', 'query');
input.placeholder = 'Search images...';

const button = document.createElement('button');
button.setAttribute('type', 'submit');
button.textContent = 'Search';

const gallery = document.createElement('ul');
gallery.classList.add('gallery');

form.append(input, button);
container.append(form);
document.body.append(container);
document.body.append(gallery, loader);
//#endregion
form.addEventListener('submit', onSearch);
function onSearch(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.query.value;
  if (query.trim() === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Type what you want to find!',
      backgroundColor: '#FFA000',
      position: 'topRight',
      theme: 'dark',
      iconUrl: '',
      timeout: 2000,
    });
    return;
  }
  gallery.innerHTML = '';
  const loader = document.querySelector('.loader');
  loader.classList.add('isVisible');
  getImage(query)
    .finally(() => {
      loader.classList.remove('isVisible');
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          theme: 'dark',
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          backgroundColor: ' #ef4040',
          iconUrl: errorPng,
          maxWidth: '432px',
          timeout: 2000,
        });
        return;
      }
      console.log(data);
      data.hits.forEach(image => {
        //галерея
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
        img.width = 360;
        img.height = 200;

        link.appendChild(img);

        //desc
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

      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });

      input.value = '';
    })
    .catch(err => {
      iziToast.error({
        theme: 'dark',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
        backgroundColor: ' #ef4040',
        iconUrl: errorPng,
        maxWidth: '432px',
        timeout: 2000,
      });
      console.log(err);
      form.reset();
      return err;
    });
}
