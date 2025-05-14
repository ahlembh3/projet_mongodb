import express from 'express';
import {
  getPokemonsType,
  getFilteredPokemons,
  getTopFrenchNameLength,
  getPokemons,
  getOnePokemon
} from '../controllers/pokemonsControllers.js';

const router = express.Router();

router.get('/', getPokemons);


// Requête : /pokemons/min-type?minTypes=2
router.get('/min-types', getPokemonsType);

// Requête : /pokemons/search?startsWith=Z&type=Dragon
router.get('/search', getFilteredPokemons);

// Requête : /pokemons/french-name-length?limit=5
router.get('/french-name-length', getTopFrenchNameLength);

// Récupérer un pokémon par ID
router.get('/:id', getOnePokemon);
export default router;