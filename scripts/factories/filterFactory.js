import { thisDatas } from "../datas.js";
import { normalizeChain } from "../utils/normalize.js";
export class filters {
    recipesDatas = [];
    allIngredients = [];
    allAppliances = [];
    allUstensils = [];

    normalize = new normalizeChain();

    constructor() {
        this.callDatas();
    }

    callDatas() {
        const datasFrom = new thisDatas();
        this.recipesDatas =  datasFrom.dataSet();
        this.filterIngredientsData();
        this.filterUstensilsData();
        this.filterAppliancesData();
    }

    filterIngredientsData() {
        this.recipesDatas.forEach(r => {
            r.ingredients.forEach(g=>{
                if(!this.allIngredients.find(a => a.normalizedLabel === this.normalize.normalizeFunction(g.ingredient))) {
                    this.allIngredients.push({
                        label : g.ingredient,
                        normalizedLabel: this.normalize.normalizeFunction(g.ingredient),
                    });
                };
            })
            
        });
    }

    filterAppliancesData() {
        this.recipesDatas.forEach(r => {
            if (!this.allAppliances.find(a => a.normalizedLabel === this.normalize.normalizeFunction(r.appliance))) {
                this.allAppliances.push({
                    label: r.appliance,
                    normalizedLabel: this.normalize.normalizeFunction(r.appliance),
                });
            }
        });
    }

    filterUstensilsData() {
        this.recipesDatas.forEach(r => {
            r.ustensils.forEach(u => {
               if (!this.allUstensils.find(ust => ust.normalizedLabel === this.normalize.normalizeFunction(u))) {
                    this.allUstensils.push({
                        label: u,
                        normalizedLabel: this.normalize.normalizeFunction(u),
                    });
                 }
            }) 
        });
    }

    async addFilters(ingredientFilter, applianceFilter, ustensilFilter) {

        this.allIngredients.forEach(a => {
            const ingredient = this.ingredientFilter(a.normalizedLabel);
            const label = this.ingredientFilterNames(a.label);
            ingredientFilter.appendChild(ingredient).appendChild(label);
            const selectedFilters = document.querySelector(".ingredientFilter .selectedFilters");
            const ingredientFilterFirstChild = document.querySelector(".ingredientFilter :nth-child(2)");
            const thisElement = document.querySelector(`[for="${a.normalizedLabel}"]`);
            thisElement.addEventListener("change", () => {
                
                if (thisElement.querySelector("input").checked) {
                    thisElement.classList = "labelForChoice selectedFilter";
                    selectedFilters.appendChild(thisElement);
                } else {
                    thisElement.classList = "labelForChoice";
                    thisElement.remove();           
                    ingredientFilter.insertBefore(ingredient, ingredientFilterFirstChild.nextElementSibling);
                }
            }); 
        });
        

        this.allUstensils.forEach(a => {
            ustensilFilter.appendChild(this.ustensilFilter(a.normalizedLabel)).appendChild(this.ustensilFilterNames(a.label));
        })

        this.allAppliances.forEach(a => {
            applianceFilter.appendChild(this.applianceFilter(a.normalizedLabel)).appendChild(this.applianceFilterNames(a.label));
        })
    }

    ingredientFilter(normalizedName) {
        const filterOption = document.createElement("label");
        filterOption.setAttribute("for", normalizedName);
        filterOption.classList.add("labelForChoice");

        const inputOption = document.createElement("input");
        inputOption.setAttribute("name", normalizedName);
        inputOption.setAttribute("type", "checkbox");
        inputOption.setAttribute("id", normalizedName);

        filterOption.appendChild(inputOption);

        return filterOption;
    }

    applianceFilter(normalizedLabel) {
        const filterOption = document.createElement("label");
        filterOption.setAttribute("for", normalizedLabel);
        filterOption.classList.add("labelForChoice");

        const inputOption = document.createElement("input");
        inputOption.setAttribute("name", normalizedLabel);
        inputOption.setAttribute("type", "checkbox");
        inputOption.setAttribute("id", normalizedLabel);

        filterOption.appendChild(inputOption);

        return filterOption;
    }

    ustensilFilter(normalizedLabel) {
        const filterOption = document.createElement("label");
        filterOption.setAttribute("for", normalizedLabel);
        filterOption.classList.add("labelForChoice");

        const inputOption = document.createElement("input");
        inputOption.setAttribute("name", normalizedLabel);
        inputOption.setAttribute("type", "checkbox");
        inputOption.setAttribute("id", normalizedLabel);

        inputOption.addEventListener("change",(event) => {
        })

        filterOption.appendChild(inputOption);

        return filterOption;
    }

    ingredientFilterNames(label) {
        const ingredientName = document.createElement("p");
        ingredientName.innerText = label;

        return ingredientName;
    }

    applianceFilterNames(label) {
        const applianceName = document.createElement("p");
        applianceName.innerText = label;

        return applianceName
    }

    ustensilFilterNames(label) {
        const ustensilsName = document.createElement("p");
        ustensilsName.innerText = label;

        return ustensilsName
    }
}

