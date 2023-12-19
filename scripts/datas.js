import { recipes } from "../datas/recipes.js";

export class thisDatas {
    recipesDatas = [];

    constructor() {}

    // init() {
    //     this.dataSet();
    // }

    dataSet() {
        this.recipesDatas = recipes;

        return this.recipesDatas;
    }
}