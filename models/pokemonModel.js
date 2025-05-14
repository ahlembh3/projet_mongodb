import connectToMongoDB from '../db/mongo.js';
export async function getAllPokemons() {
    let mongoClient;

        mongoClient = await connectToMongoDB(process.env.DB_URI);
        const pokemons = await mongoClient.db('m2i').collection('pokemon').find().sort({ id: 1 }).toArray();
        return pokemons;
    
}

export async function getPokemonById(id) {
    let mongoClient;
   
        // const id = parseInt(req.params.id);
        mongoClient = await connectToMongoDB(process.env.DB_URI);
        const pokemon = await mongoClient.db('m2i').collection('pokemon').findOne({ id: id });
        return pokemon;

}

export async function getTopHeaviestPokemons(limit = 20) {
    const mongoClient = await connectToMongoDB(process.env.DB_URI);
    
    const pokemons = await mongoClient
        .db('m2i')
        .collection('pokemon')
        .aggregate([ 
			{ $addFields: { weightKg: { $toDouble: {
$arrayElemAt: [ { $split: ["$profile.weight", " "] }, 0 ] } } } }, { $sort: {
weightKg: -1 } }, { $limit: 20 }, { $project: { _id: 0, id: 1, "name": 1,
"profile.weight": 1, weightKg: 1 } } ])
        .toArray();

    return pokemons;
}
