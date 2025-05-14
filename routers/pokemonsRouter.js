import express from 'express';
import {getAllPokemons} from '../pokemonsModel.js'

import {
    getAllPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon
} from '../models/pokemonModule.js';



// Récupérer tous les pokémons
router.get('/', getAllPokemons);

// Récupérer un pokémon par ID
router.get('/:id', getPokemonById);


export default router;