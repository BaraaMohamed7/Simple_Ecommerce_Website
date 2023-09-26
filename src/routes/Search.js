import Home from '../routes/home.js';
import { rerender } from '../utils.js';
// import Rating from "../components/rating.js";

const Search = {
  render: async () => {
    return `
    <form class="search-form" action="#">
      <input type="text" name="searchBar" id="searchBar" placeholder="Search">
        <button class="btn" type="submit">
          <i class="fa-solid fa-magnifying-glass"></i></button>
    </form>
    `
  },
  after_render: () => {
    let searchForm = document.querySelector(".search-form");
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let searchWord = document.getElementById("searchBar").value.toLowerCase();

      const main = document.getElementById('main-container');


      if (searchWord == "") main.innerHTML = `<h3> Write something in search bar </h3>`;
      await rerender(Home);
      let products = Array.from(
        document.querySelectorAll(".product")
      ).filter(product => product.textContent.toLowerCase().includes(searchWord));

      if (products.length == 0) {
        main.innerHTML = `<h3> No results </h3>`
      } else {
        let productsList = `
          <ul class="products">
            ${products.map((product) => `${product.outerHTML}`).join('\n')}
          </ul>
          `
        main.innerHTML = productsList;
      }
    })
  }
}

export default Search

