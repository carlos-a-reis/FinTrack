import userService from '../services/userService.js';

const registerUser = async (req, res) => {
  const userData = req.body;

  const newUser = await userService.registerUser(userData);

  res.status(201).json(newUser);
};

export default { registerUser };
