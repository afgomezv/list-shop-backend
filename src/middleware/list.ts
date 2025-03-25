import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";
import List from "../models/List";

declare global {
  namespace Express {
    interface Request {
      list: List;
    }
  }
}

export const validateListId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("listId")
    .isInt()
    .withMessage("ID must be a number")
    .bail()
    .custom((value) => value > 0)
    .withMessage("ID must be greater than zero")
    .bail()
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};

export const validateListExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { listId } = req.params;
  try {
    const list = await List.findByPk(listId);

    if (!list) {
      res.status(404).json({ message: "La lista no existe" });
      return;
    }
    req.list = list;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
