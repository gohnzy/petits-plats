import { recipes } from "../../datas/recipes.js";
import { thisDatas } from "../datas.js";
import { normalizeChain } from "../utils/normalize.js";
import { searchBar } from "../utils/searchBar.js";
import {DOM} from './DOM.js'
import {clearInput} from '../index.js'

const section = document.querySelector(".recipes");

export class filters {

    recipesDatas = [];
    allIngredients = [];
    allAppliances = [];
    allUstensils = [];

    normalize = new normalizeChain();

    refresh = new DOM();

    searchBarAction = new searchBar();


    constructor(datas) {
        this.callDatas(datas);
        
    }

    callDatas(datas) {
        const datasFrom = new thisDatas();
        datas =  datasFrom.dataSet();
        
        this.filterIngredientsData(datas);
        this.filterAppliancesData(datas);
        this.filterUstensilsData(datas);
        
    }

    filterIngredientsData(datas) {
        datas.forEach(r => {
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

    filterAppliancesData(datas) {
        datas.forEach(r => {
            if (!this.allAppliances.find(a => a.normalizedLabel === this.normalize.normalizeFunction(r.appliance))) {
                this.allAppliances.push({
                    label: r.appliance,
                    normalizedLabel: this.normalize.normalizeFunction(r.appliance),
                });
            }
        });
    }

    filterUstensilsData(datas) {
        datas.forEach(r => {
            r.ustensils.forEach(u => {
                if (!this.allUstensils.find(ust => ust.normalizedLabel === this.normalize.normalizeFunction(u))) {
                    this.allUstensils.push({
                        label: u,
                        normalizedLabel: this.normalize.normalizeFunction(u),
                        });
                    }
            });
        });
    }   

    async addFilters(ingredientFilter, applianceFilter, ustensilFilter, datas) {
        const filterSearch = document.querySelector(".ingredientFilter");
        filterSearch.addEventListener("submit", (event) => {
            event.preventDefault();
        });

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
                    selectedFilters.insertBefore(thisElement, selectedFilters.firstChild);

                    this.refresh.addBubble(thisElement.innerText);

                    this.searchBarAction.inputStore(this.normalize.normalizeFunction(thisElement.innerText));
                
                    section.innerHTML = "";
                    const newList = this.searchBarAction.searchBarFilter(this.normalize.normalizeFunction(thisElement.innerText), datas);
                
                    if(newList.length === 0){
                        this.refresh.noResults();
                    }
                    newList.forEach(r => {
                        this.refresh.refreshArticleList(r, newList);
                    });
                    
                    this.searchBarAction.inputRemove(datas);
                    clearInput();
                } else {
                    
                    thisElement.classList = "labelForChoice";
                    selectedFilters.parentNode.insertBefore(thisElement, selectedFilters.nextElementSibling);

                }
            
            }); 
        });

        this.allAppliances.forEach(a => {
            const appliance = this.applianceFilter(a.normalizedLabel);
            const label = this.applianceFilterNames(a.label);
            applianceFilter.appendChild(appliance).appendChild(label);
            const selectedFilters = document.querySelector(".applianceFilter .selectedFilters");
            const bubbles = document.querySelector(".selectedFiltersBubbles");
            const applianceFilterFirstChild = document.querySelector(".applianceFilter :nth-child(2)");
            const thisElement = document.querySelector(`[for="${a.normalizedLabel}"]`);
            const selectedFilterBubble = document.createElement("p");
            selectedFilterBubble.classList.add("oneFilter");
            thisElement.addEventListener("change", () => {

                if (thisElement.querySelector("input").checked) {
                    
                    thisElement.classList = "labelForChoice selectedFilter";
                    selectedFilters.insertBefore(thisElement, selectedFilters.firstChild);
                    this.refresh.addBubble(thisElement.innerText)

                } else {
                    
                    thisElement.classList = "labelForChoice";
                    selectedFilters.parentNode.insertBefore(thisElement, selectedFilters.nextElementSibling);
                  
                }
            
            }); 
        });
        
        this.allUstensils.forEach(a => {
                        const ustensil = this.ustensilFilter(a.normalizedLabel);
                        const label = this.ustensilFilterNames(a.label);
                        ustensilFilter.appendChild(ustensil).appendChild(label);
                        const selectedFilters = document.querySelector(".ustensilFilter .selectedFilters");
                        const bubbles = document.querySelector(".selectedFiltersBubbles");
                        const ustensilsFilterFirstChild = document.querySelector(".ustensilFilter :nth-child(2)");
                        const thisElement = document.querySelector(`[for="${a.normalizedLabel}"]`);
                        const selectedFilterBubble = document.createElement("p");
                        selectedFilterBubble.classList.add("oneFilter");
                        thisElement.addEventListener("change", () => {

                            if (thisElement.querySelector("input").checked) {
                    
                                thisElement.classList = "labelForChoice selectedFilter";
                                selectedFilters.insertBefore(thisElement, selectedFilters.firstChild);
                                this.refresh.addBubble(thisElement.innerText)
            
                            } else {
                                
                                thisElement.classList = "labelForChoice";
                                selectedFilters.parentNode.insertBefore(thisElement, selectedFilters.nextElementSibling);
                              
                            }
                        
                        }); 
                    });
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

