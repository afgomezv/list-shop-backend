import { Router } from "express";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validateUserInput";
import { handleInputErrors } from "../middleware/handleInputErros";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post(
  "/register",
  validateRegisterInput,
  handleInputErrors,
  AuthController.createAccount
);

router.post(
  "/login",
  validateLoginInput,
  handleInputErrors,
  AuthController.login
);

export default router;
