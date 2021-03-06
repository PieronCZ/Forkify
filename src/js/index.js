import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Linked recipes
 */

const state = {};

const controlSearch = async () => {
  // async - because of await inside
  // 1) Get query from the view
  const query = searchView.getInput();

  if (query) {
    // 2) Create new search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4) Search for recipes
    await state.search.getResults();

    // 5) Reder results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10); // 10 is base ( dec, bin)
      searchView.clearResults();
      searchView.renderResults(state.search.result, goToPage);
  }
});
