import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // 🔥 Support BOTH cookie-based AND Bearer token (localStorage) auth
  // This makes it work regardless of which approach the frontend uses
  let token = req.cookies?.accessToken;

  // If no cookie, check Authorization header (Bearer token from localStorage)
  if (!token) {
    const authHeader = req.headers?.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token. Please login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token. Please login again." });
  }
};