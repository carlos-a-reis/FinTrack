import 'dotenv/config';
import nodemailer from 'nodemailer';
import auth from './auth.js';

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user,
    pass,
  },
});

const sendEmail = async (userData) => {
  const token = auth.createToken(userData);

  const { err, _info } = await transporter.sendMail({
    from: `FinTrack <${user}>`,
    to: userData.email,
    subject: 'Validação de conta FinTrack',
    html: `
      <!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Valide Sua Conta FinTrack</title>
    <style>
      body { margin: 0; padding: 0; font-family: sans-serif; line-height: 1.6; color: #fff; background-color: #f4f4f4; }
      .container { max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
      .header { background-color: #163A5F; color: #fff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; }
      .content { padding: 20px; text-align: center; }
      .button { display: inline-block; background-color: #163A5F; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; }
      a { text-decoration: none; }
      @media only screen and (max-width: 600px) {
        .container { margin: 10px; border-radius: 0; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Bem-vindo(a) ao FinTrack!</h1>
      </div>
      <div class="content">
        <p>Olá, ${userData.name},</p>
        <p>Obrigado por se cadastrar no FinTrack! Para ativar sua conta, clique no botão abaixo:</p>
        <div style="margin-top: 25px; margin-bottom: 15px;">
          <a href="http://localhost:3001/users/verify?token=${token}" class="button">Verificar E-mail Agora</a>
        </div>
        <p>Se o botão não funcionar, copie e cole este link em seu navegador:</p>
        <p><a href="http://localhost:3001/users/verify?token=${token}" style="color: #163A5F; word-break: break-all;">http://localhost:3001/users/verify?token=${token}</a></p>
        <p>Este link é válido por 24 horas.</p>
        <p>Se você não se cadastrou, ignore este e-mail.</p>
        <p>Atenciosamente,<br>Equipe FinTrack</p>
      </div>
    </div>
  </body>
</html>
    `,
  });

  if (err) {
    throw new Error(err);
  }
};

export default sendEmail;
