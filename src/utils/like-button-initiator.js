import FavoriteFood from '../data/favorite-food';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/pages/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, food }) {
    this._likeButtonContainer = likeButtonContainer;
    this._food = food;
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._food;

    if (await this._isFoodExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isFoodExist(id) {
    const food = await FavoriteFood.getFood(id);
    return !!food;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteFood.putFood(this._food);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteFood.deleteFood(this._food.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
