import express from 'express';
import {
  getPokemonsType,
  getFilteredPokemons,
  getTopFrenchNameLength
} from '../controllers/pokemonsControllers.js';

const router = express.Router();

// Requête : /pokemons/min-type?minTypes=2
router.get('/min-types', getPokemonsType);

// Requête : /pokemons/search?startsWith=Z&type=Dragon
router.get('/search', getFilteredPokemons);

// Requête : /pokemons/french-name-length?limit=5
router.get('/french-name-length', getTopFrenchNameLength);

export default router;

