import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import User from "../models/User";
import { verifyJWT } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ error: "No autenticado" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).json({ error: "No autenticado" });
    return;
  }

  try {
    const decoded = verifyJWT(token);
    if (typeof decoded === "object" && decoded.id) {
      req.user = await User.findByPk(decoded.id, {
        attributes: ["id", "name", "email"],
      });

      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Token Invalido" });
  }
};
