import { recipes } from "../datas/recipes.js";

export class thisDatas {
    recipesDatas = [];

    constructor() {}

    dataSet() {
        this.recipesDatas = recipes;

        return this.recipesDatas;
    }
}