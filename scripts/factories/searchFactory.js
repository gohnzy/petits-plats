import { normalizeFunction } from "../utils/normalize.js";


/// Class gérant la recherche 

export class searchAlgos {

    recipeMatchingList = [];

    constructor() {
    }

    // Stock la valeur de l'input / du filter
    inputStore(inputValue, state) {
        const inputNormalized = normalizeFunction(inputValue);
        if(!state.some(element => element.inputNormalized === inputNormalized)) {
            state.push({
                inputNormalized: inputNormalized,
                inputValue: inputValue
            });
        };
    };

    // Retire la valeur
    inputRemove(state, bubble) {
        const filterText = normalizeFunction(bubble);
        const index = state.findIndex(item => item.inputNormalized === filterText);
        if (index !== -1) {
            state.splice(index, 1);
        }
    };

    // Normalize les données et cherche à travers pour la recherche principale
    searchBarFilter(checked, inputValue, datas) {
        if (inputValue) {
            this.recipeMatchingList = datas.filter(recipe => {
                this.recipeInfos = this.stockNormalizedRecipeInfos(recipe);
                
                return this.checkInputAgainstFilter(checked, this.recipeInfos);
            });
        }
        
        return this.recipeMatchingList;
    };

    // Normalize les données et cherche à travers pour la recherche via les filtres
    searchFilter(checked, inputValue, datas) {
        if (inputValue) {
            this.recipeMatchingList = datas.filter(recipe => {
                this.recipeInfos = this.stockNormalizedRecipeInfos(recipe);
                
                return this.checkInputFilter(checked, this.recipeInfos);
            });
        }
        
        return this.recipeMatchingList;
    };

    // Cherche dans les données pour la recherche principale
    checkInputAgainstFilter(checked, recipeInfos) {
        return checked.every(filter => {
            return recipeInfos.name.includes(filter.inputNormalized) || 
                recipeInfos.ingredient.includes(filter.inputNormalized) ||
                recipeInfos.description.includes(filter.inputNormalized) 
        });
    };

    // Cherche dans les données pour la recherche vie les filtres
    checkInputFilter(checked, recipeInfos) {
        return checked.every(filter => {
            return recipeInfos.name.includes(filter.inputNormalized) || 
                recipeInfos.ingredient.includes(filter.inputNormalized) ||
                recipeInfos.description.includes(filter.inputNormalized) ||
                recipeInfos.appliance.includes(filter.inputNormalized) ||
                recipeInfos.ustensils.includes(filter.inputNormalized)
        });
    };

    // Normalize les données 
    stockNormalizedRecipeInfos(recipe) {
        let testName = recipe.name.toLowerCase();
        let testNameNormalized = normalizeFunction(testName);
        
        let thisRecipeIngredients = recipe.ingredients;
        let testIngredientsNormalized = "";
        thisRecipeIngredients.forEach(i => {
            let testIngredient = i.ingredient.toLowerCase();
            testIngredientsNormalized += normalizeFunction(testIngredient) + " ";
        });
        
        let testDescription = recipe.description.toLowerCase();
        let testDescriptionNormalized = normalizeFunction(testDescription);
        
        let testAppliances = recipe.appliance.toLowerCase();
        let testAppliancesNormalized = normalizeFunction(testAppliances);
        
        let thisRecipeUstensils = recipe.ustensils;
        let testUstensilNormalized = "";
        thisRecipeUstensils.forEach(u => {
            let testUstensil = u.toLowerCase();
            testUstensilNormalized += normalizeFunction(testUstensil) + " ";
        });
    
    
        return {
            name: testNameNormalized, 
            ingredient: testIngredientsNormalized.trim(),
            description: testDescriptionNormalized,
            appliance: testAppliancesNormalized,
            ustensils: testUstensilNormalized
        };
    };
}
