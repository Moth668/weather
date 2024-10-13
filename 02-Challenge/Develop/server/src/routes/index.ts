import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

export default router;


// GET /api/weather/history should read the searchHistory.json file and return all saved cities as JSON.

// POST /api/weather should receive a city name to save on the request body, add it to the searchHistory.json file, and then return associated weather data to the client. You'll need to find a way to give each city name a unique id when it's saved (look into npm packages that could do this for you).