export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  resultsList: document.querySelector(".results__list"),
  searchRes: document.querySelector(".results"),
};

export const elementStrings = {
  loader: "loader",
};

// renderLoader fcn is in base because of reusability
export const renderLoader = (parent) => {
  const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

// hide spinner
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
