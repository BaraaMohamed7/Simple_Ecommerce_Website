import Rating from "../components/rating.js";
const Home = {
  render: async () => {
    let response = await axios.get('https://fakestoreapi.com/products', {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    });
    let products = await response.data;
    return `
      <ul class="products">
      ${products.map((product) => `
        <li class="product">
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
          <a href="./#/product/${product.id}" class="btn">View Product</a>
        </li>
      `
    ).join('\n')}
      </ul>
    `
  }
}

export default Home