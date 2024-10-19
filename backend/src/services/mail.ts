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
export const sendMail = async ({ name, email, phone }:{
  name: string,
  email: string,
  phone: string
}) => {
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
    } as nodemailer.TransportOptions);

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Your order at Hungry Stomachs is confirmed!",
      text: `Hey ${name}, \n\n Congratulations on placing the fantastic order! We are so happy to deal with you! \n Head over to My Orders to check out your order details! \n We are working on providing you with tracking, however it's not available just yet so we will update you from time to time manually. \n\n We may contact you for shipping cost payment if we feel it's necessary based on your order amount and location. We like paying small amounts of shippings out of pocket for our chocolate-lovers. \n You contact us here if you got any doubt ever: WhatsApp \n`,
      html: `Hey ${name}, \n\n <b>Congratulations on placing the fantastic order!</b> We are so happy to deal with you! \n Head over to <a href="https://hungry-stomachs.vercel.app"> My Orders </a> to check out your order details! \n We are working on providing you with tracking, however it's not available just yet so we will update you from time to time manually. \n\n We may contact you for shipping cost payment if we feel it's necessary based on your order amount and location. We like paying small amounts of shippings out of pocket for our chocolate-lovers. \n You contact us here if you got any doubt ever: <a href ="https://wa.me/918283830983/?text=Hello,+I+placed+an+order!" WhatsApp \n\n\n Regards, Hungry Stomachs`,
    };

    const res = await transporter.sendMail(mailOptions);
    return res;

  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Failed to send email");
  }
};
