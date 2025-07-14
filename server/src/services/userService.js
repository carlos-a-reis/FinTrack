import db from '../models/index.js';
import bcrypt from 'bcrypt';
import sendEmail from '../utilities/sendEmail.js';

const User = db.User;

const register = async (userData) => {
  const encryptedPass = await bcrypt.hash(userData.password, 12);
  userData.password = encryptedPass;

  const newUser = await User.create(userData);

  sendEmail(userData.email);

  return newUser;
};

export default { register };
