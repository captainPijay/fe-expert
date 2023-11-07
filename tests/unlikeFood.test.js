/* eslint-disable no-undef */
import FavoriteFood from '../src/data/favorite-food';
import LikeButtonInitiator from '../src/utils/like-button-initiator';
import * as TestFactories from './helpers/testFactories';

describe('Unliking A Movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteFood.putFood({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteFood.deleteFood(1);
  });

  it('should display unlike widget when the movie has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithFood({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });
  it('should be able to remove liked restaurant from the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      food: {
        id: 1,
      },
    });
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
    expect(await FavoriteFood.getAllFood()).toEqual([]);
  });
  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      food: {
        id: 1,
      },
    });
    await FavoriteFood.deleteFood(1);
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
    expect(await FavoriteFood.getAllFood()).toEqual([]);
  });
});
