import nodemailer from "nodemailer";

// Create a transporter object using SMTP transport

// Email options
const mailOptions = {
  from: process.env.EMAIL_USER, // sender address
  subject: "Your order at Hungry Stomachs has been received.", // Subject line
  text: (name, orderId) => `Hey ${name}, \n\n Your order Id is: ${orderId}. 
\nUse it to track your order.`, // plain text body
  html: (
    name,
    orderId
  ) => `Hey ${name}, \n\n Your order Id is: <b>${orderId}</b>. 
  \nUse it to track your order.`, // html body
};

export const sendMail = async ({ orderId, name, email }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail account
      pass: process.env.EMAIL_PASS,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      type: "OAuth2",
    },
  });
  const res = new Promise((respect, disrespect) => {
    transporter.sendMail(
      {
        to: email,
        from: mailOptions.from,
        subject: mailOptions.subject,
        text: mailOptions.text(name, orderId),
        html: mailOptions.html(name, orderId),
      },
      (error, info) => {
        if (error) {
          disrespect(error);
        }
        respect(info);
      }
    );
  });
  return await res;
};

// Send the email
