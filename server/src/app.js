import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API funcionando',
  });
});

app.use('/users', userRoutes);

app.use((_req, _res, next) => {
  const error = new Error('Rota não encontrada');
  error.status = 404;
  next(error);
});

app.use((error, _req, res, _next) => {
  const message = error.message || 'Erro interno do servidor';
  const responseBody = { message };

  if (error.details) {
    responseBody.details = error.details;
  }

  res.status(error.status || 500).json(responseBody);
});

export default app;
