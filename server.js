const { syncAndSeed } =  require('./db');
const app = require('./app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const SECRET_KEY = 'lebronflops';

const token = jwt.sign({ username: 'user1234' }, SECRET_KEY);

const verifyGood = jwt.verify(token, SECRET_KEY);

const hashPassword = async (password) => {
  let hashed = await bcrypt.hash(password, 5);
  console.log(hashed);
  const correct = await bcrypt.compare(password, hashed)
  console.log(correct)
}
const init = async() => {
  await syncAndSeed();
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
// hashPassword('password');
