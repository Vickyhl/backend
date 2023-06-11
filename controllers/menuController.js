import mongoose from "mongoose";
import HttpError from "../models/httpError.js";
import Menu from "../models/menuModel.js";
import User from "../models/userModel.js";
import RecipesMenu from "../models/recipesMenu.js";
import Recipe from "../models/recipeModel.js";
//check
import {
  carbsDishes,
  TwoCarbsForLunchDishes,
  ThreeCarbsForLunchDishes,
  sweetCarbs,
  proteinDishes,
  fatsDishes,
  TwofatsDishes,
  sweetFats,
  vegetables,
  OneAndHalfMeatProtein,
  TwoMeatProtein,
  TwoAndHalfMeatProtein,
  sweetBreakfast,
  sweetSnack,
  sourBreakfast,
  sourSnack,
} from "../data/courses.js";

export const getMenuById = async (req, res, next) => {
  // const menuId = JSON.parse(req.params.mid).mid;
  const menuId = req.params.mid;

  // console.log("menuId is:", menuId);
  let menu;
  try {
    menu = await Menu.findById(menuId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a menu.",
      500
    );
    return next(error);
  }

  if (!menu) {
    const error = new HttpError(
      "Could not find menu for the provided id.",
      404
    );
    return next(error);
  }
  res.status(201).json({ menu: menu });
};

export const updateMenu = async (req, res) => {
  const menuId = req.params.mid;
  const data = req.body;

  console.log("menuId is:", data);
  let menu;
  try {
    menu = await Menu.findById(menuId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a menu.",
      500
    );
    return next(error);
  }

  if (menu) {
    menu.meal1 = data.menu.meal1;
    menu.meal2 = data.menu.meal2;
    menu.meal3 = data.menu.meal3;
    menu.meal4 = data.menu.meal4;
    menu.meal5 = data.menu.meal5;
  }
  await menu.save();
  res.send({ message: "Menu updated successfully!" });
};

export const getLastMenu = async (req, res, next) => {
  let menu = await Menu.findOne({}, {}, { sort: { _id: -1 } });
  res.json({ menu: menu.toObject({ getters: true }) });
};

export const fetchMenus = async (req, res, next) => {
  const userID = req.params.uid;
  let userWithMenues;

  try {
    userWithMenues = await User.findById(userID).select("menus");
  } catch (err) {
    const error = new HttpError(
      "Fetching menues failed, please try again later.",
      500
    );
    return next(error);
  }
  let result = [];
  let identifers = [];
  for (let i = 0; i < userWithMenues.menus.length; i++) {
    let menu = await Menu.findById(userWithMenues.menus[i]._id);
    // identifers[i] = userWithMenues.menus[i]._id;
    result[i] = menu.createdAt;
  }
  res.status(201).json({ result: result });
};

export const getLastRecipesMenu = async (req, res) => {
  const userID = req.params.uid;
  let userWithMenues = await User.findById(userID).select("RecipesMenus");
  let num = userWithMenues.RecipesMenus.length;

  res.json({ num: num });
};

export const fetchRecipesMenus = async (req, res, next) => {
  const userID = req.params.uid;
  let userWithMenues;

  try {
    userWithMenues = await User.findById(userID).select("RecipesMenus");
  } catch (err) {
    const error = new HttpError(
      "Fetching menues failed, please try again later.",
      500
    );
    return next(error);
  }
  let result = [];
  let identifers = [];
  for (let i = 0; i < userWithMenues.RecipesMenus.length; i++) {
    let menu = await RecipesMenu.findById(userWithMenues.RecipesMenus[i]._id);
    // identifers[i] = userWithMenues.RecipesMenus[i]._id;
    result[i] = menu.createdAt;
  }
  // const mergedObject = identifers.reduce((acc, key, index) => {
  //   acc[key] = result[index];
  //   return acc;
  // }, {});

  res.status(201).json({ result });
};

