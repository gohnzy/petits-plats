const Benchmark = require('benchmark');
const { searchAlgos } = require('./searchAlgos.js'); // Chemin correct à votre classe searchAlgos

// Créer une instance de la classe searchAlgos
const algoInstance = new searchAlgos();

// Créer une suite de tests avec Benchmark.js
const suite = new Benchmark.Suite;

// Ajouter des tests pour chaque méthode à tester
suite.add('inputStore', function() {
    algoInstance.inputStore('testInput', []);
})
.add('inputRemove', function() {
    algoInstance.inputRemove([{inputNormalized: 'testInput', inputValue: 'Test Value'}], 'testInput');
})
.add('searchBarFilter', function() {
    algoInstance.searchBarFilter([], 'testInput', []);
})
.add('filterSearch', function() {
    algoInstance.filterSearch('filterInput', []);
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Terminé');
})
.run({ 'async': true });
