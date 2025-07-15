import 'dotenv/config';
import { Resend } from 'resend';
import auth from './auth.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (userData) => {
  const token = auth.createToken(userData);

  const { data, error } = await resend.emails.send({
    from: 'FinTrack <noreplay@resend.dev>',
    to: [userData.email],
    subject: 'Validação de conta FinTrack',
    html: `<strong>It works!</strong></br><a>${token}<a>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};

export default sendEmail;
