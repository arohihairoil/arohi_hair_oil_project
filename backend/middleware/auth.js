// import jwt from 'jsonwebtoken';

// const authUser = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // 1️⃣ Check header
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({
//         success: false,
//         message: 'Not Authorized. Login again.'
//       });
//     }

//     // 2️⃣ Extract token
//     const token = authHeader.split(' ')[1];

//     // 3️⃣ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 4️⃣ Extract userId safely (MOST IMPORTANT)
//     req.userId = decoded.userId || decoded.id;

//     if (!req.userId) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid token. Login again.'
//       });
//     }

//     // 5️⃣ Continue
//     next();

//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({
//       success: false,
//       message: 'Not Authorized. Login again.'
//     });
//   }
// };

// export default authUser;

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
