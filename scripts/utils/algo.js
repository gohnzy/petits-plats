import { recipes } from "../../datas/recipes.js";

export class searchBar {   

    constructor() {
        this.inputSend()
    }

    inputSend(datas) {
        let test = recipes;
    
        if (datas) {
            let testB = test.map(p => p.name.toLowerCase()); // Convertir les noms en minuscules
    
            let containsMatch = false;
    
            testB.forEach(b => {
                if (b.includes(datas.toLowerCase())) {
                    containsMatch = true;
                    console.log(b);
                }
            });
    
            if (containsMatch) {
                console.log(`La saisie "${datas}" contient au moins un mot ou une lettre d'une recette.`);
            } else {
                console.log(`La saisie "${datas}" ne contient pas de mot ou de lettre d'une recette.`);
            }
        } else {
            console.log("La saisie est undefined ou null.");
        }
    }

    inputRefresh(input) {
        input.addEventListener("input", (event) => {
            if(event.target.value.length >= 3) {
                console.log(input.value);
            } else {
                
            }
        })
    }
}