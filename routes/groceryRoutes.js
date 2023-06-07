import { Router } from "express";
import {
  fetchRecipeGrocery,
  fetchRegularGrocery,
} from "../controllers/groceryController.js";

const router = Router();

router.get("/fetchRegularGrocery/:uid", fetchRegularGrocery);
router.get("/fetchRecipeGrocery/:uid", fetchRecipeGrocery);

export default router;
