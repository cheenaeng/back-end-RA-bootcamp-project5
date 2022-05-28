import pkg from 'sequelize';

const { Op } = pkg;

const matchCoffeeProportion = (coffeeData, coffeeRequested) => {
  const {
    coffee, ice, milk, sugar,
  } = coffeeRequested;

  return (
    coffeeData.coffee === coffee
    && coffeeData.ice === ice
    && coffeeData.sugar === sugar
    && coffeeData.milk.condMilk === milk.condMilk
    && coffeeData.milk.evapMilk === milk.evapMilk);
};

export default function initCoffeeController(db) {
  const addFavorite = async (request, response) => {
    try {
      // find coffee database for any coffee that has the same proportion
      const findAllCoffees = await db.Coffee.findAll();

      // check if the coffee that is made by user already exist in the database
      // eslint-disable-next-line max-len
      const foundCoffee = findAllCoffees.filter((coffee) => matchCoffeeProportion(coffee.proportion, request.body));
      console.log(foundCoffee);

      // if the coffee does not exist, then add to coffee table and add to favorites table
      if (foundCoffee.length === 0) {
        console.log('not found');
        const newCoffee = await db.Coffee.create({
          proportion: request.body,
        });
        const coffeeFav = await db.User_Coffee.create({
          userId: 1,
          coffeeId: newCoffee.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      // eslint-disable-next-line max-len
      // if the coffee exist, check if favorite already contains the fav coffee; if no add to the fav table
      else {
        console.log(foundCoffee[0].id, 'found');
        const ifFaveExist = await db.User_Coffee.findOne({
          where: {
            [Op.and]: [
              { coffeeId: foundCoffee[0].id },
              { userId: 1 },
            ],
          },
        });
        console.log(ifFaveExist);
        if (!ifFaveExist) {
          console.log('does not exist');
          const newFav = await db.User_Coffee.create({
            userId: 1,
            coffeeId: foundCoffee[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const undoFavorite = async (request, response) => {
    try {
      const findAllCoffees = await db.Coffee.findAll();
      console.log(request.body, 'request');
      // check if the coffee that is made by user already exist in the database
      // eslint-disable-next-line max-len
      const foundCoffee = findAllCoffees.filter((coffee) => matchCoffeeProportion(coffee.proportion, request.body));

      console.log(foundCoffee);

      const undoFav = await db.User_Coffee.destroy({
        where: {
          [Op.and]: [
            { coffeeId: foundCoffee[0].id },
            { userId: 1 },
          ],
        },
      });

      response.send({ undoFav });
    } catch (error) {
      console.log(error);
    }
  };
  const findAllFavorite = async (request, response) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: 1,
        },
      });
      const coffees = await user.getCoffees();
      const allCoffeeData = coffees.map((coffee) => {
        const coffeeData = {
          coffeeId: coffee.id,
          proportion: coffee.proportion,
        };
        return coffeeData;
      });
      console.log(allCoffeeData);
      response.send({ allCoffeeData });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addFavorite, undoFavorite, findAllFavorite,
  };
}
