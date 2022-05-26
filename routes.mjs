import { resolve } from 'path';
import db from './models/index.mjs';

import initCoffeeController from './controllers/coffee.mjs';

export default function routes(app) {
  const CoffeeController = initCoffeeController(db);
  app.post('/addFavorites', CoffeeController.addFavorite);
  app.post('/undoFave', CoffeeController.undoFavorite);
}
