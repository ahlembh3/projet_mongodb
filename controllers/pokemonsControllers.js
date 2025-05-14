import {
  findPokemonsWithMinTypes,
  findPokemonsByNameAndType,
  findTopFrenchNameLength
} from '../models/pokemonModel.js';

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
