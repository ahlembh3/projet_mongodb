import express from 'express';
import {
getPokemons,
getOnePokemon
} from '../controllers/pokemonController.js';

const router = express.Router();




// router.get('/', );



router.get('/', getPokemons);

// Récupérer un pokémon par ID
router.get('/:id', getOnePokemon);



export default router;