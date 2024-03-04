 export function normalizeFunction(chain) {
    // Supprimer les accents et normaliser la chaîne
    const chainClear = chain.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Enlever les espaces et mettre en minuscules
    const newChain = chainClear.replace(/\s+/g, "").toLowerCase();

    return newChain;
}
