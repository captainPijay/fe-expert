import UrlParser from '../../routes/url-parser';
import FoodSource from '../../data/food-db-source';
import CONFIG from '../../config/config';
import { createFoodDetail } from './templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const cardContainer = document.createElement('div');
    const food = await FoodSource.detailFood(url.id);
    cardContainer.innerHTML = createFoodDetail(food);
    return cardContainer;
  },
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const food = await FoodSource.detailFood(url.id);
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      food: {
        id: food.id,
        name: food.name,
        description: food.description,
        pictureId: food.pictureId,
        city: food.city,
        rating: food.rating,
      },
    });
    const orderForm = document.querySelector('#orderForm');
    const namaReviewer = document.querySelector('#name');
    const review = document.querySelector('#review');
    if (orderForm) {
      orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const namaReviewerValue = namaReviewer.value;
        const reviewValue = review.value;
        if (!namaReviewerValue || !reviewValue) {
          alert('Mohon isi semua kolom');
        } else {
          const data = {
            id: url.id,
            name: namaReviewerValue,
            review: reviewValue,
          };
          this.inputApi(data);
        }
      });
    }
  },
  async inputApi(data) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error('Gagal melakukan permintaan API');
      }
      alert(`${responseJson.message} Untuk Melihat Review Silahkan Lakukan Hard Refresh CTRL+Shift+R(Windows) / Cmd (⌘) + Shift + R(Mac) Atau Muat Ulang Browser Anda!`);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

};
export default Detail;
