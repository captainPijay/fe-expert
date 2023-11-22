import FavoriteFood from '../../data/favorite-food';
import CONFIG from '../../config/config';
import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const Detail = {
  async render() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    const foodJson = await FavoriteFood.getAllFood();
    const data = foodJson;
    if (data.length < 1) {
      cardContainer.innerHTML = `
      <style>
      .kosong{
        display: flex;
        justify-content: center;
        width: 93vw;

      }
      </style>
      <div class="kosong title_restaurant"><h1>Tidak Ada Restaurant Yang Disukai</h1></div>
      `;
    }
    data.forEach((res) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL}${res.pictureId}" alt="Gambar Restoran Bu Soraya">
        <div class="card-content">
          <div class="rating">${res.rating}</div>
          <h2 class="name title_restaurant"><a href="#/detail/${res.id}" id="detail">${res.name}</a></h2>
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

export default Detail;
