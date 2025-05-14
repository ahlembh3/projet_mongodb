import connectToMongoDB from '../db/mongo.js';
export async function getAllPokemons(req, res) {
    let mongoClient;
    try {
        mongoClient = await connectToMongoDB(process.env.DB_URI);
        const pokemons = await mongoClient.db('m2i').collection('pokemon').find().sort({ id: 1 }).toArray();
        res.status(200).json(pokemons);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    } finally {
        if (mongoClient) await mongoClient.close();
    }
}

export async function getPokemonById(req, res) {
    let mongoClient;
    try {
        const id = parseInt(req.params.id);
        mongoClient = await connectToMongoDB(process.env.DB_URI);
        const pokemon = await mongoClient.db('m2i').collection('pokemon').findOne({ id: id });
        if (pokemon) res.status(200).json(pokemon);
        else res.status(404).json({ message: 'Pokemon non trouvé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    } finally {
        if (mongoClient) await mongoClient.close();
    }
}

