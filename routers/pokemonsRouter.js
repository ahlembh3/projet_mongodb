import express from 'express';
import {getAllPokemons} from '..models/pokemonModule.js'


const router = express.Router();

router.post('/',);


router.get('/', getAllPokemons);

router.put('/:id', );

router.delete('/:id', );

export default router;