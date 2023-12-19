import { recipes } from "../datas/recipes.js";
import { article } from "./factories/articleFactory.js";
import { filters } from "./factories/filterFactory.js";

const sub = document.querySelector("form")

sub.addEventListener("submit", (event) => {
    event.preventDefault()
})


var input = document.getElementById('search');
var clearIcon = document.querySelector('.clear-icon');

input.addEventListener("input", () => {
    toggleClearIcon()
});

clearIcon.addEventListener("click", () => {
    clearInput()
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

    const ingredientFilter = document.querySelector(".forIngredients");
    filterFactory.addFilters(ingredientFilter);
}

init()