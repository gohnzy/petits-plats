import { normalizeFunction } from "../utils/normalize.js";

// Extraction des ingrédients, appareils et ustensils depuis les données

export class getDatas {

    allRecipes = [];

    allIngredients = [];
    allAppliances = [];
    allUstensils = [];

    constructor(datas) {
        this.getRecipes(datas);
    }

    getRecipes(datas) {
        this.allRecipes = datas;

        return this.allRecipes
    }

    getAllIngredients() {
        this.allRecipes.forEach(r => {
            r.ingredients.forEach(g=>{
                if(!this.allIngredients.find(a => a.normalizedLabel === normalizeFunction(g.ingredient))) {
                    this.allIngredients.push({
                        label : g.ingredient,
                        normalizedLabel: normalizeFunction(g.ingredient),
                    });
                };
            })
        });

        return this.allIngredients
    }

    getAllAplliances() {
        this.allRecipes.forEach(r => {
            if (!this.allAppliances.find(a => a.normalizedLabel === normalizeFunction(r.appliance))) {
                this.allAppliances.push({
                    label: r.appliance,
                    normalizedLabel: normalizeFunction(r.appliance),
                });
            }
        });

        return this.allAppliances
    };

    getAllUstensils() {
        this.allRecipes.forEach(r => {
            r.ustensils.forEach(u => {
                if (!this.allUstensils.find(ust => ust.normalizedLabel === normalizeFunction(u))) {
                    this.allUstensils.push({
                        label: u,
                        normalizedLabel: normalizeFunction(u),
                    });
                }
            });
        });

        return this.allUstensils
    };

}