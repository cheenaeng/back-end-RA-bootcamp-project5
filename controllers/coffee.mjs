import Op from 'sequelize';

export default function initCoffeeController(db) {
  const addFavorite = async (request, response) => {
    try {
      const coffeeFav = await db.User_Coffee.create({
        userId: 1,
        coffeeId: request.body.coffeeId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      response.send({ coffeeFav });
    } catch (error) {
      console.log(error);
    }
  };
  const undoFavorite = async (request, response) => {
    try {
      const undoFav = await db.User_Coffee.destroy({
        where: {
          [Op.and]: [
            { coffeeId: request.body.coffeeId },
            { userId: 1 },
          ],
        },
      });

      response.send({ undoFav });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addFavorite, undoFavorite,
  };
}
