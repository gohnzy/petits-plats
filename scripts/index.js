import { recipes } from "../datas/recipes.js";
import { article } from "./factories/articleFactory.js";
import { filters } from "./factories/filterFactory.js";
import { searchBar } from "./utils/algo.js";

const submit = document.querySelector("form");

const searchBarAction = new searchBar();

submit.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBarAction.inputSend(input.value);
    clearInput();
})



const input = document.getElementById('search');
searchBarAction.inputRefresh(input)
const clearIcon = document.querySelector('.clear-icon');

input.addEventListener("input", () => {
    toggleClearIcon();
});

clearIcon.addEventListener("click", () => {
    clearInput();
})

function toggleClearIcon() {

    if (input.value.trim() !== '') {
      clearIcon.style.display = 'block';
    } else {
      clearIcon.style.display = 'none';
    }
  }

function clearInput() {
var input = document.getElementById('search');
input.value = '';
toggleClearIcon();
}

function init() {
    const articleFactory = new article();

    const section = document.querySelector(".recipes");
    articleFactory.init(section);
    articleFactory.createArticle(recipes);
    articleFactory.countRecipes(recipes);

    const filterFactory = new filters();

    const ingredientFilter = document.querySelector(".ingredientFilter");
    const applianceFilter = document.querySelector(".applianceFilter");
    const ustensilFilter = document.querySelector(".ustensilFilter");

    filterFactory.addFilters(ingredientFilter, applianceFilter, ustensilFilter);
}

init()