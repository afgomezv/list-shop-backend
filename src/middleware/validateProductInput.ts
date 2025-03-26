import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateProductInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .notEmpty()
    .withMessage("El nombre de la lista es obligatorio")
    .run(req);
  await body("price")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número decimal mayor que cero.")
    .run(req);
  await body("stock")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero positivo o cero.")
    .run(req);

  next();
};
