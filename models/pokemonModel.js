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

