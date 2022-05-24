module.exports = {
  up: async (queryInterface) => {
    const cofffeeList = [
      {
        milk: JSON.stringify({ evaporatedMilk: false, condensedMilk: false }),
        sugar: 'none',
        concentration: 60,
        temperature: 'hot',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        milk: JSON.stringify({ evaporatedMilk: false, condensedMilk: true }),
        sugar: 'none',
        concentration: 60,
        temperature: 'hot',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        milk: JSON.stringify({ evaporatedMilk: false, condensedMilk: false }),
        sugar: 'regular',
        concentration: 60,
        temperature: 'hot',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        milk: JSON.stringify({ evaporatedMilk: false, condensedMilk: false }),
        sugar: 'none',
        concentration: 60,
        temperature: 'hot',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Insert categories before items because items reference categories
    const coffees = await queryInterface.bulkInsert(
      'coffees',
      cofffeeList,
      { returning: true },
    );

    const userList = [
      {
        username: 'jc',
        password: '123',
        display_name: 'jcRocks',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const users = await queryInterface.bulkInsert(
      'users',
      userList,
      { returning: true },
    );
  },
  down: async (queryInterface) => {
    // Delete item before category records because items reference categories
    await queryInterface.bulkDelete('coffees', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
