import API_ENDPOINT from '../config/api-endpoint';

class FoodSource {
  static async allFood() {
    const response = await fetch(API_ENDPOINT.ALL);
    const responseJson = await response.json();
    return responseJson;
  }

  static async favoriteFood() {
    const response = await fetch(API_ENDPOINT.FAVORITE);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async detailFood(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }
}

export default FoodSource;
