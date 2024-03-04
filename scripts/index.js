import { recipes } from "../datas/recipes.js";
import { getDatas } from "./factories/datas.js";
import { displayDOM } from "./factories/displayDOM.js";
import { searchAlgos } from "./factories/searchFactory.js";
import { normalizeFunction } from "./utils/normalize.js";

// DOM Elements
const mainSearch = document.querySelector("nav form");
const input = document.getElementById("search");
const clearIcon = document.querySelector('.clear-icon');
const ingredientFilter = document.querySelector(".ingredientFilter");
const ingredientSelected = ingredientFilter.querySelector(".selectedFilters");
const applianceFilter = document.querySelector(".applianceFilter");
const applianceSelected = applianceFilter.querySelector(".selectedFilters");
const ustensilFilter = document.querySelector(".ustensilFilter");
const ustensilSelected = ustensilFilter.querySelector(".selectedFilters");
const bubbleSection = document.querySelector(".selectedFiltersBubbles");
const section = document.querySelector(".recipes");

// Checked filters
const checked = { filterChecked: [] };

function init() {
  const allRecipes = new getDatas(recipes);
  const allIngredients = allRecipes.getAllIngredients();
  const allAppliances = allRecipes.getAllAplliances();
  const allUstensils = allRecipes.getAllUstensils();
  const DOM = new displayDOM();

  // Initial display
  DOM.displayRecipeList(section, recipes);
  DOM.displayFilters(ingredientFilter, applianceFilter, ustensilFilter, allIngredients, allAppliances, allUstensils);

  // Event listeners
  mainSearch.addEventListener("submit", handleSubmit);
  mainSearch.addEventListener("input", handleInput);
  clearIcon.addEventListener("click", handleClearIcon);
  ingredientFilter.addEventListener("submit", handleFilterSubmit);
  applianceFilter.addEventListener("submit", handleFilterSubmit);
  ustensilFilter.addEventListener("submit", handleFilterSubmit);
  ingredientFilter.addEventListener("change", (event) => handleFilterChange(event, ingredientSelected));
  applianceFilter.addEventListener("change", (event) => handleFilterChange(event, applianceSelected));
  ustensilFilter.addEventListener("change", (event) => handleFilterChange(event, ustensilSelected));

  function handleSubmit(event) {
    event.preventDefault();
    search();
    DOM.clearInput(input, clearIcon);
  }

  function handleInput() {
    DOM.toggleClearIcon(input, clearIcon);
  }

  function handleClearIcon() {
    DOM.clearInput(input, clearIcon);
  }

  function handleFilterSubmit(event) {
    event.preventDefault();
  }

  function bubbleClickHandler(event) {
    const bubbleText = event.target.innerText;
    const selectedFilters = document.querySelectorAll('.selectedFilter');

    selectedFilters.forEach(filter => {
        if (filter.innerText === bubbleText) {
            filter.querySelector('input').checked = false;
            filter.classList.remove('selectedFilter');
        }
    });

    reSearch(checked.filterChecked, this);
    this.remove();
}

  function handleFilterChange(event, filterSection) {
    const getOptionInfo = DOM.filterChangeDisplay(event, filterSection);
    if(getOptionInfo.checked == 1) {
      filterSearch(getOptionInfo.text)
    } else {
      filterReSearch(getOptionInfo.text);
    }
  }

  function search() {
    const searchAlgo = new searchAlgos();
    searchAlgo.inputStore(input.value, checked.filterChecked);
    DOM.bubbleList(checked.filterChecked, bubbleSection);
    const ingredientsFilterChoices = ingredientFilter.querySelectorAll(".labelForChoice");
    ingredientsFilterChoices.forEach(f => {
      if(normalizeFunction(input.value) == normalizeFunction(f.innerText)){
        f.querySelector("input").checked = true;
        f.classList = "labelForChoice selectedFilter";
      }
    });
    const appliancesFilterChoices = applianceFilter.querySelectorAll(".labelForChoice");
    appliancesFilterChoices.forEach(f => {
      if(normalizeFunction(input.value) == normalizeFunction(f.innerText)){
        f.querySelector("input").checked = true;
        f.classList = "labelForChoice selectedFilter";
      }
    });
    const ustensilsFilterChoices = ustensilFilter.querySelectorAll(".labelForChoice");
    ustensilsFilterChoices.forEach(f => {
      if(normalizeFunction(input.value) == normalizeFunction(f.innerText)){
        f.querySelector("input").checked = true;
        f.classList = "labelForChoice selectedFilter";
      }
    });
    const searchResult = searchAlgo.searchBarFilter(checked.filterChecked, input.value, recipes);
    updateDisplay(searchResult);
  }

  function reSearch(state, bubble) {
    const searchAlgo = new searchAlgos();
    searchAlgo.inputRemove(state, bubble.innerText);
    const searchResult = searchAlgo.searchBarFilter(checked.filterChecked, bubble, recipes);
    updateDisplay(searchResult);
  }

  function filterSearch(input) {
    const searchAlgo = new searchAlgos();
    searchAlgo.inputStore(input, checked.filterChecked);
    DOM.bubbleList(checked.filterChecked, bubbleSection);
    const searchResult = searchAlgo.searchBarFilter(checked.filterChecked, input, recipes);
    updateDisplay(searchResult);
  }

  function filterReSearch(input) {
    const searchAlgo = new searchAlgos();
    searchAlgo.inputRemove(checked.filterChecked, input);
    DOM.bubbleList(checked.filterChecked, bubbleSection);
    const searchResult = searchAlgo.searchBarFilter(checked.filterChecked, input, recipes);
    const allBubbles = document.querySelectorAll(".oneFilter");
    allBubbles.forEach(b => {
      if (input === b.innerText) {
        b.remove();
      }
    });
    updateDisplay(searchResult);
  }

  function updateDisplay(result) {
    section.innerHTML = "";
    DOM.displayRecipeList(section, result);
    DOM.emptyFilters(ingredientFilter, applianceFilter, ustensilFilter);
    const newList = new getDatas(result);
    const a = newList.getAllIngredients();
    const b = newList.getAllAplliances();
    const c = newList.getAllUstensils();
    DOM.displayFilters(ingredientFilter, applianceFilter, ustensilFilter, a, b, c);
    addBubbleEventListeners();
  }

  function addBubbleEventListeners() {
    const bubbles = bubbleSection.querySelectorAll(".oneFilter");
  
    bubbles.forEach(b => b.removeEventListener("click", bubbleClickHandler));
  
    bubbles.forEach(b => b.addEventListener("click", bubbleClickHandler));
  }
}

init();