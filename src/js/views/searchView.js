import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.resultsList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {

    if(title.length > limit) {
        const newTitle = [];
        // Split is going to split text by space here and save particular words into an array. Since we have an array, we can use reduce method on it.
        title.split(' ').reduce((acc,cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur); // cur is current word
            }
            return acc + cur.length; // updating acc
        }, 0); // 0 - starting value of acc

        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src=${recipe.image_url} alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.resultsList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => 
`
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numOfResults, resPerPage) => {
    const pages = Math.ceil(numOfResults / resPerPage); // ceil(4.1) = 5, ceil(2.6) = 3 ...
    let button;
    if(page === 1 && pages > 1) {
        // Button to go to next page
        button = createButton(page, 'next');
    } else if (page === pages && pages > 1) {
        // Button to go to prev page
        button = createButton(page, 'prev');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'next')}
            ${createButton(page, 'prev')}
        `;
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    console.log(recipes);
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length,resPerPage);
};