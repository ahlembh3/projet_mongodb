import express from 'express';
import {
	getPokemons,
	getOnePokemon,
    getTopWeight,
    
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

// Récupérer un pokémon par ID
router.get('/:id', getOnePokemon);






export default router;
