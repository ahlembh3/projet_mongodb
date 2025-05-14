import express from 'express';
import {
	createOneMovie,
	getOneMovieById,
	getOneMoviePage,
	deleteOneMovieById,
} from '../controllers/filmsControllers.js';

const router = express.Router();

//       /films/
router.post('/', createOneMovie);

// récupère une page de films avec pagination
router.get('/', getOneMoviePage);


//     /films/254
router.put('/:id', getOneMovieById);

router.delete('/:id', deleteOneMovieById);

export default router;