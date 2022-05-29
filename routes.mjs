// import { resolve } from 'path';
import db from './models/index.mjs';

import initCoffeeController from './controllers/coffee.mjs';
import initUserController from './controllers/user.mjs';

export default function routes(app) {
  const CoffeeController = initCoffeeController(db);
  const UserController = initUserController(db);

  app.post('/addFavorites', CoffeeController.addFavorite);
  app.post('/undoFave', CoffeeController.undoFavorite);
  app.get('/allFavorites', CoffeeController.findAllFavorite);
  app.post('/favorites/addNotes', CoffeeController.addNotes);

  app.get('/favorites/:id', CoffeeController.seeNotes);
  app.put('/favorites/editNote', CoffeeController.editNote);
  app.put('/favorites/deleteNote/:id', CoffeeController.deleteNote);

  app.post('/users/login', UserController.login);
  app.post('/users/register', UserController.register);
  app.get('/users/logout', UserController.logout);
  app.post('/users/passwordChange', UserController.passwordChange);
}
