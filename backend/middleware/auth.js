import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login again.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id || decoded.userId;

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Login again.",
      });
    }

    next();
  } catch (error) {
    // 🔕 DO NOT log expired JWT errors
    return res.status(401).json({
      success: false,
      message: "Session expired. Please login again.",
    });
  }
};

export default authUser;
