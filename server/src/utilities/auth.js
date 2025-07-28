import 'dotenv/config';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (userData) => {
  const payload = { ...userData };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const verifyToken = (token) => {
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err && err.message === 'jwt expired') {
      throw new Error('Token expirado.');
    }

    return decoded;
  });
};

export default { createToken, verifyToken };
