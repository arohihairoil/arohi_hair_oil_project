import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Arohi Hair Oil" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to Arohi Hair Oil 🌿",
    html: `
      <div style="font-family: Arial; padding: 20px; color: #333;">
        <h2 style="color:#D81B60;">Welcome to Arohi Hair Oil 🌿</h2>
        <p>Hi ${name},</p>
        <p>Thank you for creating an account with <strong>Arohi Hair Oil</strong>.</p>
        <p>We are happy to have you with us. Explore our range of hair oil and shampoo products designed for regular personal care.</p>
        <p>If you need any assistance, feel free to contact us.</p>
        <p> https://arohihairoil.com </p>
        <br/>
        <p>Warm regards,</p>
        <p><strong>Arohi Hair Oil Team</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
