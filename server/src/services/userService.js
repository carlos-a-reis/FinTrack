import db from '../models/index.js';
import bcrypt from 'bcrypt';
import sendEmail from '../utilities/sendEmail.js';

const User = db.User;

const findUser = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const registerUser = async (userData) => {
  const searchEmail = await findUser(userData.email);
  if (searchEmail) {
    throw new Error('E-mail já cadastrado.');
  }

  const encryptedPass = await bcrypt.hash(userData.password, 12);

  const newUser = await User.create({
    name: userData.name,
    email: userData.email,
    password: encryptedPass,
  });

  delete newUser.dataValues.password;

  sendEmail({ id: newUser.id, name: newUser.name, email: newUser.email });

  return newUser;
};

export default { registerUser };
