import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
    try {
      const token = req.cookies.token;
  
      // Check if token exists
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Optionally attach user info to request (if needed later)
      req.user = decoded;
  
      next();
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
};