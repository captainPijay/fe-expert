import CONFIG from '../../../config/config';

const createFoodDetail = (restaurant) => {
  const categories = restaurant.categories.map((category) => category.name).join(', ');
  const foods = restaurant.menus.foods.map((food) => food.name).join(', ');
  const drinks = restaurant.menus.drinks.map((drink) => drink.name).join(', ');

  return `
  <style>
  .card {
  border-radius: 10px;
  box-shadow: 2px 5px 10px $bg-shadow;
  overflow: hidden;
  background-color: $bg-card;
  line-height: 1.8;
  max-width: 1350px;
  margin: auto;
  padding: 15px;
}
.card img{
    display: block; 
    margin-left: auto; 
    margin-right: auto;
}
.card ul{
  list-style-type: none;
}
.card a {
  color: #29343d;
  text-decoration: none;
}

.card img {
  width: 65%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  left: 50%;
  right: 50%;
  margin-bottom: 1rem;
}

.card-content {
  padding: 10px;
}

.rating {
  font-size: 16px;
  font-weight: bold;
  color: #f39c12;
  margin-bottom: 5px;
}

.description {
  font-size: 14px;
  color: #555;
}
  </style>
  <div class="form-container">
        <form id="orderForm">
          <h2 style="margin-bottom: 1rem">Review Disini</h2>
          <label for="name">Nama Reviewer : </label>
          <input type="text" id="name" name="name" class="font-md" required=""><br><br>

          <label for="review">Isi Review : </label>
          <input type="text" id="review" name="review" class="font-md" required=""><br><br>

          <button type="submit" class="font-md">Pesan</button>
        </form>
      </div>
        <div class="card">
            <h1 style="text-align:center; margin-bottom:0.5rem;">${restaurant.name}</h1>
            <img src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name}">
            <p><strong>Alamat</strong>: <span>${restaurant.address}, <strong>${restaurant.city}</strong></span></p>
            <p><strong>Kategori</strong>: <span>${categories}</span></p>
            <p><strong>Deskripsi</strong>: <span>${restaurant.description}</span></p>

            <h2>Menu Makanan</h2>
            <p>${foods}</p>

            <h2>Menu Minuman</h2>
            <p>${drinks}</p>

            <h2>Rating: <strong style="color:#FFB000;">${restaurant.rating}&#11088;</strong> </h2>

            <h2>Customer Reviews</h2>
            <ul>
            ${restaurant.customerReviews.map((item) => `<li>-${item.name} : ${item.review} (${item.date})</li>`).join('')}
            </ul>

            <button id="likeButtonContainer">Tambah Ke Favorite</button>
        </div>
    `;
};
const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export { createFoodDetail, createLikeButtonTemplate, createLikedButtonTemplate };
