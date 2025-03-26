import { Router } from "express";
import { ListController } from "../controllers/ListController";
import { validateListInput } from "../middleware/validateListInput";
import { handleInputErrors } from "../middleware/handleInputErros";
import { validateListExists, validateListId } from "../middleware/list";
import { ProductController } from "../controllers/ProductController";
import {
  validateProductExists,
  validateProductId,
} from "../middleware/product";
import { validateProductInput } from "../middleware/validateProductInput";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.param("listId", validateListId);
router.param("listId", validateListExists);

router.param("productId", validateProductId);
router.param("productId", validateProductExists);

/** List **/
router.post(
  "/",
  validateListInput,
  handleInputErrors,
  ListController.createList
);

router.get("/", ListController.getAllLists);
router.get("/:listId", ListController.getByIdList);

router.put(
  "/:listId",
  validateListInput,
  handleInputErrors,
  ListController.updateList
);

router.delete("/:listId", ListController.deleteList);

/** Products **/

router.post(
  "/:listId/products",
  validateProductInput,
  handleInputErrors,
  ProductController.createProduct
);

router.get("/:listId/products/:productId", ProductController.getProductById);

router.put(
  "/:listId/products/:productId",
  validateProductInput,
  handleInputErrors,
  ProductController.updateProduct
);

router.delete("/:listId/products/:productId", ProductController.deleteProduct);

export default router;
