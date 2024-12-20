import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

//Authenticate the token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).send("Access denied");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!); // Verify the token
    req.user = payload; // Adjunt the user to the request object
    next();
  } catch (err) {
    res.status(403).json({ error: "Token invalid or expired" });
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
