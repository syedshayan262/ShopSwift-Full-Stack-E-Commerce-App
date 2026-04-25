import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Login required" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);

    (req as any).user = data;

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
