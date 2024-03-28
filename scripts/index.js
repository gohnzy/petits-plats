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
const ingredientSearch = document.getElementById("ingredientSearch");
const ingredientSubmit = document.querySelector(".ingredientSearch");
const ingredientSelected = ingredientFilter.querySelector(".selectedFilters");
const allIngredientsOptions = ingredientFilter.querySelector(".allFilters");


const applianceFilter = document.querySelector(".applianceFilter");
const applianceSearch = document.getElementById("applianceSearch");
const applianceSubmit = document.querySelector(".applianceSearch");
const applianceSelected = applianceFilter.querySelector(".selectedFilters");
const allAppliancesOptions = applianceFilter.querySelector(".allFilters");

const ustensilFilter = document.querySelector(".ustensilFilter");
const ustensilSearch = document.getElementById("ustensilSearch");
const ustensilSubmit = document.querySelector(".ustensilSearch");
const ustensilSelected = ustensilFilter.querySelector(".selectedFilters");
const allUstensilsOptions = ustensilFilter.querySelector(".allFilters");

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
  function initialDisplay() {
 
    DOM.displayRecipeList(section, recipes);
    DOM.displayFilters(allIngredientsOptions, allAppliancesOptions, allUstensilsOptions, allIngredients, allAppliances, allUstensils);
  
  }

  initialDisplay()

  // Event listeners
  mainSearch.addEventListener("submit", handleSubmit);
  mainSearch.addEventListener("input", handleInput);
  clearIcon.addEventListener("click", handleClearIcon);

  const ingr = [];

  ingredientSubmit.addEventListener("submit", (event) => {event.preventDefault()});
  ingredientSearch.addEventListener("input", (event) => {
    const labels = allIngredientsOptions.querySelectorAll("label");
    labels.forEach(l => {
      ingr.push({
        name: l.innerText,
        norm: normalizeFunction(l.innerText)
      })
    })
    handleFilterInput(event, ingr, ingredientFilter, allIngredientsOptions);
  });

  const app = [];

  applianceSubmit.addEventListener("submit", (event) => {event.preventDefault()});
  applianceSearch.addEventListener("input", (event) => {
    const labels = allAppliancesOptions.querySelectorAll("label");
    labels.forEach(l => {
      app.push({
        name: l.innerText,
        norm: normalizeFunction(l.innerText)
      })
    })
    handleFilterInput(event, app, applianceFilter, allAppliancesOptions);
  });

  const ust = [];

  ustensilSubmit.addEventListener("submit", (event) => {event.preventDefault()});
  ustensilFilter.addEventListener("input", (event) => {
    const labels = allUstensilsOptions.querySelectorAll("label");
    labels.forEach(l => {
      ust.push({
        name: l.innerText,
        norm: normalizeFunction(l.innerText)
      })
      console.log(ust);
    })
    handleFilterInput(event, ust, ustensilFilter, allUstensilsOptions);
  });
  allIngredientsOptions.addEventListener("change", (event) => {
    handleFilterChange(event, ingredientSelected);
    ingredientSearch.value ="";
  });
  ingredientSelected.addEventListener("change", (event) => {
    handleFilterChange(event, ingredientSelected);
    ingredientSearch.value ="";
  });
  allAppliancesOptions.addEventListener("change", (event) => {
    handleFilterChange(event, applianceSelected);
    applianceSearch.value ="";
  });
  applianceSelected.addEventListener("change", (event) => {
    handleFilterChange(event, applianceSelected);
    applianceSearch.value ="";
  });
  allUstensilsOptions.addEventListener("change", (event) => {
    handleFilterChange(event, ustensilSelected);
    ustensilSearch.value ="";
  });
  ustensilSelected.addEventListener("change", (event) =>{
    handleFilterChange(event, ustensilSelected);
    ustensilSearch.value ="";
  });

  function handleSubmit(event) {
    event.preventDefault();
    if(input.value.trim() !== "") {
      search();
    }
    
    DOM.clearInput(input, clearIcon, checked.filterChecked);
  }

  function handleInput(event) {
    console.log(checked.filterChecked);
    DOM.toggleClearIcon(input, clearIcon);
    if(event.inputType === "deleteContentBackward") {
      checked.filterChecked.pop();
      if(event.target.value.length == 0) {
        initialDisplay();
      } else {
        initialDisplay();
        inputSearch(event.target.value);
      }
    };
    if(event.target.value.length > 2 && event.target.value.trim() !== "" && bubbleSection.childNodes.length >= 1) {
      if (event.target.value.length > 3) {
        checked.filterChecked.pop();
      }
      inputSearch(event.target.value);  
    } 
  }

  function handleClearIcon() {
    checked.filterChecked.pop();
    const searchAlgo = new searchAlgos();

    const searchResult = searchAlgo.searchBarFilter(checked.filterChecked, input, recipes);
    updateDisplay(searchResult);
    DOM.clearInput(input, clearIcon);
  }

 function handleFilterInput(event, allOptions, filterSection, options) {
  const inputValue = event.target.value
    if(!inputValue.trim().length == 0) {
      let optionsFilter = allOptions.filter(o => o.norm.includes(normalizeFunction(inputValue)));
      DOM.emptyFilters(filterSection);
      DOM.createIngredientsFilter2(options, optionsFilter);
    } else {
      DOM.emptyFilters(filterSection);
      DOM.createIngredientsFilter2(options, allOptions);
    };

}
  function bubbleClickHandler(event) {
    const bubbleText = event.target.innerText;
    const selectedFilters = document.querySelectorAll('.selectedFilter');

    selectedFilters.forEach(filter => {
        if (normalizeFunction(filter.innerText) === normalizeFunction(bubbleText)) {
            filter.querySelector('input').checked = false;
            filter.classList.remove('selectedFilter');
        }
    });

    reSearch(checked.filterChecked, this);
    this.remove();
}

  function handleFilterChange(event, filterSection) {
    event.preventDefault();
    if (input.value.length !== 0) {
      input.value ="";
      checked.filterChecked.pop();
    }
    const getOptionInfo = DOM.filterChangeDisplay(event, filterSection);
    if(getOptionInfo.checked == 1) {
      filterSearch(getOptionInfo.text);
    } else {
      filterReSearch(getOptionInfo.text);
    }
  }

  function search() {
    const searchAlgo = new searchAlgos();
    searchAlgo.inputStore(input.value, checked.filterChecked);
    DOM.bubbleList(checked.filterChecked, bubbleSection);
    
    const searchResult = searchAlgo.searchBarFilter(checked.filterChecked, input.value, recipes);
    updateDisplay(searchResult);
    const ingredientsFilterChoices = ingredientFilter.querySelectorAll(".labelForChoice");
    ingredientsFilterChoices.forEach(f => {
      if (normalizeFunction(input.value) == normalizeFunction(f.innerText)) {
        const newF = f
        f.remove();
        newF.querySelector("input").checked = true;
        newF.classList = "labelForChoice selectedFilter";
        ingredientSelected.appendChild(newF); 
      }
    });
    const appliancesFilterChoices = applianceFilter.querySelectorAll(".labelForChoice");
    appliancesFilterChoices.forEach(f => {
      if(normalizeFunction(input.value) == normalizeFunction(f.innerText)){
        const newF = f
        f.remove();
        newF.querySelector("input").checked = true;
        newF.classList = "labelForChoice selectedFilter";
        applianceSelected.appendChild(newF); 
      }
    });
    const ustensilsFilterChoices = ustensilFilter.querySelectorAll(".labelForChoice");
    ustensilsFilterChoices.forEach(f => {
      if(normalizeFunction(input.value) == normalizeFunction(f.innerText)){
        const newF = f
        f.remove();
        newF.querySelector("input").checked = true;
        newF.classList = "labelForChoice selectedFilter";
        ustensilSelected.appendChild(newF); 
      }
    });
  }

  function inputSearch(filterInput) {
    const searchAlgo = new searchAlgos();
    searchAlgo.inputStore(filterInput, checked.filterChecked);
    
    const searchResult = searchAlgo.searchBarFilter(checked.filterChecked, filterInput, recipes);
    updateDisplay(searchResult, input.value);
}

  function reSearch(state, bubble) {
    const searchAlgo = new searchAlgos();
    searchAlgo.inputRemove(state, bubble.innerText);
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
      if (normalizeFunction(input) === normalizeFunction(b.innerText)) {
        b.remove();
      }
    });
    updateDisplay(searchResult);
  }

  function updateDisplay(result, inputValue) {
    section.innerHTML = "";
    DOM.displayRecipeList(section, result, inputValue);
    DOM.emptyFilters(ingredientFilter, applianceFilter, ustensilFilter);
    const newList = new getDatas(result);
    const a = newList.getAllIngredients();
    const b = newList.getAllAplliances();
    const c = newList.getAllUstensils();
    DOM.displayFilters(allIngredientsOptions, allAppliancesOptions, allUstensilsOptions, a, b, c);
    
    addBubbleEventListeners();
  }
  

  function addBubbleEventListeners() {
    const bubbles = bubbleSection.querySelectorAll(".oneFilter");
  
    bubbles.forEach(b => b.removeEventListener("click", bubbleClickHandler));
  
    bubbles.forEach(b => b.addEventListener("click", bubbleClickHandler));
  }
}

init();

function dropdownOpenClose() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector("button");

    button.addEventListener("click", (event) => {
      event.stopPropagation();

      if (dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");
      } else {
        dropdown.classList.add("open");
      }
    });

    document.addEventListener("click", (event) => {

      if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.classList.remove("open");
      }
    });
  });
}

dropdownOpenClose();