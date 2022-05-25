export default function initCoffeeController(db) {
  const addFavorite = async (request, response) => {
    try {
      console.log(request.body);
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

  return {
    addFavorite,
  };
}
