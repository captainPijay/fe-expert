import FoodSource from '../../data/food-db-source';
import CONFIG from '../../config/config';
import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const All = {
  async render() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    const foodJson = await FoodSource.allFood();
    const data = foodJson.restaurants;
    data.forEach((res) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL}${res.pictureId}" alt="Gambar Restoran Bu Soraya">
        <div class="card-content">
          <div class="rating">${res.rating}</div>
          <h2 class="name"><a href="#/detail/${res.id}" id="detail">${res.name}</a></h2>
          <p class="description">${res.description}</p>
        </div>
      `;

      cardContainer.appendChild(card);
    });
    return cardContainer;
  },
  async afterRender() {
    return '';
  },
};

export default All;
