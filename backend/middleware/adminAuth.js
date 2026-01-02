
import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ THIS WILL NOW WORK
    if (decoded.role !== "admin") {
      return res.json({ success: false, message: "Admin access only" });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid or Expired Token" });
  }
};



export default adminAuth;
