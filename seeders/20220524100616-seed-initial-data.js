module.exports = {
  up: async (queryInterface) => {
    const cofffeeList = [
      {
        proportion: JSON.stringify({
          sugar: 'none',
          coffee: 60,
          ice: false,
          milk: {
            evapMilk: false,
            condMilk: false,
          },
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        proportion: JSON.stringify({
          sugar: 'none',
          coffee: 60,
          ice: false,
          milk: {
            evapMilk: false,
            condMilk: true,
          },
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        proportion: JSON.stringify({
          sugar: 'Regular',
          coffee: 60,
          ice: false,
          milk: {
            evapMilk: false,
            condMilk: false,
          },
        }),
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
