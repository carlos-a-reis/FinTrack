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

  const transaction = await db.sequelize.transaction();

  try {
    const encryptedPass = await bcrypt.hash(userData.password, 12);

    const newUser = await User.create(
      {
        name: userData.name,
        email: userData.email,
        password: encryptedPass,
      },
      { transaction },
    );

    delete newUser.dataValues.password;

    await sendEmail({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });

    await transaction.commit();
    return newUser;
  } catch (error) {
    await transaction.rollback();
    throw new Error(error.message);
  }
};

export default { registerUser };
