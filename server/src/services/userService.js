import db from '../models/index.js';
import bcrypt from 'bcrypt';

const User = db.User;

const register = async (userData) => {
  const encryptedPass = await bcrypt.hash(userData.password, 12);
  userData.password = encryptedPass;

  const newUser = await User.create(userData);

  return newUser;
};

export default { register };
