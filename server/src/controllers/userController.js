import usersService from '../services/userService.js';

const registerUser = async (req, res) => {
  const userData = req.body;

  const newUser = await usersService.register(userData);

  res.status(201).json(newUser);
};

export default { registerUser };
