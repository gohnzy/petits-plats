import { recipes } from "../../datas/recipes.js";
import { article } from "../factories/articleFactory.js";
import { normalizeChain } from "./normalize.js";
import { addBubble } from "./bubbles.js";
import { DOM } from "../factories/DOM.js";

export class searchBar {   

    normalize = new normalizeChain();

    newDOM = new DOM();

    recipeMatchingList = [];

    filterChecked = [];
    filterOwnResults = [];

    constructor() {
    }

    searchBarFilter(inputValue, datas) {
        if (inputValue) {
            let containsMatch = false;
            
            
            datas.forEach(recipe => {

                const testId = recipe.id;

                const testName = recipe.name.toLowerCase();
                const testNameNormalized = this.normalize.normalizeFunction(testName);

                const thisRecipeIngredients = recipe.ingredients;
                let testIngredientsNormalized = "";
                thisRecipeIngredients.forEach(i => {
                    const testIngredient = i.ingredient.toLowerCase();
                    testIngredientsNormalized = this.normalize.normalizeFunction(testIngredient);
                });

                const testDescription = recipe.description.toLowerCase();
                const testDescriptionNormalized = this.normalize.normalizeFunction(testDescription);

                const testAppliances = recipe.appliance.toLowerCase();
                const testAppliancesNormalized = this.normalize.normalizeFunction(testAppliances);

                const thisRecipeUstensils = recipe.ustensils;
                let testUstensilNormalized = "";
                thisRecipeUstensils.forEach(u => {
                    const testUstensil = u.toLowerCase();
                    testUstensilNormalized = this.normalize.normalizeFunction(testUstensil);
                });

                if (testNameNormalized.includes(this.normalize.normalizeFunction(inputValue)) || 
                    testIngredientsNormalized.includes(this.normalize.normalizeFunction(inputValue)) ||
                    testDescriptionNormalized.includes(this.normalize.normalizeFunction(inputValue)) ||
                    testAppliancesNormalized.includes(this.normalize.normalizeFunction(inputValue)) ||
                    testUstensilNormalized.includes(this.normalize.normalizeFunction(inputValue))) {
                    this.containsMatch = true;
                    if(this.recipeMatchingList.some(m => m.id === testId)) {
                        // console.log("La recette suivante est déjà intégrée : ", testId);
                    } else {
                        this.recipeMatchingList.push(recipe);
                        if(!this.filterChecked.includes(this.normalize.normalizeFunction(inputValue))) {
                            this.filterChecked.push(inputValue);
                        };
                    };
                } else {
                    
                };
            });
        }

        
        return {recipeMatchingList: this.recipeMatchingList, filterChecked: this.filterChecked, containsMatch: this.containsMatch}
    }

    refreshDOM() {
        this.newDOM.createArticleList(this.searchBarFilter().recipeMatchingList)
    }

    inputRefresh(input) {
        input.addEventListener("keydown", (event) => {
            if(event.target.value.length > 2 && event.target.value.trim() !== "") {
                if(event.keyCode === 8) {
                    
                };
            } else {
                console.log("Saisie vide");
            };
        });
    };

    domRefresh(inputValue) {
        
        if(inputValue.trim() !== "") {
           
        } else {
            console.log("Saisie vide ou incorrecte");
        }
        // };
      // });
    }
};
