import { normalizeFunction } from "../utils/normalize.js";

export class displayDOM {

    recipeCount = 0;

    constructor() {

    }

    // Affiche les recettes
    displayRecipeList(section, datas, selectedFilters) {
        this.createArticle(datas);
        this.appendArticles(section, datas);
        this.countRecipes(datas);
        if (section.childNodes.length == 0) {
            this.noResults(section, selectedFilters)
        }
    }

    // Affiche les filtres
    displayFilters(ingredientFilter,applianceFilter, ustensilFilter, ingredients, appliances, ustensils) {
        this.createIngredientsFilter(ingredientFilter, ingredients);
        this.createAppliancesFilter(applianceFilter, appliances);
        this.createUstensilsFilter(ustensilFilter, ustensils);
       
    }

    // Mise à jour des filtres
    filterChangeDisplay(event, section) {
        let onOff = null;

        const target = event.target;
        const targetID = target.getAttribute("id");
        const label = document.querySelector(`label[for="${targetID}"]`);
        const input = label.innerText;

        if (target.checked) {
            label.classList = "labelForChoice selectedFilter";
            section.insertBefore(label, section.firstChild);
            onOff = 1;
            return {text: input, normalizedText: targetID, checked: onOff};
        } else {
            label.classList = "labelForChoice" ;
            section.parentNode.insertBefore(label, section.nextElementSibling);
            onOff = 0;
            return {text: input, normalizedText: targetID, checked: onOff};
        }
    }

    // Vide les filtres
    emptyFilters(...section) {
        section.forEach(s => {
            s.querySelectorAll(".labelForChoice").forEach(element => {
                if(!element.classList.contains("selectedFilter")) {
                    element.remove();
                };
            });
        })
    }

    // Gestion de la liste des tags 
    bubbleList(datas, section){
    
        datas.forEach(element => {
    
        const bubblesArray = Array.from(section.childNodes);
    
        const alreadyChecked = bubblesArray.some(child => normalizeFunction(child.textContent) === element.inputNormalized);
    
        if (!alreadyChecked) {
          this.addBubble(element.inputValue, section);
        }
      });
    }

    // Compte des recettes affichées
    countRecipes(datas) {
     
        const recipesCount = document.querySelector(".results");
        recipesCount.innerText = `${datas.length} recettes`;
    }

    // Création des fiches de recette
    createArticle(datas) {
        const {id, image, name, ingredients,time, description} = datas;

        if(id === undefined) {

        } else {
            const article = document.createElement("article");
            article.setAttribute("id", `${id}`);
    
            const recipeImage = document.createElement("img");
            recipeImage.setAttribute("src", `../datas/recipes_pictures/${image}`);
            article.appendChild(recipeImage);

            const duration = document.createElement("em");
            duration.classList.add("recipeDuration");
            duration.innerText = time+"min";
            article.appendChild(duration);

            const recipeText = document.createElement("div");
            recipeText.classList.add("recipeText");
    
            const title = document.createElement("h2");
            title.classList.add("recipeTitle");
            title.innerText = name;
            recipeText.appendChild(title);
    
            const subTitleA = document.createElement("h3");
            subTitleA.classList.add("recipeFixText");
            subTitleA.innerText = "RECETTE";
            recipeText.appendChild(subTitleA);
    
            const descriptionText = document.createElement("p");
            descriptionText.classList.add("recipeDescription");
                var truncatedText = description.substring(0, 200) + '...';
                descriptionText.innerText = truncatedText;
            
            recipeText.appendChild(descriptionText);
    
            const subTitleB = document.createElement("h3");
            subTitleB.classList.add("recipeFixText");
            subTitleB.innerText = "INGRÉDIENTS";  
            recipeText.appendChild(subTitleB);      
    
            const recipeIngredients = document.createElement("div");
            recipeIngredients.classList.add("ingredientList");
            recipeIngredients.setAttribute("aria-label", "Liste des ingrédients");

            ingredients.forEach(i=>{

                const ingredientDiv = document.createElement("div");
                ingredientDiv.classList.add("ingredient");

                const ingredientName = document.createElement("p");
                ingredientName.classList.add("ingredientName");
                if(i.ingredient.length > 14) {
                    ingredientName.innerText = i.ingredient.substring(0,14) + '...';
                } else {
                    ingredientName.innerText = i.ingredient;
                }
                
                ingredientDiv.appendChild(ingredientName);

                const ingredientQuantity = document.createElement("em");
                ingredientQuantity.classList.add("ingredientQuantity");
                if(i.quantity) {
                    if(i.unit) {
                        ingredientQuantity.innerText = `${i.quantity} ${i.unit}`;
                    } else {
                        ingredientQuantity.innerText = `${i.quantity}`;
                    };
                } else {
                    ingredientQuantity.innerText = `-`;
                };
                
                
                ingredientDiv.appendChild(ingredientQuantity);

                recipeIngredients.appendChild(ingredientDiv);
            });

            recipeText.appendChild(recipeIngredients);
            article.appendChild(recipeText);
    
            return article;
        }
    }

