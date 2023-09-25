const Home = {
  render: async () => {
    let response = await axios.get('https://fakestoreapi.com/products');
    let products = await response.data;
    return `
      <ul class="products">
      ${products.map((product) => `
        <li class="product">
        <a href="./#/product/${product.id}">
          <div class="product-image">
            <img src="${product.image}">
          </div>
          </a>
          <h2 class="product-name">${product.title}</h2>
          <p class="product-description">${product.description}</p>
          <h3 class="product-price">${product.price}</h3>
          <button onClick="viewProduct(${product.id})">View</button>
        </li>
      `
    ).join('\n')}
      </ul>
    `
  }
}

export default Home