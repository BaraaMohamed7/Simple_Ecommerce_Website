import Home from '../routes/home.js';
import { rerender } from '../utils.js';
// import Rating from "../components/rating.js";

const Search = {
  render: async () => {
    let searchBar = document.getElementById("searchBar").value.toLowerCase();
    if (searchBar == "") return `<h3> Write something in search bar </h3>`;
    await rerender(Home);
    let products = Array.from(
      document.querySelectorAll(".product")
    ).filter(product => product.textContent.toLowerCase().includes(searchBar));

    console.log(products);
    if (products.length == 0) {
      return `<h3> No results </h3>`
    } else {
      let productsList = `
      <ul class="products">
      ${products.map((product) => `${product.outerHTML}`).join('\n')
        }
      </ul>
      `
      return productsList;
    }
  }
}

export default Search