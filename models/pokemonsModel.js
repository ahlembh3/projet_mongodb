import express from 'express';
import connectToMongoDB from '../db/mongo.js';


export async function getAllPokemons(req, res) {
    let mongoClient;
    try {
        mongoClient = await connectToMongoDB(process.env.DB_URI);
        const pokemons = await mongoClient.db('m2i')
            .collection('pokemon')
            .find()
            .sort({ id: 1 })
            .toArray();
        res.status(200).json(pokemons);
    } catch (err) {
        console.error('Erreur GET /pokemons:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    } finally {
        if (mongoClient) await mongoClient.close();
    }
}

