import express from 'express';
import {getAverage, getTypes} from '../controllers/statsController.js';

const routerStats = express.Router();

routerStats.get('/hp/average', getAverage );
routerStats.get('/types/top', getTypes)

export default routerStats;