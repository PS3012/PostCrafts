import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendVerificationEmail = async (userId, email) => {
  const transporter = createEmailTransporter();
  const verificationLink = `${
    process.env.FRONTEND_URL
  }/verify-email?token=${generateVerificationToken(userId)}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="${process.env.FRONTEND_URL}/logo.png" alt="PostCrafts Logo" style="max-width: 150px; height: auto;">
            </div>
            <h2 style="color: #333333; text-align: center;">Welcome to Our PostCrafts!</h2>
            <p style="color: #555555; line-height: 1.6; font-size: 16px; text-align: center;">
              Thank you for joining us! To complete your registration, please verify your email address by clicking the button below.
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${verificationLink}" 
                style="display: inline-block; 
                        padding: 12px 24px; 
                        background-color: #FF8343; 
                        color: white; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        font-size: 16px; 
                        font-weight: bold;">
                Verify Email
              </a>
            </div>
            <p style="color: #777777; font-size: 14px; line-height: 1.6; text-align: center;">
              This verification link will expire in <strong>1 hour</strong>. If you didn't register, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
            <p style="color: #aaaaaa; font-size: 12px; line-height: 1.4; text-align: center;">
              © 2024 PostCrafts. All rights reserved. <br>
              <a href="${process.env.FRONTEND_URL}/privacy-policy" style="color: #FF8343; text-decoration: none;">Privacy Policy</a> | 
              <a href="${process.env.FRONTEND_URL}/terms" style="color: #FF8343; text-decoration: none;">Terms of Service</a>
            </p>
          </div>
        `,
  };

  await transporter.sendMail(mailOptions);
};

export const generateVerificationToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
