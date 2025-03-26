import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";
import Product from "../models/Product";

declare global {
  namespace Express {
    interface Request {
      product: Product;
    }
  }
}

export const validateProductId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("productId")
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

export const validateProductExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      res.status(404).json({ message: "el product no existe" });
      return;
    }
    req.product = product;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
