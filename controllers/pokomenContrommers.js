import {
    findAllPokemons,
    findPokemonById,
    insertPokemon,
    updatePokemonById,
    deletePokemonById
} from '../models/pokemonModel.js';

export async function getAllPokemons(req, res) {
    try {
        const pokemons = await findAllPokemons();
        res.status(200).json(pokemons);
    } catch (err) {
        console.error('Erreur getAllPokemons:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export async function getPokemonById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const pokemon = await findPokemonById(id);
        if (!pokemon) return res.status(404).json({ message: 'Pokemon non trouvé' });
        res.status(200).json(pokemon);
    } catch (err) {
        console.error('Erreur getPokemonById:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