export const fetchRecipeMenuByIndex = async (req, res, next) => {
  const userId = req.params.userID;
  const menuId = req.params.menuNum;

  const userWithMenues = await User.findById(userId).select("RecipesMenus");
  const result = userWithMenues.RecipesMenus[menuId - 1]._id;
  const menu = await RecipesMenu.findById(result);

  res.status(201).json({ menu: menu });
};

export const fetchRecipeById = async (req, res, next) => {
  const recipeId = req.params.rid;

  const recipe = await Recipe.findById(recipeId);
  res.status(201).json({ recipe: recipe });
};

export const getMenuesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithMenues;
  try {
    userWithMenues = await User.findById(userId).select("menus");
  } catch (err) {
    const error = new HttpError(
      "Fetching menues failed, please try again later.",
      500
    );
    return next(error);
  }

  // if (!places || places.length === 0) {
  // if (!userWithMenues || userWithMenues.menus.length === 0) {
  //   return next(
  //     new HttpError("Could not find menues for the provided user id.", 404)
  //   );
  // }
  let menu = await Menu.findById(userWithMenues.menus[0]);

  res.json({ menu: menu.toObject({ getters: true }) });
};

export const fetchMenuByIndex = async (req, res, next) => {
  const userId = req.params.uid;
  const menuId = req.params.menuNum;

  const userWithMenues = await User.findById(userId).select("menus");
  const result = userWithMenues.menus[menuId - 1]._id;
  const menu = await Menu.findById(result);

  res.status(201).json({ menu: menu });
};

function calcBMR(age, height, weight, gender, purpuse) {
  let BMR = 0;
  if (gender === "female") {
    BMR = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
  } else {
    BMR = 66 + 13.7 * weight + 5 * height - 6.8 * age;
  }
  if (purpuse === "weightLoss") {
    BMR = BMR - 300;
  }
  return BMR;
}
export const extractRecipeInfo = async (req, res) => {
  const id = req.params.createdMenuID;

  let menu = await findById();
  res.status(201).json({});
};
export async function extractRecipeInfoFunc(id) {
  let ingredients = [];
  let title;
  let prepTime;
  let serving;
  let imgURL;
  let instructions;
  let rid;
  await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=9b4de243b92d4e6db8b6f30448e307e0&includeNutrition=false`
  )
    .then((response) => response.json())
    .then((data) => {
      title = data.title;
      prepTime = data.readyInMinutes;
      serving = data.servings;
      imgURL = data.image;
      rid = data.id;
      instructions = data.instructions;
      for (let i = 0; i < data.extendedIngredients.length; i++) {
        ingredients[i] = data.extendedIngredients[i].original;
      }
    })
    .catch((error) => console.error(error));

  const recipe = {
    rid,
    title,
    prepTime,
    serving,
    imgURL,
    ingredients,
    instructions,
  };
  return recipe;
}

export const recipesMenu = async (req, res) => {
  const { age, height, weight, gender, purpuse, user } = req.body;
  console.log(purpuse);

  let BMR = calcBMR(age, height, weight, gender, purpuse);
  if (BMR >= 1200 && BMR < 1375) {
    BMR -= 300;
  } else if (BMR >= 1375 && BMR < 1575) {
    BMR -= 400;
  } else if (BMR >= 1575 && BMR < 1825) {
    BMR -= 500;
  } else if (BMR >= 1825 && BMR < 2025) {
    BMR -= 600;
  } else {
    BMR -= 700;
  }
  let recipesIDs = [];
  //generating 3-meals plan based on recipes
  await fetch(
    `https://api.spoonacular.com/mealplanner/generate?apiKey=9b4de243b92d4e6db8b6f30448e307e0&timeFrame=day&targetCalories=${BMR}&exclude=red meat, butter, souce, sweeteners, heavy cream, potato flakes`
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.meals.length; i++) {
        recipesIDs[i] = data.meals[i].id;
      }
    })
    .catch((error) => console.error(error));
  let recipes = [];
  let arrayOfRecipes = [];
  let recipesID = [];
  //extracting data from a recipe
  for (let i = 0; i < recipesIDs.length; i++) {
    recipes[i] = await extractRecipeInfoFunc(recipesIDs[i]);
    const recipe = new Recipe({
      rid: recipes[i].rid,
      title: recipes[i].title,
      prepTime: recipes[i].prepTime,
      serving: recipes[i].serving,
      imgURL: recipes[i].imgURL,
      ingredients: recipes[i].ingredients,
      instructions: recipes[i].instructions,
    });
    console.log("Recipe ingredients:", recipe.ingredients);
    arrayOfRecipes.push(recipe);
    recipesID.push(recipe._id);
    await Recipe.collection.insertOne(recipe);
    console.log("Recipe inserted:", recipe);
  }
  console.error("202", user);
  console.error("203", purpuse);
  const createdMenu = new RecipesMenu({
    user: user,
    category: purpuse,
    recipes: arrayOfRecipes,
  });

  let subjectUser;
  try {
    subjectUser = await User.findById(user);
  } catch (err) {
    const error = new HttpError("Creating menu failed, please try again", 500);
    return next(error);
  }

  if (!subjectUser) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  console.log(createdMenu);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await RecipesMenu.collection.insertOne(createdMenu, { session: sess });
    subjectUser.RecipesMenus.push(createdMenu);
    await subjectUser.save({ session: sess });
    await sess.commitTransaction();
    await sess.endSession();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating menu failed, please try again", 500);
    return next(error);
  }
  let num = subjectUser.RecipesMenus.length;

  res.status(201).json({ num });
};

