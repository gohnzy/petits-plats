import { filters } from "./filterFactory.js";
import { article } from "./articleFactory.js";
import { searchBar } from "../utils/searchBar.js";
import { recipes } from "../../datas/recipes.js";
import { init } from "../index.js";

const ingredientFilter = document.querySelector(".ingredientFilter");
const applianceFilter = document.querySelector(".applianceFilter");
const ustensilFilter = document.querySelector(".ustensilFilter");

const section = document.querySelector(".recipes");
const bubbles = document.querySelector(".selectedFiltersBubbles");
const eachB = bubbles.querySelectorAll(".oneFilter");

const articleFactory = new article();


export class DOM {

    constructor() {

    }

    addBubble(inputValue) {
    
        const selectedFilterBubble = document.createElement("p");
        selectedFilterBubble.classList.add("oneFilter");
        
        selectedFilterBubble.innerText = inputValue;
        this.clearBubble(selectedFilterBubble);
        bubbles.appendChild(selectedFilterBubble);
        
      }
      
    clearBubble(target) {
      target.addEventListener("click", (event) => {
        event.target.remove();   

      });
    };

    createArticleList(datas) {
        articleFactory.init(section, datas);
    }

    refreshArticleList(datas, count) {
        const matchingArticle = articleFactory.createArticle(datas);
        this.refreshCount(count);
        section.appendChild(matchingArticle);
    }

    noResults() {
        section.innerHTML = "";
        const noResults = document.createElement("ul");
        const noResultsText = document.createElement("p");
        noResultsText.innerText="Aucune recette ne correspond à vos critères : ";
        noResults.appendChild(noResultsText);
        const allFilterDisplayed = bubbles.querySelectorAll(":nth-child(n+1)");
        allFilterDisplayed.forEach(element => {
          const notMatchingFilter = document.createElement("li");
          notMatchingFilter.innerText = element.innerText;
          noResults.appendChild(notMatchingFilter);
        });
        const exemple = document.createElement("i");
        exemple.innerText = 'Essayez plutôt : "Lait de coco", "Pizza"... ';
        noResults.appendChild(exemple);
        this.refreshCount([]);
        section.appendChild(noResults);
    }

    refreshCount(datas) {
        articleFactory.countRecipes(datas);
    }
}