    // Attachement des fiches au DOM
    appendArticles(section, datas) {
        section.innerHTML = "";
        datas.forEach(r => {
            section.appendChild(this.createArticle(r));
        });
    }

    // Création du filtres ingrédient
    createIngredientsFilter(ingredientFilter, ingredients) {
        ingredients.forEach(a => {
            const escapedId = a.normalizedLabel.replace(/([()%'])/g, "\\$1");
            const existingElement = document.querySelector(`#${escapedId}`);
            if (!existingElement) {
                const ingredient = this.ingredientFilter(a.normalizedLabel);
                const label = this.ingredientFilterNames(a.label);
                ingredientFilter.appendChild(ingredient).appendChild(label);
            }
        });
    }

    // Création du filtres ingrédient lors de la mise à jour 
    createIngredientsFilter2(ingredientFilter, ingredients) {
        ingredients.forEach(a => {
            const escapedId = a.norm.replace(/([()%'])/g, "\\$1");
            const existingElement = document.querySelector(`#${escapedId}`);
            if (!existingElement) {
                const ingredient = this.ingredientFilter(a.norm);
                const label = this.ingredientFilterNames(a.name);
                ingredientFilter.appendChild(ingredient).appendChild(label);
            }
        });
    }

    // Création du filtres appareils
    createAppliancesFilter(applianceFilter, appliances) {
        appliances.forEach(a => {
            const escapedId = a.normalizedLabel.replace(/([()%'])/g, "\\$1");
            const existingElement = document.querySelector(`#${escapedId}`);
            if (!existingElement) {
                const appliance = this.applianceFilter(a.normalizedLabel);
                const label = this.applianceFilterNames(a.label);
                applianceFilter.appendChild(appliance).appendChild(label);
            }
        });
    }

    createAppliancesFilter2(applianceFilter, appliances) {
        appliances.forEach(a => {
            const escapedId = a.norm.replace(/([()%'])/g, "\\$1");
            const existingElement = document.querySelector(`#${escapedId}`);
            if (!existingElement) {
                const appliance = this.applianceFilter(a.norm);
                const label = this.applianceFilterNames(a.name);
                applianceFilter.appendChild(appliance).appendChild(label);
            }
        });
    }

    createUstensilsFilter(ustensilFilter, ustensils) {
        ustensils.forEach(a => {
            const escapedId = a.normalizedLabel.replace(/([()%'])/g, "\\$1");
            const existingElement = document.querySelector(`#${escapedId}`);
            if (!existingElement) {
                const ustensil = this.ustensilFilter(a.normalizedLabel);
                const label = this.ustensilFilterNames(a.label);
                ustensilFilter.appendChild(ustensil).appendChild(label);
            }
        });
    }

    createUstensilsFilter2(ustensilFilter, ustensils) {
        ustensils.forEach(a => {
            const escapedId = a.norm.replace(/([()%'])/g, "\\$1");
            const existingElement = document.querySelector(`#${escapedId}`);
            if (!existingElement) {
                const ustensil = this.ustensilFilter(a.norm);
                const label = this.ustensilFilterNames(a.name);
                ustensilFilter.appendChild(ustensil).appendChild(label);
            }
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

    addBubble(inputValue, section) {
    
        const selectedFilterBubble = document.createElement("p");
        selectedFilterBubble.classList.add("oneFilter");
        
        selectedFilterBubble.innerText = inputValue;
        section.appendChild(selectedFilterBubble);
    };

    noResults(section, selectedFilter) {
        const bubbles = document.querySelector(".selectedFiltersBubbles")
        section.innerHTML = "";
        const noResults = document.createElement("ul");
        const noResultsText = document.createElement("p");
        noResultsText.innerText="Aucune recette ne correspond à vos critères : ";
        noResults.appendChild(noResultsText);
        const allFilterDisplayed = bubbles.querySelectorAll(":nth-child(n+1)");
        allFilterDisplayed.forEach(element => {
          const notMatchingFilter = document.createElement("li");
          notMatchingFilter.innerText = element.innerText;
          noResults.appendChild(notMatchingFilter);
        });
        if(selectedFilter) {
            const inputFilter = document.createElement("li");
            inputFilter.innerText = selectedFilter;
            noResults.appendChild(inputFilter);
        }
        
        const exemple = document.createElement("i");
        exemple.innerText = 'Essayez plutôt : "Lait de coco", "Pizza"... ';
        noResults.appendChild(exemple);
        section.appendChild(noResults);
    }

    toggleClearIcon(input, icon) {

        if (input.value.trim() !== '') {
          icon.style.display = 'block';
        } else {
          icon.style.display = 'none';
        }
    }
      
    clearInput(input, icon) {
        input.value = '';
        this.toggleClearIcon(input, icon);
    }
}