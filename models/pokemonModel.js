import connectToMongoDB from '../db/mongo.js';
export async function getAllPokemons(filter = {}) {
    const mongoClient = await connectToMongoDB(process.env.DB_URI);

	
    const query = {};

    if (filter.type) {
        query.type = filter.type;
    }

    const pokemons = await mongoClient
        .db('m2i')
        .collection('pokemon')
        .find(query)
        .sort({ id: 1 })
        .toArray();

    return pokemons;
}

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
			{
    $addFields: {
      weightKg: {
        $toDouble: {
          $arrayElemAt: [
            { $split: ["$profile.weight", " "] },
            0
          ]
        }
      }
    }
  },
  { $sort: { weightKg: -1 } },
  { $limit: limit },
  {
    $project: {
      _id: 0,
      id: 1,
      "name": 1,
      "profile.weight": 1,
      weightKg: 1
    }
  }
			 ])
        .toArray();
		console.log(pokemons);

    return pokemons;
}



export async function getPokemonsWithoutEvolutionByTypes(types = []) {
    const mongoClient = await connectToMongoDB(process.env.DB_URI);

    const pokemons = await mongoClient
        .db('m2i')
        .collection('pokemon')
        .find({
            $and: [
                {
                    $or: [
                        { "evolution.next": { $exists: false } },
                        { "evolution.next": { $size: 0 } }
                    ]
                },
                { type: { $in: types } }
            ]
        })
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

export async function getTopTallestPokemons(limit = 5) {
    const mongoClient = await connectToMongoDB(process.env.DB_URI);

    const pokemons = await mongoClient
        .db('m2i')
        .collection('pokemon')
        .aggregate([
            {
                $addFields: {
                    numericHeight: {
                        $toDouble: {
                            $arrayElemAt: [
                                { $split: ["$profile.height", " "] },
                                0
                            ]
                        }
                    }
                }
            },
            { $sort: { numericHeight: -1 } },
            { $limit: limit }
        ])
        .toArray();

    return pokemons;
}

