import {
	getAllPokemons,
	getPokemonById,
    getTopHeaviestPokemons,
 
    getPokemonsWithoutEvolutionByTypes,
    getTopTallestPokemons

} from '../models/pokemonModel.js';

export async function getPokemons(req, res) {
    try {
        const filter = {};

        if (req.query.type) {
            filter.type = req.query.type;
        }

        const pokemons = await getAllPokemons(filter);
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




export async function getPokemonsWithoutEvolution(req, res) {
    try {
        const types = req.query.types
            ? req.query.types.split(',').map(type => type.trim())
            : [];

        if (types.length === 0) {
            return res.status(400).json({ message: 'Paramètre "types" requis' });
        }

        const pokemons = await getPokemonsWithoutEvolutionByTypes(types);
        res.status(200).json(pokemons);
    } catch (err) {
        console.error('Erreur getPokemonsWithoutEvolution:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export async function getTopHeight(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const pokemons = await getTopTallestPokemons(limit);
        res.status(200).json(pokemons);
    } catch (err) {
        console.error('Erreur getTopHeight:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}