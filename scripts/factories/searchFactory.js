import { normalizeFunction } from "../utils/normalize.js";

/// Class gérant la recherche
export class searchAlgos {

    recipeMatchingList = [];

    constructor() {
    }

     // Stock la valeur de l'input / du filter
    inputStore(inputValue, state) {
        const inputNormalized = normalizeFunction(inputValue);
        let exists = false;
        for (let i = 0; i < state.length; i++) {
            if (state[i].inputNormalized === inputNormalized) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            state.push({
                inputNormalized,
                inputValue
            });
        }
    }
    
     // Retire la valeur
    inputRemove(state, bubble) {
        const filterText = normalizeFunction(bubble);
        let indexToRemove = -1;
        for (let i = 0; i < state.length; i++) {
            if (state[i].inputNormalized === filterText) {
                indexToRemove = i;
                break;
            }
        }
        if (indexToRemove !== -1) {
            state.splice(indexToRemove, 1);
        }
    }

    // Normalize les données et cherche à travers pour la recherche principale
    searchBarFilter(checked, inputValue, datas) {
        const recipeMatchingList = [];
        if (inputValue) {
            for (let i = 0; i < datas.length; i++) {
                const recipe = datas[i];
                const recipeInfos = this.stockNormalizedRecipeInfos(recipe);
                if (this.checkInputAgainstFilter(checked, recipeInfos)) {
                    recipeMatchingList.push(recipe);
                }
            }
        }
        return recipeMatchingList;
    };

    // Normalize les données et cherche à travers pour la recherche via les filtres
    searchFilter(checked, inputValue, datas) {
        const recipeMatchingList = [];
        if (inputValue) {
            for (let i = 0; i < datas.length; i++) {
                const recipe = datas[i];
                const recipeInfos = this.stockNormalizedRecipeInfos(recipe);
                if (this.checkInputFilter(checked, recipeInfos)) {
                    recipeMatchingList.push(recipe);
                }
            }
        }
        return recipeMatchingList;
    };
    
    // Cherche dans les données pour la recherche principale
    checkInputAgainstFilter(checked, recipeInfos) {
        for (let i = 0; i < checked.length; i++) {
            const filter = checked[i];
            if (!(
                recipeInfos.name.includes(filter.inputNormalized) ||
                recipeInfos.ingredient.includes(filter.inputNormalized) ||
                recipeInfos.description.includes(filter.inputNormalized)
            )) {
                return false;
            }
        }
        return true;
    };

    // Cherche dans les données pour la recherche vie les filtres
    checkInputFilter(checked, recipeInfos) {
        for (let i = 0; i < checked.length; i++) {
            const filter = checked[i];
            if (!(
                recipeInfos.name.includes(filter.inputNormalized) ||
                recipeInfos.ingredient.includes(filter.inputNormalized) ||
                recipeInfos.description.includes(filter.inputNormalized)  ||
                recipeInfos.appliance.includes(filter.inputNormalized) ||
                recipeInfos.ustensils.includes(filter.inputNormalized)
            )) {
                return false;
            }
        }
        return true;
    };
    

    // Normalize les données 
    stockNormalizedRecipeInfos(recipe) {
        let testName = recipe.name.toLowerCase();
        let testNameNormalized = normalizeFunction(testName);
        
        let testIngredientsNormalized = "";
        for (let i = 0; i < recipe.ingredients.length; i++) {
            let testIngredient = recipe.ingredients[i].ingredient.toLowerCase();
            testIngredientsNormalized += normalizeFunction(testIngredient) + " ";
        }
        
        let testDescription = recipe.description.toLowerCase();
        let testDescriptionNormalized = normalizeFunction(testDescription);
        
        let testAppliancesNormalized = normalizeFunction(recipe.appliance.toLowerCase());
        
        let testUstensilNormalized = "";
        for (let i = 0; i < recipe.ustensils.length; i++) {
            let testUstensil = recipe.ustensils[i].toLowerCase();
            testUstensilNormalized += normalizeFunction(testUstensil) + " ";
        }
    
        return {
            name: testNameNormalized, 
            ingredient: testIngredientsNormalized.trim(),
            description: testDescriptionNormalized,
            appliance: testAppliancesNormalized,
            ustensils: testUstensilNormalized.trim()
        };
    };
    
}