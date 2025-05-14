import connectToMongoDB from '../db/mongo.js';
export async function getAllPokemons() {
    let mongoClient;

        mongoClient = await connectToMongoDB(process.env.DB_URI);
        const pokemons = await mongoClient.db('m2i').collection('pokemon').find().sort({ id: 1 }).toArray();
        return pokemons;

}

export async function getPokemonById() {
    let mongoClient;

        const id = parseInt(req.params.id);
        mongoClient = await connectToMongoDB(process.env.DB_URI);
        const pokemon = await mongoClient.db('m2i').collection('pokemon').findOne({ id: id });
        if (pokemon) res.status(200).json(pokemon);
        else res.status(404).json({ message: 'Pokemon non trouvé' });

}

