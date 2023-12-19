import { thisDatas } from "../datas.js";

export class filters {

    recipesDatas = [];

    constructor() {}

    async callDatas() {
        const datasFrom = new thisDatas();
        this.recipesDatas =  datasFrom.dataSet();
        return this.recipesDatas;
    }

    async addFilters(ingredientFilter) {
        // ingredientFilter.innerHTML = "";
        const recipesDatas = await this.callDatas();
        recipesDatas.forEach(r => {
            ingredientFilter.appendChild(this.ingredientFilter(r));
        });
    }

    ingredientFilter(datas) {
        const {ingredients, id} = datas;

        const formFilter = document.createElement("form");
        formFilter.classList.add("dropdown-menu");
        formFilter.classList.add("ingredientFilter");

        ingredients.forEach(i => {
            const ingredient = document.createElement("label");
            ingredient.setAttribute("for", `option-${id}`);
            console.log(i.ingredient);
        })
        
        // `<label for="option-1">
        // <input type="checkbox" name="option-1" id="option-1">
        // </label>`
        

        return formFilter
   
    }
}