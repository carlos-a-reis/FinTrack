import userService from '../services/userService.js';
import userSchemas from '../../../validation/userValidationSchemas.js';

const registerUser = async (req, res, next) => {
  const userData = req.body;

  const { error } = userSchemas.validate(userData, { abortEarly: false });
  if (error) {
    const details = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message.replace(/"/g, ''),
    }));

    return next({ status: 400, message: 'Dados inválidos', details });
  }

  try {
    const newUser = await userService.registerUser(userData);

    res
      .status(201)
      .json({ message: 'Usuário cadastrado com sucesso.', data: newUser });
  } catch (err) {
    if (err.message === 'E-mail já cadastrado.') {
      err.status = 409;
    }
    next(err);
  }
};

const verifyUser = async (req, res, next) => {
  const token = req.query.token;

  try {
    await userService.verifyUser(token);

    res.status(200).json({ message: 'Validação realizada com sucesso.' });
  } catch (error) {
    if (error.message === 'Usuário não identificado.') {
      error.status = 400;
    } else {
      error.status = 401;
    }

    next(error);
  }
};

export default { registerUser, verifyUser };
