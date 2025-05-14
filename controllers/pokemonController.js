import {
	getAllPokemons,
	getPokemonById,
    getTopHeaviestPokemons,

} from '../models/pokemonModel.js';

export async function getPokemons(req, res) {
	try {
		const pokemons = await 	getAllPokemons();
		res.status(200).json(pokemons);
	} catch (err) {
		console.error('Erreur getAllPokemons:', err);
		res.status(500).json({ message: 'Erreur serveur' });
	}
}

export async function getOnePokemon(req, res) {
	try {
		const id = parseInt(req.params.id);
		const pokemon = await getPokemonById(id);
		if (!pokemon)
			return res.status(404).json({ message: 'Pokemon non trouvé' });
		res.status(200).json(pokemon);
	} catch (err) {
		console.error('Erreur getPokemonById:', err);
		res.status(500).json({ message: 'Erreur serveur' });
	}
}

export async function getTopWeight(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 20;
        const pokemons = await getTopHeaviestPokemons(limit);
        res.status(200).json(pokemons);
    } catch (err) {
        console.error('Erreur getTopWeight:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}
