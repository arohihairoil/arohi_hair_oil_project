import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderSuccessEmail = async ({
  email,
  orderId,
  amount,
  items,
}) => {
  // 🧾 Build product rows
  const productRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:6px 0;">${item.name}</td>
          <td style="padding:6px 0; text-align:center;">${item.quantity}</td>
          <td style="padding:6px 0; text-align:right;">₹${item.price}</td>
        </tr>
      `
    )
    .join("");

  const mailOptions = {
    from: `"Arohi Hair Oil" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "✅ Order Confirmed – Arohi Hair Oil",
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px;">
        <h2>Thank you for your order! 🎉</h2>

        <p><strong>Order ID:</strong> ${orderId}</p>

        <table width="100%" style="border-collapse: collapse; margin-top:15px;">
          <thead>
            <tr>
              <th align="left">Product</th>
              <th align="center">Qty</th>
              <th align="right">Price</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>

        <hr style="margin:20px 0;" />

        <p><strong>Total Amount:</strong> ₹${amount}</p>

        <p>We will notify you once your order is shipped.</p>

        <p style="margin-top:25px;">
          — <strong>Arohi Hair Oil Team</strong>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
