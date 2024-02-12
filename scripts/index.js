import { recipes } from "../datas/recipes.js";
import { article } from "./factories/articleFactory.js";
import { filters } from "./factories/filterFactory.js";
import { searchBar } from "./utils/searchBar.js";
import { addBubble } from "./utils/bubbles.js";
import { normalizeChain } from "./utils/normalize.js";
import { DOM } from "./factories/DOM.js";

const submit = document.querySelector("form");
const input = document.getElementById('search');
const clearIcon = document.querySelector('.clear-icon');

function init(datas) {

  const searchBarAction = new searchBar();

  searchBarAction.inputRefresh(input);

  submit.addEventListener("submit", (event) => {
    if(input.value.trim() !== "") {
      searchBarAction.searchBarFilter(input.value, datas);
      searchBarAction.refreshDOM();
      createDOM.newBubble(input.value);
    }
    event.preventDefault();
    clearInput();
  });


  input.addEventListener("input", () => {
      toggleClearIcon();
  });

  clearIcon.addEventListener("click", () => {
      clearInput();
  })

  const createDOM = new DOM();
  createDOM.createArticleList(datas)
}
function toggleClearIcon() {

  if (input.value.trim() !== '') {
    clearIcon.style.display = 'block';
  } else {
    clearIcon.style.display = 'none';
  }
}

function clearInput() {
input.value = '';
toggleClearIcon();
}

init(recipes);
