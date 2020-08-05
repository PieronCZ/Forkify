import Search from './models/Search';

/** Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Linked recipes
*/

const state = {};

const controlSearch = async () => { // async - because of await inside
    // 1) Get query from the view
    const query = 'pizza' // TODO

    if (query) {
        // 2) Create new search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Reder results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

search.getResults();