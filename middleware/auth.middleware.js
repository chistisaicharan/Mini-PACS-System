

const jwt = require("jsonwebtoken");

require("dotenv").config()

const secretKey=process.env.DB_SECERT_KEY;


// Authentication + Role Authorization Middleware
const authMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {

      // 1. Get token from headers
      const authHeader = req.headers.authorization;

      // 2. Check token exists
      if (!authHeader) {
        return res.status(401).json({
          message: "Access denied. No token provided",
        });
      }

      // 3. Extract token
      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Invalid token format",
        });
      }

      // 4. Verify token
      const decoded = jwt.verify(token, secretKey);

      // 5. Attach user to request
      req.user = decoded;

      // 6. Read user role
      const userRole = req.user.role;

      // 7. Compare roles
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(userRole)
      ) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      // 8. Move to next middleware/controller
      next();

    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
        err: error.message,
      });
    }
  };
};

module.exports=authMiddleware;
