import type { Request, Response } from "express";
import Product from "../models/Product";
import { io } from "../server";

export class ProductController {
  static createProduct = async (req: Request, res: Response) => {
    try {
      const product = await Product.create(req.body);
      product.listId = req.list.id;
      await product.save();
      io.emit("product:created", product);
      res.status(201).json({ mesagge: "Producto creado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getProductById = async (req: Request, res: Response) => {
    try {
      res.status(200).json(req.product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateProduct = async (req: Request, res: Response) => {
    try {
      await req.product.update(req.body);
      io.emit("product:updated", req.product);
      res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static deleteProduct = async (req: Request, res: Response) => {
    try {
      await req.product.destroy();
      io.emit("product:deleted", req.product);
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateIsBuyProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      product.isBuy = !product.isBuy;
      await product.save();
      io.emit("product:updated", product);
      res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
