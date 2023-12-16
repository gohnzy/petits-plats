import { recipes } from "../datas/recipes.js";

export class article {
    recipesDatas = [];
    recipeCount = 0;

    constructor() {}

    init(section) {
        this.dataSet();
        this.recipeList(section);
    }

    dataSet() {
        this.recipesDatas = recipes;
    }

    recipeList(section) {
        section.innerHTML = "";
        this.recipesDatas.forEach(r => {
            section.appendChild(this.createArticle(r))
        });
    }

    countRecipes(filteredRecipes) {
        const recipesCount = document.querySelector(".results");
        recipesCount.innerText = `${recipes.length} recettes`;

    }

    createArticle(datas) {
        const {id, image, name, ingredients,time, description} = datas;

        if(id === undefined) {
            console.log("ERROR 404");
        } else {
            const article = document.createElement("article");
            article.setAttribute("id", `${id}`);
    
            const recipeImage = document.createElement("img");
            recipeImage.setAttribute("src", `/datas/recipes_pictures/${image}`);
            article.appendChild(recipeImage);

            const duration = document.createElement("em");
            duration.classList.add("recipeDuration");
            duration.innerText = time+"min";
            article.appendChild(duration)

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
                ingredientName.innerText = i.ingredient;
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
}