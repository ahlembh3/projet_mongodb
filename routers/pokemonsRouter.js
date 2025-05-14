import express from 'express';
import {
	getPokemons,
	getOnePokemon,
    getTopWeight,
      getPokemonsType,
  getFilteredPokemons,
  getTopFrenchNameLength,
    getPokemonsWithoutEvolution,
    getTopHeight,

} from '../controllers/pokemonController.js';

const router = express.Router();
//     /pokemon


//     /pokemon/254
//      /pokemon/top-weight
router.get('/', getPokemons);
router.get('/top-weight', getTopWeight);
router.get('/top-height', getTopHeight);


router.get('/without-evolution', getPokemonsWithoutEvolution);


// Requête : /pokemons/min-type?minTypes=2
router.get('/min-types', getPokemonsType);

// Requête : /pokemons/search?startsWith=Z&type=Dragon
router.get('/search', getFilteredPokemons);

// Requête : /pokemons/french-name-length?limit=5
router.get('/french-name-length', getTopFrenchNameLength);

// Récupérer un pokémon par ID
router.get('/:id', getOnePokemon);

export default router;
