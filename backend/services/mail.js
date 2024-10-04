import dotenv from 'dotenv';
dotenv.config();
import nodemailer from "nodemailer";
import { google } from "googleapis";

// OAuth2 configuration
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

// Set the credentials for the OAuth2 client
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Create a transporter object using OAuth2 and accessToken
export const sendMail = async ({ orderId, name, email }) => {
  try {
    // Get the access token from the OAuth2 client
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Your order at Hungry Stomachs has been received.",
      text: `Hey ${name}, \n\n Your order Id is: ${orderId}. \nUse it to track your order.`,
      html: `Hey ${name}, \n\n Your order Id is: <b>${orderId}</b>. \nUse it to track your order.`,
    };

    const res = await transporter.sendMail(mailOptions);
    return res;

  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Failed to send email");
  }
};
