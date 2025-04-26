import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
  try {
    // Check if the token exists either in cookies or in the Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally attach user info to request (if needed later)
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

