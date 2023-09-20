let cart = [];

if (JSON.parse(localStorage.getItem("cart"))) {
  cart = JSON.parse(localStorage.getItem("cart"));
  console.log();
}

console.log(cart);


async function getProducts() {
  let response = await axios.get('https://fakestoreapi.com/products');
  let products = response.data;

  document.getElementById("products").innerHTML = "";

  for (product of products) {
    document.getElementById("products").innerHTML += `
    <div class="product">
      <img src="${product.image}" class="product-img">
      <h2 class="product-name">${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <h3 class="product-description">${product.price}</h3>
      <button onClick="viewProduct(${product.id})">View</button>
    </div>
    `
  }
}

getProducts();

async function viewProduct(id) {
  let response = await axios.get('https://fakestoreapi.com/products/' + id);
  let product = response.data;

  document.getElementById("products").innerHTML = `
  <div class="product">
    <img src="${product.image}" class="product-img">
      <h2 class="product-name">${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <h3 class="product-description">${product.price}</h3>
      <button onClick='addProduct("${product.id}", "${product.title}", "${product.description}", "${product.price}", "${product.image}")'>Add to cart</button>
      <button onClick="getProducts()">return</button>
  </div>
  `
}



function addProduct(productId, productTitle, productDescription, productPrice, productImage) {
  // function addProduct(product) {
  let productData = {
    id: productId,
    title: productTitle,
    description: productDescription,
    price: productPrice,
    image: productImage,
  }
  console.log(cart);
  cart.push(productData);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function openCart() {
  let products = cart;


  document.getElementById("products").innerHTML = "";

  for (product of products) {

    document.getElementById("products").innerHTML += `
    <div class="product">
      <img src="${product.image}" class="product-img">
      <h2 class="product-name">${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <h3 class="product-description">${product.price}</h3>
      <button onClick="getProducts()">return</button>
    </div>
    `
  }
}