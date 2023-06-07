import User from "../models/userModel.js";
import RecipesMenu from "../models/recipesMenu.js";
import Menu from "../models/menuModel.js";

export const fetchRegularGrocery = async (req, res) => {
  const userID = req.params.uid;
  const user = await User.findById(userID).select("menus");
  const lastElement = user.menus[user.menus.length - 1];
  const hexadecimalString = lastElement.toHexString();

  const menu = await Menu.findById(hexadecimalString);
  const groceryList = generateGroceryList(menu);

  //   const mergedList = mergeSimilarItems(groceryList);
  //   console.log(groceryList);
  res.status(201).json({ groceryList: groceryList });
};

function generateGroceryList(mealPlan) {
  const groceryList = [];

  for (const mealKey in mealPlan) {
    if (Array.isArray(mealPlan[mealKey])) {
      groceryList.push(...mealPlan[mealKey]);
    }
  }

  return groceryList;
}

function mergeSimilarItems(list) {
  const mergedList = {};

  for (const item of list) {
    const match = item.match(/^(.+) - (\d+) (.+)$/);

    if (match) {
      const name = match[1].trim();
      const quantity = parseInt(match[2]);
      const unit = match[3].trim();

      const existingItem = mergedList[name];
      if (existingItem && existingItem.unit === unit) {
        existingItem.quantity += quantity;
      } else {
        mergedList[item] = {
          name,
          quantity,
          unit,
        };
      }
    } else {
      if (mergedList[item]) {
        mergedList[item].quantity += 1;
      } else {
        mergedList[item] = {
          name: item,
          quantity: 1,
          unit: "",
        };
      }
    }
  }

  const mergedItems = Object.values(mergedList).map((item) => {
    if (item.unit !== "") {
      return `${item.name} - ${item.quantity} ${item.unit}`;
    } else {
      return `${item.name}`;
    }
  });

  return mergedItems;
}

export const fetchRecipeGrocery = async (req, res) => {
  const userID = req.params.uid;
  const user = await User.findById(userID).select("RecipesMenus");
  const lastElement = user.RecipesMenus[user.RecipesMenus.length - 1];
  const hexadecimalString = lastElement.toHexString();

  const menu = await RecipesMenu.findById(hexadecimalString);
  const groceryList = mergeIngredients(menu.recipes);
  //   console.log(groceryList);
  res.status(201).json({ groceryList: groceryList });
};

function mergeIngredients(recipes) {
  const groceryList = [];

  for (const recipe of recipes) {
    const ingredients = recipe.ingredients;
    groceryList.push(...ingredients);
  }

  return groceryList;
}
