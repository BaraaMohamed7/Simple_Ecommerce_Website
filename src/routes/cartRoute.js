import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import parseRequestUrl from "../utils.js";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(x => x.product === item.product);

  if (existItem) {
    cartItems = cartItems.map((x) => x.product === item.product ? item : x)
  } else {
    cartItems = [...cartItems, item]
  }

  setCartItems(cartItems);
}

const CartRoute = {
  after_render: () => {

  },
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
      });
    }
    const cartItems = getCartItems();
    return `
    <div class="cartItems">
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
              <option value="1">1</option>
            </select>
            <Button class="btn delete-btn" type="button" id="${product.product}">
              Delete
            </button>
          </div>
        </div>
      </li>
      `).join('\n')}
      </ul>
    </div>
    `;
  },
}

export default CartRoute;