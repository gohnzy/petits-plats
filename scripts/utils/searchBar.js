import { recipes } from "../../datas/recipes.js";
import { article } from "../factories/articleFactory.js";
import { normalizeChain } from "./normalize.js";
import { DOM } from "../factories/DOM.js";
import { init } from "../index.js";


const section = document.querySelector(".recipes");
const bubbles = document.querySelector(".selectedFiltersBubbles");

export class searchBar {   

    normalize = new normalizeChain();

    newDOM = new DOM();

    recipeMatchingList = [];

    filterChecked = [];

    containsMatch = false;

    recipeInfos = {};

    constructor() {
    }

    inputStore() {
        // if (!this.filterChecked.includes(this.normalize.normalizeFunction(inputValue))) {
        //     this.filterChecked.push(this.normalize.normalizeFunction(inputValue));
        // } else {
        //     console.log(inputValue, " est déjà dans ", this.filterChecked);
        // }
        const tags =  bubbles.querySelectorAll(".oneFilter");
        tags.forEach(tag => {
            if(tags && !this.filterChecked.includes(this.normalize.normalizeFunction(tag.innerText))){
                this.filterChecked.push(this.normalize.normalizeFunction(tag.innerText));
            }
        })

        return this.filterChecked
        
    }

    inputRemove(datas) {
        const allFilterDisplayed = bubbles.querySelectorAll(":nth-child(n+1)");
        allFilterDisplayed.forEach(element => {
            element.addEventListener("click", ()=> {
                const filterText = this.normalize.normalizeFunction(element.innerText);
                const index = this.filterChecked.indexOf(filterText);
                if (index !== -1) {
                    this.filterChecked.splice(index, 1);
                    console.log("Élément supprimé du tableau filterChecked : ", filterText);
                    console.log(this.filterChecked);
                    this.refreshPage(datas);
                } else {
                    console.log("L'élément n'a pas été trouvé dans filterChecked.");
                }
                if(bubbles.childNodes.length === 1) {
                    init(datas);
                } 
            });
        });    
    }

    refreshPage(datas) {
        section.innerHTML = "";
        let newList = [];
        this.filterChecked.forEach(f=> {
            newList = this.searchBarFilter(f, datas);
        })
        
        newList.forEach(r => {
            this.newDOM.refreshArticleList(r, newList);
        });

        if(newList.length ===0 ) {
            this.newDOM.noResults();
        }
    }

    searchBarFilter(inputValue, datas) {
        if (inputValue) {
            this.recipeMatchingList = datas.filter(recipe => {
                this.recipeInfos = this.stockNormalizedRecipeInfos(recipe);
                
                return this.checkInputAgainstFilter(this.recipeInfos);
            });
        }

        return this.recipeMatchingList;
    }

    filterTags(datas) {
        this.recipeMatchingList = datas.filter(recipe => {
            this.recipeInfos = this.stockNormalizedRecipeInfos(recipe);
            
            return this.checkInputAgainstFilter(this.recipeInfos);
        });
        return this.recipeMatchingList;
    }

    checkInputAgainstFilter(recipeInfos) {
        return this.filterChecked.every(filter => {
            return recipeInfos.name.includes(filter) || 
                recipeInfos.ingredient.includes(filter) ||
                recipeInfos.description.includes(filter) ||
                recipeInfos.appliance.includes(filter) ||
                recipeInfos.ustensils.includes(filter);
        });
    }

    stockNormalizedRecipeInfos(recipe) {
        let testName = recipe.name.toLowerCase();
        let testNameNormalized = this.normalize.normalizeFunction(testName);
        
        let thisRecipeIngredients = recipe.ingredients;
        let testIngredientsNormalized = "";
        thisRecipeIngredients.forEach(i => {
            let testIngredient = i.ingredient.toLowerCase();
            testIngredientsNormalized = this.normalize.normalizeFunction(testIngredient);
        });
        
        let testDescription = recipe.description.toLowerCase();
        let testDescriptionNormalized = this.normalize.normalizeFunction(testDescription);
        
        let testAppliances = recipe.appliance.toLowerCase();
        let testAppliancesNormalized = this.normalize.normalizeFunction(testAppliances);
        
        let thisRecipeUstensils = recipe.ustensils;
        let testUstensilNormalized = "";
        thisRecipeUstensils.forEach(u => {
            let testUstensil = u.toLowerCase();
            testUstensilNormalized = this.normalize.normalizeFunction(testUstensil);
        });


        return {name: testNameNormalized, 
                ingredient: testIngredientsNormalized,
                description: testDescriptionNormalized,
                appliance: testAppliancesNormalized,
                ustensils: testUstensilNormalized};
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
