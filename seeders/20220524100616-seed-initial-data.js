const jsSHA = require('jssha');

const getHash = (str) => {
  // eslint-disable-next-line new-cap
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(str);
  const hash = shaObj.getHash('HEX');
  return hash;
};

const SALT = 'MamaRu';

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
    await queryInterface.bulkInsert('coffees', cofffeeList, { returning: true });

    const userList = [
      {
        username: 'jc',
        password: getHash(`123-${SALT}`),
        display_name: 'jcRocks',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', userList, { returning: true });
  },
  down: async (queryInterface) => {
    // Delete item before category records because items reference categories
    await queryInterface.bulkDelete('coffees', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
