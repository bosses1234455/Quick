import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.mailAdd,
    pass: process.env.mailAppPass,
  },
});


export const sendVerificationEmail = async (email) => {
  const code = generateRandomCode(6);
  const mailOptions = {
    from: process.env.mailAdd,
    to: email,
    subject: 'Verify Your Email Address',
    text: `${code}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, code:code };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};



function generateRandomCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
