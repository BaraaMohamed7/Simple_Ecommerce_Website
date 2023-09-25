import Home from './routes/home.js';
import Product from './routes/product.js';
import parseRequestUrl from './utils.js';
import Error404Screen from './routes/error404route.js'
import CartRoute from './routes/cartRoute.js';

const routes = {
  '/': Home,
  '/product/:id': Product,
  '/cart/:id': CartRoute,
  '/cart': CartRoute,
};
const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const route = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const main = document.getElementById('main-container');
  main.innerHTML = await route.render();
  await route.after_render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
