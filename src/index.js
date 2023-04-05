import fibonacci from './utils/fibonacci.js';
import randomPokemon from './utils/randomPokemon.js';

console.log(fibonacci(0));
console.log(fibonacci(1));
console.log(fibonacci(3));
console.log(fibonacci(5));

console.log(await randomPokemon());
console.log(await randomPokemon());
console.log(await randomPokemon());