export const snackGenerator = async (req, res) => {
  const type = req.params.type;

  let randomSweetSnack = Math.floor(Math.random() * 36);
  let randomSourSnack = Math.floor(Math.random() * 27);
  let sweet = sweetSnack(randomSweetSnack);
  let sour = sourSnack(randomSourSnack);

  const snacks = {
    sweetSnack: sweet,
    sourSnack: sour,
  };
  // console.log(snacks);
  if (type === 0) {
    res.status(201).json({ snacks: snacks.sweetSnack });
  } else {
    res.status(201).json({ snacks: snacks.sourSnack });
  }
};

export const personalizedMenu = async (req, res, next) => {
  const { age, height, weight, gender, purpuse, userID } = req.body;
  let BMR = calcBMR(age, height, weight, gender, purpuse);
  let meal1 = [];
  let meal2 = [];
  let meal3 = [];
  let meal4 = [];
  let meal5 = [];

  let raffledNumber = Math.random() >= 0.5 ? 1 : 0;
  let randomSweetBreakfast = Math.floor(Math.random() * 108);
  let randomSourBreakfast = Math.floor(Math.random() * 2700);
  let randomSweetSnack = Math.floor(Math.random() * 36);
  let randomSourSnack = Math.floor(Math.random() * 27);

  if (BMR >= 1200 && BMR < 1375) {
    // 60, 170, 70
    // carbsDishes = 8;
    // proteinDishes = 4;
    // meatProtein = 1.5;
    // fatDishes = 5;
    if (raffledNumber === 1) {
      meal1 = sweetBreakfast(randomSweetBreakfast);
      meal2 = sourSnack(randomSourSnack);
      meal4 = sweetSnack(randomSweetSnack);
      meal5 = sourBreakfast(randomSourBreakfast);
    } else {
      meal1 = sourBreakfast(randomSourBreakfast);
      meal2 = sweetSnack(randomSweetSnack);
      meal4 = sourSnack(randomSourSnack);
      meal5 = sweetBreakfast(randomSweetBreakfast);
    }
    meal3 = [
      TwoCarbsForLunchDishes[Math.floor(Math.random() * 6)],
      OneAndHalfMeatProtein[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 10)],
      fatsDishes[Math.floor(Math.random() * 3)],
    ];
  } else if (BMR >= 1375 && BMR < 1575) {
    // 18, 87, 70
    console.log("in 138");
    // carbsDishes = 9;
    // proteinDishes = 5;
    // meatProtein = 1.5;
    // fatDishes = 6;
    if (raffledNumber === 1) {
      meal1 = sweetBreakfast(randomSweetBreakfast) + ", " + ["Yogurt cup 1.5%"];
      meal2 =
        sourSnack(randomSourSnack) +
        ", " +
        carbsDishes[Math.floor(Math.random() * 3)];
      meal4 = sweetSnack(randomSweetSnack);
      meal5 =
        sourBreakfast(randomSourBreakfast) +
        ", " +
        sweetFats[Math.floor(Math.random() * 3)];
    } else {
      meal1 =
        sourBreakfast(randomSourBreakfast) +
        ", " +
        proteinDishes[Math.floor(Math.random() * 3)];
      meal2 = sweetSnack(randomSweetSnack);
      meal4 =
        sourSnack(randomSourSnack) +
        ", " +
        carbsDishes[Math.floor(Math.random() * 3)];
      meal5 =
        sweetBreakfast(randomSweetBreakfast) +
        ", " +
        sweetFats[Math.floor(Math.random() * 3)];
    }
    meal3 = [
      TwoCarbsForLunchDishes[Math.floor(Math.random() * 6)],
      OneAndHalfMeatProtein[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 3)],
      vegetables[Math.floor(Math.random() * 10)],
    ];
  } else if (BMR >= 1575 && BMR < 1825) {
    // 18, 43, 120
    console.log("in 171");

    // carbsDishes = 10;
    // proteinDishes = 6;
    // meatProtein = 2;
    // fatDishes = 7;
    if (raffledNumber === 1) {
      meal1 = sweetBreakfast(randomSweetBreakfast) + ", " + ["Yogurt cup 1.5%"];
      meal2 =
        sourSnack(randomSourSnack) +
        ", " +
        carbsDishes[Math.floor(Math.random() * 3)];
      meal4 =
        sweetSnack(randomSweetSnack) +
        ", " +
        sweetCarbs[Math.floor(Math.random() * 3)];
      meal5 =
        sourBreakfast(randomSourBreakfast) +
        ", " +
        sweetFats[Math.floor(Math.random() * 3)] +
        ", " +
        proteinDishes[Math.floor(Math.random() * 3)];
    } else {
      meal1 =
        sourBreakfast(randomSourBreakfast) +
        ", " +
        proteinDishes[Math.floor(Math.random() * 3)];
      meal2 =
        sweetSnack(randomSweetSnack) +
        ", " +
        sweetCarbs[Math.floor(Math.random() * 3)];
      meal4 =
        sourSnack(randomSourSnack) +
        ", " +
        carbsDishes[Math.floor(Math.random() * 3)];
      meal5 =
        sweetBreakfast(randomSweetBreakfast) +
        ", " +
        sweetFats[Math.floor(Math.random() * 3)] +
        ", " +
        ["Yogurt cup 1.5%"];
    }
    meal3 = [
      TwoCarbsForLunchDishes[Math.floor(Math.random() * 6)],
      TwoMeatProtein[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 10)],
      fatsDishes[Math.floor(Math.random() * 3)],
    ];
  } else if (BMR >= 1825 && BMR < 2025) {
    // 60, 200, 120
    console.log("in 1885");
    // carbsDishes = 11;
    // proteinDishes = 7;
    // meatProtein = 2;
    // fatDishes = 8;
    if (raffledNumber === 1) {
      meal1 = sweetBreakfast(randomSweetBreakfast) + ", " + ["Yogurt cup 1.5%"];
      meal2 =
        sourSnack(randomSourSnack) +
        ", " +
        carbsDishes[Math.floor(Math.random() * 3)] +
        ", " +
        proteinDishes[Math.floor(Math.random() * 3)];
      meal4 =
        sweetSnack(randomSweetSnack) +
        ", " +
        sweetCarbs[Math.floor(Math.random() * 3)];
      meal5 =
        sourBreakfast(randomSourBreakfast) +
        ", " +
        sweetFats[Math.floor(Math.random() * 3)] +
        ", " +
        proteinDishes[Math.floor(Math.random() * 3)];
    } else {
      meal1 =
        sourBreakfast(randomSourBreakfast) +
        ", " +
        proteinDishes[Math.floor(Math.random() * 3)];
      meal2 =
        sweetSnack(randomSweetSnack) +
        ", " +
        sweetCarbs[Math.floor(Math.random() * 3)] +
        ", " +
        ["Yogurt cup 1.5%"];
      meal4 =
        sourSnack(randomSourSnack) +
        ", " +
        carbsDishes[Math.floor(Math.random() * 3)];
      meal5 =
        sweetBreakfast(randomSweetBreakfast) +
        ", " +
        sweetFats[Math.floor(Math.random() * 3)] +
        ", " +
        ["Yogurt cup 1.5%"];
    }
    meal3 = [
      TwoCarbsForLunchDishes[Math.floor(Math.random() * 6)],
      TwoMeatProtein[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 10)],
      fatsDishes[Math.floor(Math.random() * 3)],
    ];
  } else {
    // 30, 297, 120
    console.log("in 277");
    // carbsDishes = 12;
    // proteinDishes = 7;
    // meatProtein = 2.5;
    // fatDishes = 9;
    if (raffledNumber === 1) {
      meal1 =
        sweetBreakfast(randomSweetBreakfast) +
        ", " +
        ["Yogurt cup 1.5%"] +
        ", " +
        sweetCarbs[Math.floor(Math.random() * 3)] +
        ", " +
        sweetFats[Math.floor(Math.random() * 3)];
      meal2 =
        sourSnack(randomSourSnack) +
        ", " +
        carbsDishes[Math.floor(Math.random() * 3)] +
        ", " +
        proteinDishes[Math.floor(Math.random() * 3)];
      meal4 =
        sweetSnack(randomSweetSnack) +
        ", " +
        sweetCarbs[Math.floor(Math.random() * 3)] +
        ", " +
        sweetFats[Math.floor(Math.random() * 3)];
      meal5 =
        sourBreakfast(randomSourBreakfast) +
        ", " +
        fatsDishes[Math.floor(Math.random() * 3)] +
        ", " +
        proteinDishes[Math.floor(Math.random() * 3)];
    } else {
      meal1 =
        sourBreakfast(randomSourBreakfast) +
        ", " +
        proteinDishes[Math.floor(Math.random() * 3)] +
        ", " +
        carbsDishes[Math.floor(Math.random() * 3)];
      meal2 =
        sweetSnack(randomSweetSnack) +
        ", " +
        sweetCarbs[Math.floor(Math.random() * 3)] +
        ", " +
        ["Yogurt cup 1.5%"];
      meal4 =
        sourSnack(randomSourSnack) +
        ", " +
        carbsDishes[Math.floor(Math.random() * 3)] +
        ", " +
        fatsDishes[Math.floor(Math.random() * 3)];
      meal5 =
        sweetBreakfast(randomSweetBreakfast) +
        ", " +
        sweetFats[Math.floor(Math.random() * 3)] +
        ", " +
        ["Yogurt cup 1.5%"];
    }
    meal3 = [
      ThreeCarbsForLunchDishes[Math.floor(Math.random() * 6)],
      TwoAndHalfMeatProtein[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 10)],
      TwofatsDishes[Math.floor(Math.random() * 3)],
    ];
  }

  meal1 = meal1.split(",");
  meal2 = meal2.split(",");
  meal4 = meal4.split(",");
  meal5 = meal5.split(",");
  console.log("user id:", userID);
  const createdMenu = new Menu({
    user: req.body.user,
    category: purpuse,
    meal1,
    meal2,
    meal3,
    meal4,
    meal5,
  });

  console.log("user 289:", req.body.user);
  let subjectUser;
  try {
    subjectUser = await User.findById(req.body.user);
  } catch (err) {
    const error = new HttpError("Creating menu failed, please try again", 500);
    return next(error);
  }

  if (!subjectUser) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  console.log(createdMenu);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Menu.collection.insertOne(createdMenu, { session: sess });
    subjectUser.menus.push(createdMenu);
    await subjectUser.save({ session: sess });
    await sess.commitTransaction();
    await sess.endSession();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating menu failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ menu: createdMenu });
};
