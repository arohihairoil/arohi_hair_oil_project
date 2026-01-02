import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderSuccessEmail = async ({ email, orderId, amount , title, product , quantity  }) => {
  const mailOptions = {
    from: `"Arohi Hair Oil" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Order Confirmed - Arohi Hair Oil",
    html: `
      <h2>Thank you for your order!</h2>
      <p>Your order has been successfully placed.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Total Amount:</strong> ₹${amount}</p>
      <br/>
      <p>We will notify you once your order is shipped.</p>
      <p>— Arohi Hair Oil Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
