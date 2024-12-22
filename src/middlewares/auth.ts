import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken; // Retrieve token from cookies

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Authorize the user based on their role
// export const authorizeRole = (role: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user; // `req.user` added by the `authenticateToken` middleware
//     if (user.role !== role) {
//       return res
//         .status(403)
//         .json({ error: "Access denied. You don't have the required role." });
//     }
//     next();
//   };
// };
