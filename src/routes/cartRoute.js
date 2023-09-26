import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import { parseRequestUrl, rerender } from "../utils.js";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(x => x.product === item.product);

  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) => x.product === item.product ? item : x)
    }
  } else {
    cartItems = [...cartItems, item]
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartRoute);
  }
}

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product != id));
  if (id == parseRequestUrl().id) {
    document.location.hash = '/cart';
  } else {
    rerender(CartRoute);
  }
}

const CartRoute = {
  after_render: () => {
    const qtySelects = document.getElementsByClassName("qty-select");
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change',
        (e) => {
          const item = getCartItems().find((x) => String(x.product) === qtySelect.id);
          addToCart({
            ...item, quantity: Number(e.target.value),
          }, true);
        })
    })

    const deleteBtns = document.getElementsByClassName("delete-btn");
    Array.from(deleteBtns).forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', () => {
        removeFromCart(deleteBtn.id);
      })
    })
  }
  ,
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
        countInStock: 50,
      });
    }
    const cartItems = getCartItems();
    return `
    <div class="cart-board">
      <ul class= "cart-list">
      ${cartItems.length === 0
        ? `<div>Cart is empty. <a href="/#/" class="btn">Go shopping</a></div>`
        : cartItems.map(product => `
      <li class="cart-product">
        <div class="product-image">
          <img src="${product.image}" alt=${product.title}>
        </div>
        <div class="product-info">
          <a href="/#/product/${product.product}">
            <h2 class="product-name">${product.title}</h2>
          </a>
          <h3 class="product-price">${product.price}</h3>
          <div>
            Quantity:
            <select class="qty-select" id="${product.product}">
              ${[...Array(product.countInStock).keys()].map((x) => product.quantity === x + 1 ?
          `<option value="${x + 1}" selected>${x + 1}</option>`
          : `<option value="${x + 1}">${x + 1}</option>`
        ).join('\n')}
            </select>
            <button class="btn delete-btn" id="${product.product}">
              Delete
            </button>
          </div>
        </div>
      </li>
      `).join('\n')}
      </ul>
      <div class="cart-action">
        <h3>
        Subtotal (${cartItems.reduce((a, c) => a + c.quantity, 0)})
        : ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
        </h3>
        <button class="btn" id="checkout-btn">
          Proceed to checkout
        </button>
      </div>
    </div>
    `;
  },
}

export default CartRoute;