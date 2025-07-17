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
    html: `<strong>It works!</strong></br><a>${token}<a>`,
  });

  if (err) {
    throw new Error(err);
  }
};

export default sendEmail;
