import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateListInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .notEmpty()
    .withMessage("El nombre de la lista es obligatorio")
    .run(req);
  await body("description")
    .notEmpty()
    .withMessage("La description es obligatoria")
    .run(req);

  next();
};
