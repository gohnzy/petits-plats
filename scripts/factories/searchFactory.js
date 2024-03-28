import { normalizeFunction } from "../utils/normalize.js";

export class searchAlgos {

    recipeMatchingList = [];

    constructor() {
    }

    inputStore(inputValue, state) {
        const inputNormalized = normalizeFunction(inputValue);
        if(!state.some(element => element.inputNormalized === inputNormalized)) {
            state.push({
                inputNormalized: inputNormalized,
                inputValue: inputValue
            });
        };
    };

    inputRemove(state, bubble) {
        const filterText = normalizeFunction(bubble);
        const index = state.findIndex(item => item.inputNormalized === filterText);
        if (index !== -1) {
            state.splice(index, 1);
        }
    };

    searchBarFilter(checked, inputValue, datas) {
        if (inputValue) {
            this.recipeMatchingList = datas.filter(recipe => {
                this.recipeInfos = this.stockNormalizedRecipeInfos(recipe);
                
                return this.checkInputAgainstFilter(checked, this.recipeInfos);
            });
        }
        
        return this.recipeMatchingList;
    };

    checkInputAgainstFilter(checked, recipeInfos) {
        return checked.every(filter => {
            return recipeInfos.name.includes(filter.inputNormalized) || 
                recipeInfos.ingredient.includes(filter.inputNormalized) ||
                recipeInfos.description.includes(filter.inputNormalized) ||
                recipeInfos.appliance.includes(filter.inputNormalized) ||
                recipeInfos.ustensils.includes(filter.inputNormalized);
        });
    };

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

// inputStore x 2,498,295 ops/sec ±0.43% (67 runs sampled)
// inputRemove x 2,447,895 ops/sec ±0.29% (67 runs sampled)
// searchBarFilter x 21,117 ops/sec ±0.28% (67 runs sampled)