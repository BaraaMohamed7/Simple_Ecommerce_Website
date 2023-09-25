import { getProduct } from "../api.js";
import Rating from "../components/rating.js";
import parseRequestUrl from "../utils.js"

const Product = {
  after_render: () => {
    const request = parseRequestUrl();

    document.getElementById('add-btn').addEventListener('click',
      () => {
        document.location.hash = `/cart/${request.id}`;
      }
    )
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `
    <li class="product product-view">
          <div class="product-image">
            <img src="${product.image}">
          </div>
          <h2 class="product-name">${product.title}</h2>
          <p class="product-description">${product.description}</p>
          <div class="product-rating">
          ${Rating.render({
      value: product.rating.rate,
      text: `${product.rating.count} reviews`,
    })}
          </div>
          <h3 class="product-price">${product.price}</h3>

          <button id="add-btn" class="btn">Add to Cart</button>
        </li>
    `
  }
}

export default Product