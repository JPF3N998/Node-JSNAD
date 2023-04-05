import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

// Mock fetch to return count to pass pollPkmnCount initialization
const responseMock = new Response(JSON.stringify({ count: 1 }));
global.fetch = () => Promise.resolve(responseMock);

// Dynamically import module after mocking fetch
const { default: randomPokemon } = await import('../../src/utils/randomPokemon.js');

describe('Random Pokemon', () => {
  const mockPokemonResponse = () => new Response(JSON.stringify({
    id: 1,
    name: 'Bulbasaur'
  }));

  it('should return pokemon name and ID after calling API', async () => {
    global.fetch = () => Promise.resolve(mockPokemonResponse());
    const pokemon = await randomPokemon();

    assert.deepEqual(
      JSON.stringify(pokemon),
      JSON.stringify(await mockPokemonResponse().json()));
  });

  it('should throw error when request is rejected', () => {
    global.fetch = () => Promise.reject();
    assert.rejects(async () => await randomPokemon(), { name: 'Error', message: 'Error fetching Pokemon.' });
  });
});