import { Router } from "express";
import {
  recipeMenu,
  usersMenus,
  usersRecipeMenus,
} from "../controllers/dieticianController.js";

const router = Router();

router.get("/usersMenus", usersMenus);
router.get("/usersRecipeMenus", usersRecipeMenus);
router.get("/:mid", recipeMenu);

export default router;
