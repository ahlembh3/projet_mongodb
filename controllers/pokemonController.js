import {
	getAllPokemons,
	getPokemonById,
    getTopHeaviestPokemons,
      findPokemonsWithMinTypes,
  findPokemonsByNameAndType,
  findTopFrenchNameLength,
 
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
export async function getTopFrenchNameLength(req, res) {
  const limit = parseInt(req.query.limit) || 5;

  if (isNaN(limit)) {
    return res.status(400).json({ error: 'limit doit être un nombre' });
  }

  try {
    const result = await findTopFrenchNameLength(limit);

    if (result.error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export async function getFilteredPokemons(req, res) {
  const { startsWith, type } = req.query;

  if (!startsWith || !type) {
    return res.status(400).json({ error: 'Paramètres startsWith et type requis.' });
  }

  try {
    const data = await findPokemonsByNameAndType(startsWith, type);

    if (data.error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des pokémons.' });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
export async function getPokemonsType(req, res) {
  try {
    const minTypes = parseInt(req.query.minTypes);

    if (isNaN(minTypes)) {
      return res.status(400).json({ error: 'minTypes doit être un nombre' });
    }

    const pokemons = await findPokemonsWithMinTypes(minTypes);

    if (pokemons.error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des pokémons.' });
    }

    res.json(pokemons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}