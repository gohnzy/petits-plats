import { addBubble } from "../utils/bubbles.js";
import { filters } from "./filterFactory.js";
import { article } from "./displayDOM.js";

const ingredientFilter = document.querySelector(".ingredientFilter");
const applianceFilter = document.querySelector(".applianceFilter");
const ustensilFilter = document.querySelector(".ustensilFilter");

const section = document.querySelector(".recipes");

const articleFactory = new article();

const filterFactory = new filters();

filterFactory.addFilters(ingredientFilter, applianceFilter, ustensilFilter);

export class DOM {

    constructor() {

    }

    newBubble(datas) {
        addBubble(datas);
    }

    createArticleList(datas) {
        articleFactory.init(section, datas);
    }

    refreshArticleList(datas) {
        section.innerHTML = "";
        const matchingArticle = articleFactory.createArticle(datas);
        return matchingArticle
    }

    refreshCount(datas) {
        articleFactory.countRecipes(datas);
    }
}