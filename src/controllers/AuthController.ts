import type { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      res.status(409).json({ error: "El correo electrónico ya esta en uso" });
      return;
    }

    try {
      const user = await User.create(req.body);
      user.password = await hashPassword(password);
      await user.save();
      res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(404).json({ error: "Usuario no esta registrado" });
        return;
      }

      const ispasswordCorrect = await checkPassword(password, user.password);

      if (!ispasswordCorrect) {
        res.status(401).json({ error: "Contraseña Incorrecta" });
        return;
      }

      const token = generateJWT(user.id);

      res.status(200).json({ message: "Inicio de sesión correcto", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static user = async (req: Request, res: Response) => {
    res.json(req.user);
  };
}
