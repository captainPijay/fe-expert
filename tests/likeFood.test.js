/* eslint-disable no-undef */
import LikeButtonInitiator from '../src/utils/like-button-initiator';
import FavoriteFood from '../src/data/favorite-food';

describe('Liking A food', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the food has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      food: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the food has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      food: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the food', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      food: {
        id: 1,
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Memastikan film berhasil disukai
    const food = await FavoriteFood.getFood(1);
    expect(food).toEqual({ id: 1 });

    await FavoriteFood.deleteFood(1);
  });
  it('should not add a restaurant again when its already liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      food: {
        id: 1,
      },
    });
    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriteFood.putFood({ id: 1 });
    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteFood.getAllFood()).toEqual([{ id: 1 }]);
    await FavoriteFood.deleteFood(1);
  });
  it('should not add a food when it has no id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      food: {},
    });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteFood.getAllFood()).toEqual([]);
  });
});
