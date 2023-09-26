import getCategories, { getCategoriesProducts } from '../api.js';
import Rating from "../components/rating.js";

import { loading } from '../utils.js';

const Categories = {
  render: async () => {
    let categories = await getCategories();
    return `${categories.map((category) => {
      return `<li>
        <button class="category btn">
          ${category}
        </button>
      </li>`
    }).join('\n')}
    `
  },
  after_render: () => {
    const main = document.getElementById('main-container');
    let categoriesItems = document.querySelectorAll(".category");
    categoriesItems.forEach(item => {
      item.addEventListener('click', async () => {
        loading();
        let products = await getCategoriesProducts(item.textContent.trim());
        let productsList = `
          <ul class="products">
            ${products.map((product) => `
            <li class="product">
          <div class="product-image">
            <img src="${product.image}" alt="${product.title}">
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
          <a href="./#/product/${product.id}" class="btn">View Product</a>
        </li>
      `
        ).join('\n')}
          </ul>
          `
        main.innerHTML = productsList;
      })
    })
  }
}

export default Categories;