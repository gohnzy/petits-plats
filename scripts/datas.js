import { recipes } from "../datas/recipes.js";

// Initialisation des données (pour l'intégration future d'une API ?)

export class thisDatas {
    recipesDatas = [];

    constructor() {}

    dataSet() {
        this.recipesDatas = recipes;

        return this.recipesDatas;
    }
}