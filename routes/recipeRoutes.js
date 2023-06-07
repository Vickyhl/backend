import { Router } from "express";
import {
  fetchRecipe,
  fetchNutrients,
} from "../controllers/recipeController.js";

const router = Router();

router.get("/fetchRecipe/:rid", fetchRecipe);
router.get("/fetchNutrients/:rid", fetchNutrients);

export default router;
