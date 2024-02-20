import { recipes } from "../datas/recipes.js";
import { article } from "./factories/articleFactory.js";
import { filters } from "./factories/filterFactory.js";
import { searchBar } from "./utils/searchBar.js";
import { normalizeChain } from "./utils/normalize.js";
import { DOM } from "./factories/DOM.js";

const submit = document.querySelector("form");
const input = document.getElementById('search');
const clearIcon = document.querySelector('.clear-icon');
const section = document.querySelector(".recipes");

const ingredientFilter = document.querySelector(".ingredientFilter");
const applianceFilter = document.querySelector(".applianceFilter");
const ustensilFilter = document.querySelector(".ustensilFilter");

const searchBarAction = new searchBar();
  
const createDOM = new DOM();

const filterFactory = new filters();

export function init(datas) {

  createDOM.createArticleList(datas);

  filterFactory.addFilters(ingredientFilter, applianceFilter, ustensilFilter, datas)

  searchBarAction.inputRefresh(input);

  submit.addEventListener("submit", (event) => {
    event.preventDefault();
    
    if(input.value.trim() !== "") {
      section.innerHTML = "";
      createDOM.addBubble(input.value);
      searchBarAction.inputStore();
      const newList = searchBarAction.searchBarFilter(input.value, datas);
      

      if(newList.length === 0){
        createDOM.noResults();
      }
      newList.forEach(r => {
        createDOM.refreshArticleList(r, newList);
      });
    }
    searchBarAction.inputRemove(datas);
    clearInput();
  });


  input.addEventListener("input", () => {
      toggleClearIcon();
  });

  clearIcon.addEventListener("click", () => {
      clearInput();
  })

}
function toggleClearIcon() {

  if (input.value.trim() !== '') {
    clearIcon.style.display = 'block';
  } else {
    clearIcon.style.display = 'none';
  }
}

export function clearInput() {
  input.value = '';
  toggleClearIcon();
}

init(recipes);

