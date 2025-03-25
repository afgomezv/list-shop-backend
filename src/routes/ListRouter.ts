import { Router } from "express";
import { ListController } from "../controllers/ListController";
import { validateListInput } from "../middleware/validateListInput";
import { handleInputErrors } from "../middleware/handleInputErros";
import { validateListExists, validateListId } from "../middleware/list";

const router = Router();

router.param("listId", validateListId);
router.param("listId", validateListExists);

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

export default router;
