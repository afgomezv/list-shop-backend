import type { Request, Response } from "express";
import List from "../models/List";
import { io } from "../server";
import Product from "../models/Product";

export class ListController {
  static createList = async (req: Request, res: Response) => {
    try {
      const list = await List.create(req.body);
      list.userId = req.user.id;
      await list.save();
      io.emit("list:created", list);
      res.status(201).json({ message: "Lista creada correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getAllLists = async (req: Request, res: Response) => {
    try {
      const list = await List.findAll({});
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getByIdList = async (req: Request, res: Response) => {
    try {
      const list = await List.findByPk(req.list.id, {
        include: [Product],
      });
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateList = async (req: Request, res: Response) => {
    try {
      await req.list.update(req.body);
      io.emit("list:updated", req.list);
      res.status(200).json({ message: "Lista actualizada correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static deleteList = async (req: Request, res: Response) => {
    try {
      await req.list.destroy();
      io.emit("list:deleted", req.list.id);
      res.status(200).json({ message: "Lista eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
