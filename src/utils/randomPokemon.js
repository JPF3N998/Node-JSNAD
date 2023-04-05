import { join } from 'node:path';
const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

// Call once when module is loaded, to save one call to API
const COUNT = await pollPkmnCount();

async function pollPkmnCount() {
  try {
    const { count } = await (await fetch(ENDPOINT)).json();
    return count;
  } catch {
    throw Error('Error getting total number of pokemons');
  }
}

export default async () => {
  try {
    const randomId = Math.floor(Math.random() * COUNT);
    const url = join(ENDPOINT, randomId.toString());

    const { id, name } = await (await fetch(url)).json();
    return { id, name };
  } catch {
    throw Error('Error fetching Pokemon.');
  }
};