import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const listEl = document.querySelector('.gallery');

const listItemsMarkup = makeListMarkup(galleryItems);

listEl.insertAdjacentHTML("afterbegin" , listItemsMarkup);

function makeListMarkup(items) {
  return items
    .map(item => {
      return `<a class="gallery__item" href="${item.original}">
            <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
            </a>`;
    })
    .join('');
}

new SimpleLightbox('.gallery__item', {
  captionsData: 'alt',
  captionDelay: 250,
});