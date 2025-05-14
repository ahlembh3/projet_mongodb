import {moyenneHP, typesPlusFrequent} from "../models/pokemonModel.js";

// Moyenne des HP
const getAverage = async (req, res) => {
    const moyenne = await moyenneHP();

    return res.status(200).json({
        message: "Moyenne des HP",
        data: moyenne,
    });
}

// Types les plus fréquents
const getTypes = async (req, res) => {
    const types = await typesPlusFrequent();

    return res.status(200).json({
        message: "Types les plus fréquents",
        data: types,
    });
}

export { getAverage , getTypes };