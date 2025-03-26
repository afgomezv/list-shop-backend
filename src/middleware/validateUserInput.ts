import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateRegisterInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await body("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El correo electrónico no es valido")
    .run(req);
  await body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener 8 caracteres")
    .run(req);

  next();
};

export const validateLoginInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El correo electrónico no es valido")
    .run(req);
  await body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatorio")
    .run(req);

  next();
};
