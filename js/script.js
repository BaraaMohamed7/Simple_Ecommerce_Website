let cart = [];

if (JSON.parse(localStorage.getItem("cart"))) {
  cart = JSON.parse(localStorage.getItem("cart"));
  console.log();
}


async function getProducts() {
  let response = await axios.get('https://fakestoreapi.com/products');
  let products = response.data;

  document.getElementById("products").innerHTML = "";
  document.querySelector(".cart").innerHTML = `
    <button class="cart-btn" onClick="openCart()">Cart</button>
  `;

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
  let popup = `
    <div class="popup">
      The product has been added to your cart
        <button onClick="closePopup()">Ok</button>
    </div>
  `
  document.querySelector(".container").innerHTML += popup;
}


function closePopup() {
  document.querySelector(".popup").remove();
}


function openCart() {
  let products = cart;

  document.querySelector(".cart").innerHTML += `
    <button class="return-btn" onClick="getProducts()">Return</button>
  `;

  document.querySelector(".cart-btn").remove();

  document.getElementById("products").innerHTML = "";

  for (product of products) {

    document.getElementById("products").innerHTML = `
    <div class="product">
      <img src="${product.image}" class="product-img">
      <h2 class="product-name">${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <h3 class="product-description">${product.price}</h3>
    </div>
    `
  }
}