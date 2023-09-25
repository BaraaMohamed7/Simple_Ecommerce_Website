let cart = [];

if (JSON.parse(localStorage.getItem("cart"))) {
  cart = JSON.parse(localStorage.getItem("cart"));
  console.log();
}

async function getCategories() {
  let response = await axios.get("https://fakestoreapi.com/products/categories");
  let categories = response.data;

  for (let category of categories) {
    document.getElementById("categories").innerHTML += `
      <li>
        <button class ="category">
          ${category}
        </button>
      </li>
    `
  }

  categoriesList = document.querySelectorAll(".category");

  categoriesList.forEach(categoryBtn => {
    categoryBtn.addEventListener('click',
      function () {
        categoriesList.forEach(categoryBtn => {
          categoryBtn.classList.remove("active")
        });


        categoryBtn.classList.add("active");
        getProductsCategrized(categoryBtn.innerHTML);
      }
    );
  });
}

async function getProducts() {
  loading()
  let response = await axios.get('https://fakestoreapi.com/products');
  let products = response.data;

  document.getElementById("products").innerHTML = "";
  document.querySelector(".cart").innerHTML = `
    <button class="cart-btn" onClick="openCart()">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-cart"
									viewBox="0 0 16 16"
								>
									<path
										d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
									/>
								</svg>
								<div class="cart-amount">${cart.length}</div>
							</button>
  `;

  for (product of products) {
    let productElement = `
    <div class="product">
      <div class="product-image">
        <img src="${product.image}">
      </div>
      <h2 class="product-name">${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <h3 class="product-price">${product.price}</h3>
      <button onClick="viewProduct(${product.id})">View</button>
    </div>
    `
    document.getElementById("products").innerHTML += productElement;
  }
}
async function getProductsCategrized(category) {
  loading()
  let response = await axios.get('https://fakestoreapi.com/products/category/' + category.trim());
  let products = response.data;

  document.getElementById("products").innerHTML = "";
  document.querySelector(".cart").innerHTML = `
    <button class="cart-btn" onClick="openCart()">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-cart"
									viewBox="0 0 16 16"
								>
									<path
										d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
									/>
								</svg>
								<div class="cart-amount">${cart.length}</div>
							</button>
  `;

  for (product of products) {
    let productElement = `
    <div class="product">
      <div class="product-image">
        <img src="${product.image}">
      </div>
      <h2 class="product-name">${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <h3 class="product-price">${product.price}</h3>
      <button onClick="viewProduct(${product.id})">View</button>
    </div>
    `
    document.getElementById("products").innerHTML += productElement;
  }
}




async function viewProduct(id) {
  loading()
  let response = await axios.get('https://fakestoreapi.com/products/' + id);
  let product = response.data;

  document.getElementById("products").innerHTML = `
  <div class="product product-view">
      <div class="product-image">
        <img src="${product.image}">
      </div>
      <h2 class="product-name">${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <h3 class="product-price">${product.price}</h3>
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
  cart.push(productData);
  localStorage.setItem("cart", JSON.stringify(cart));
  let popup = `
    <div class="popup">
      The product has been added to your cart
        <button onClick="closePopup()">Ok</button>
    </div>
  `

  document.querySelector(".cart").innerHTML = `
    <button class="cart-btn" onClick="openCart()">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-cart"
									viewBox="0 0 16 16"
								>
									<path
										d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
									/>
								</svg>
								<div class="cart-amount">${cart.length}</div>
							</button>
              <button class="return-btn" onClick="getProducts()">Return</button>
  `;
  document.querySelector(".container").innerHTML += popup;
}


function closePopup() {
  document.querySelector(".popup").remove();
}


function openCart() {
  loading()
  let products = cart;

  document.querySelector(".cart").innerHTML += `
    <button class="return-btn" onClick="getProducts()">Return</button>
  `;

  document.querySelector(".cart-btn").remove();

  document.getElementById("products").innerHTML = "";

  for (product of products) {

    document.getElementById("products").innerHTML += `
    <div class="product">
      <div class="product-image">
        <img src="${product.image}">
      </div>
      <h2 class="product-name">${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <h3 class="product-price">${product.price}</h3>
    </div>
    `
  }
}

async function search() {
  await getProducts();
  let searchBar = document.getElementById("searchBar").value.toLowerCase();
  if (searchBar == "") return;

  let matches = Array.from(
    document.querySelectorAll(".product")
  ).filter(product => product.textContent.toLowerCase().includes(searchBar))

  if (matches.length == 0) {
    document.getElementById("products").innerHTML = `
    <h3> No results </h3>
    `;
    return;
  }

  document.getElementById("products").innerHTML = "";
  for (let match of matches) {
    match.classList.add("product-view");
    console.log(match.textContent);
    document.getElementById("products").append(match);
  }
}


function loading() {
  document.getElementById("products").innerHTML = `
    <div class="loading">
      <div>
      </div>
    </div>
  `
}


getProducts("");
getCategories();

document.getElementById("searchBtn").addEventListener('click', function (e) {
  e.preventDefault();
  search();
})