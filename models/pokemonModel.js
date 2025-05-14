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

 export async function moyenneHP() {
    let mongoClient;
    let moyennePokemon = [];
    try {
        mongoClient = await connectToMongoDB(process.env.DB_URI);
        const m2iDb = mongoClient.db('m2i');
        const pokemons = m2iDb.collection('pokemon');

        moyennePokemon = await pokemons.aggregate([
            {
                $group: {
                    _id: null,
                    moyenneHP: { $avg: "$base.HP" }
                }
            },
            {
                $project: {
                    _id: 0,
                    moyenneHP: { $round: ["$moyenneHP", 2] }
                }
            }
        ]).toArray();

    } catch (error) {
        console.log(error);
    } finally {
        await mongoClient?.close();
    }

    return moyennePokemon[0];
}

// Types les plus fréquents
export async function typesPlusFrequent() {
    let mongoClient;
    let types = [];
    try {
        mongoClient = await connectToMongoDB(process.env.DB_URI);
        const m2iDb = mongoClient.db('m2i');
        const pokemons = m2iDb.collection('pokemon');

        types = await pokemons.aggregate([
            {
                $unwind: "$type"
            },
            {
                $group: {
                    _id: "$type",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 10
            }
        ]).toArray();

    } catch (error) {
        console.log(error);
    } finally {
        await mongoClient?.close();
    }

    return types;
}