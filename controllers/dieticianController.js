import Menu from "../models/menuModel.js";
import User from "../models/userModel.js";
import HttpError from "../models/httpError.js";
import RecipesMenu from "../models/recipesMenu.js";

export const usersMenus = async (req, res) => {
  let menus;
  let menuNames;
  await Menu.find({})
    .exec()
    .then((documents) => {
      menus = documents;
    })
    .catch((err) => {
      console.error(err);
    });

  let uidArrs = menus.map((item) => item.user);
  let menuDates = menus.map((item) => item.createdAt);
  let menuIds = menus.map((item) => item._id);
  menuIds = menuIds.map((objectId) => objectId.toString());
  //   console.log(menuIds);

  let ids = uidArrs.map((objectId) => objectId.toString());

  // Call the function to fetch user details
  await fetchUserDetails(ids)
    .then((userDetails) => {
      menuNames = userDetails;
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });

  const menuDetails = {
    menuDates: menuDates,
    menuNames: menuNames,
    menuIds: menuIds,
    menuType: "regMenu",
  };

  //   console.log(menuDetails);
  res.json({ menuDetails: menuDetails });
};

// Function to fetch user by ID and retrieve firstName and lastName
async function fetchUserDetails(userIds) {
  const userDetails = [];

  for (const userId of userIds) {
    try {
      const user = await User.findById(userId);
      const firstName = user.firstName;
      const lastName = user.lastName;

      userDetails.push({ firstName, lastName });
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
    }
  }

  return userDetails;
}

export const usersRecipeMenus = async (req, res) => {
  let menus;
  let menuNames;
  await RecipesMenu.find({})
    .exec()
    .then((documents) => {
      menus = documents;
    })
    .catch((err) => {
      console.error(err);
    });

  let uidArrs = menus.map((item) => item.user);
  let menuDates = menus.map((item) => item.createdAt);
  let ids = uidArrs.map((objectId) => objectId.toString());
  let menuIds = menus.map((item) => item._id);
  menuIds = menuIds.map((objectId) => objectId.toString());

  await fetchUserDetails(ids)
    .then((userDetails) => {
      menuNames = userDetails;
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });

  const menuDetails = {
    menuDates: menuDates,
    menuNames: menuNames,
    menuIds: menuIds,
    menuType: "recMenu",
  };

  // console.log(menuIds);
  res.json({ menuDetails: menuDetails });
};

export const recipeMenu = async (req, res) => {
  const menuId = req.params.mid;

  let menu;
  try {
    menu = await RecipesMenu.findById(menuId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a menu.",
      500
    );
    return next(error);
  }
  // console.log(menu);
  res.json({ menu: menu });
};
