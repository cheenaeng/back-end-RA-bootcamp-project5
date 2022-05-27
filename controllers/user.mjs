import jsSHA from 'jssha';

const getHash = (str) => {
  // eslint-disable-next-line new-cap
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(str);
  const hash = shaObj.getHash('HEX');
  return hash;
};

const SALT = 'MamaRu';

export default function initUserController(db) {
  const login = async (request, response) => {
    try {
      const { username, password } = request.body;
      const loginResult = await db.User.findOne({
        where: {
          username,
          password: getHash(`${password}-${SALT}`),
        },
      });

      if (loginResult) {
        response.cookie('user', loginResult.id);
        response.cookie('session', getHash(`${loginResult.id}-${SALT}`));
        response.send(true); // if successful login, send true
      } else {
        response.send(false); // if unsuccessful login, send false
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (request, response) => {
    try {
      const { username, displayName, password } = request.body;
      const registerResult = await db.User.create({
        username,
        password: getHash(`${password}-${SALT}`),
        displayName,
      });
      if (registerResult) {
        response.send(true); // if successful registration, send true
      } else {
        response.send(false); // if unsuccessful registration, send false (unlikely to happen)
      }
    } catch (error) {
      console.log(error);
      response.send(false); // if unsuccessful registration, send false
    }
  };

  return {
    login, register,
  };
}
