import { Router } from "express";
import CheckAuth from "../middleware/checkAuth.js";
import {
  getMenuById,
  getLastMenu,
  getMenuesByUserId,
  personalizedMenu,
  fetchMenus,
  recipesMenu,
  extractRecipeInfo,
  fetchRecipesMenus,
  fetchRecipeMenuByIndex,
  fetchMenuByIndex,
  fetchRecipeById,
  snackGenerator,
  updateMenu,
} from "../controllers/menuController.js";

const router = Router();

router.get("/:mid", getMenuById);
router.get("/user/:uid", getLastMenu);
router.get("/fetchMenuByIndex/:menuNum/:uid", fetchMenuByIndex);
router.get("/fetchMenus/:uid", fetchMenus);

router.get("/fetchRecipeById/:rid", fetchRecipeById);
router.get("/fetchRecipeMenuByIndex/:menuNum/:userID", fetchRecipeMenuByIndex);
router.get("/fetchRecipesMenus/:uid", fetchRecipesMenus);
router.get("/extractRecipeInfo/:createdMenuID", extractRecipeInfo);
router.post("/snackGenerator/:type", snackGenerator);
router.post("/updateMenu/:mid", updateMenu);

// router.use(CheckAuth);

router.post("/personalMenu", personalizedMenu);
router.post("/recipesMenu", recipesMenu);

export default router;
