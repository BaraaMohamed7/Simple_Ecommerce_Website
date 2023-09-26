import Home from './routes/home.js';
import Product from './routes/product.js';
import parseRequestUrl, { loading } from './utils.js';
import Error404Screen from './routes/error404route.js'
import CartRoute from './routes/cartRoute.js';
import Search from './routes/Search.js';
import { getCartItems } from './localStorage.js';
import Categories from './routes/Categories.js';

const routes = {
  '/': Home,
  '/product/:id': Product,
  '/cart/:id': CartRoute,
  '/cart': CartRoute,
};
const titles = {
  '/': "Home",
  '/product/:id': "Product",
  '/cart/:id': "Cart",
  '/cart': "Cart",
}
const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const route = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const main = document.getElementById('main-container');
  loading()

  main.innerHTML = await route.render();

  document.title = `Baraa Ecommerce || ${titles[parseUrl]} `


  document.getElementById('categories').innerHTML = await Categories.render();
  Categories.after_render();
  document.getElementById('search').innerHTML = await Search.render();
  Search.after_render();

  document.getElementById('home-btn').addEventListener('click', async () => {
    loading();
    main.innerHTML = await Home.render();
  })

  route.hasOwnProperty('after_render') ? await route.after_render() : null;
  document.querySelector('.cart-amount').innerHTML = getCartItems() ? getCartItems().length : 0;
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);