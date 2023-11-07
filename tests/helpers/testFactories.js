/* eslint-disable import/prefer-default-export */
import LikeButtonPresenter from '../../src/utils/like-button-initiator';
import FavoriteFood from '../../src/data/favorite-food';

const createLikeButtonPresenterWithFood = async (food) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    Favoritefood: FavoriteFood,
    food,
  });
};

export { createLikeButtonPresenterWithFood };
