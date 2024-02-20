export class normalizeChain {
    
    constructor() {}

    normalizeFunction(chain) {

        const chainClear = chain.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const newChain = chainClear.replace(/[()\s]+/g, "").toLowerCase();
    
        return newChain;
    }
    
}