import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderStatusEmail = async ({
  email,
  orderId,
  status,
  items,
}) => {
  const productList = items
    .map(
      (item) =>
        `<li>${item.name} × ${item.quantity}</li>`
    )
    .join("");

  const mailOptions = {
    from: `"Arohi Hair Oil" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Order Update: ${status}`,
    html: `
      <h2>Your order status has been updated</h2>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Status:</strong> ${status}</p>

      <h4>Products:</h4>
      <ul>${productList}</ul>

      <p>Thank you for shopping with Arohi Hair Oil 🌿</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
