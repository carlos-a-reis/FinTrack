import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email) => {
  const { data, error } = await resend.emails.send({
    from: 'FinTrack <noreplay@resend.dev>',
    to: [email],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};

export default sendEmail;
