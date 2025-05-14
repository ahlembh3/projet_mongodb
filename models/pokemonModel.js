import connectToMongoDB from '../db/mongo.js';

export async function findPokemonsWithMinTypes(minTypes) {
	let mongoClient;
	let result = [];

	try {
		mongoClient = await connectToMongoDB(process.env.DB_URI);
		const db = mongoClient.db('m2i');
		const collection = db.collection('pokemon');

		const pipeline = [
			{
				$match: {
					$expr: { $gte: [{ $size: "$type" }, minTypes] }
				}
			}
		];

		result = await collection.aggregate(pipeline).toArray();
	} catch (error) {
		console.error(error);
		result = { error: true };
	} finally {
		if (mongoClient) await mongoClient.close();
	}

	return result;
}

export async function findPokemonsByNameAndType(startsWith, type) {
	let mongoClient;
	let pokemons = [];

	try {
		mongoClient = await connectToMongoDB(process.env.DB_URI);
		const db = mongoClient.db('m2i');
		const collection = db.collection('pokemon');

		const pipeline = [
			{
				$match: {
					'name.english': { $regex: `^${startsWith}`, $options: 'i' },
					type: type
				}
			}
		];

		pokemons = await collection.aggregate(pipeline).toArray();
	} catch (error) {
		console.error(error);
		pokemons = { error: true };
	} finally {
		if (mongoClient) await mongoClient.close();
	}

	return pokemons;
}

export async function findTopFrenchNameLength(limit) {
	let mongoClient;
	let result = [];

	try {
		mongoClient = await connectToMongoDB(process.env.DB_URI);
		const db = mongoClient.db('m2i');
		const collection = db.collection('pokemon');

		const pipeline = [
			{
				$project: {
					name: 1,
					frenchNameLength: { $strLenCP: "$name.french" }
				}
			},
			{ $sort: { frenchNameLength: -1 } },
			{ $limit: limit }
		];

		result = await collection.aggregate(pipeline).toArray();
	} catch (error) {
		console.error(error);
		result = { error: true };
	} finally {
		if (mongoClient) await mongoClient.close();
	}

	return result;
=======
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

