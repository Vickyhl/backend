export const carbsDishes = [
  "Whole wheat bread- 1 slice",
  "Light bread- 2 slices",
  "rice cakes- 3 psc",
];

export const sweetCarbs = [
  "Quaker- 3 spoons",
  "Granola- 3 spoons",
  "Cereal- 3/4 cup",
];

export const TwoCarbsDishes = [
  "Whole wheat bread- 2 slice",
  "Light bread- 4 slices",
  "rice cakes- 6 psc",
  "Quaker- 6 spoons",
  "Granola- 6 spoons",
  "Cereal- 1.5 cup",
];

export const ThreeCarbsDishes = [
  "Whole wheat bread- 3 slice",
  "Light bread- 6 slices",
  "rice cakes- 9 psc",
  "Quaker- 9 spoons",
  "Granola- 9 spoons",
  "Cereal- 2.25 cups",
];

export const meatProtein = [
  "Tofu- 28 gr",
  "Salmon- 50 gr",
  "Chicken Breast- 50 gr",
  "Beef- 45 gr",
];

export const OneAndHalfMeatProtein = [
  "Tofu- 42 gr",
  "Salmon- 75 gr",
  "Chicken Breast- 75 gr",
  "Beef- 68 gr",
];

export const TwoMeatProtein = [
  "Tofu- 56 gr",
  "Salmon- 100 gr",
  "Chicken Breast- 100 gr",
  "Beef- 90 gr",
];

export const TwoAndHalfMeatProtein = [
  "Tofu- 70 gr",
  "Salmon- 125 gr",
  "Chicken Breast- 125 gr",
  "Beef- 113 gr",
];

export const carbsForLunchDishes = [
  "Bulgur- 3 spoons",
  "Rice- 3 spoons",
  "Buckwheat- 3 spoons",
  "Quinoa- 2 spoons",
  "Potato- 1.5 small units",
  "Sweet potato- 1.5 small units",
];

export const TwoCarbsForLunchDishes = [
  "Bulgur- 6 spoons",
  "Rice- 6 spoons",
  "Buckwheat- 6 spoons",
  "Quinoa- 4 spoons",
  "Potato- 3 small units",
  "Sweet potato- 3 small units",
];

export const ThreeCarbsForLunchDishes = [
  "Bulgur- 9 spoons",
  "Rice- 9 spoons",
  "Buckwheat- 9 spoons",
  "Quinoa- 4 spoons",
  "Potato- 4.5 small units",
  "Sweet potato- 4.5 small units",
];

export const proteinDishes = [
  "Yellow cheese 9%- 1.5 psc",
  "Cream cheese 3%- 3 teaspoons",
  "1 Egg",
];

export const sweetProtein = ["Yogurt cup 1.5%"];

export const TwoProteinDishes = [
  "Yellow cheese 9%- 3 psc",
  "Cream cheese 3%- 6 teaspoons",
  "2 Egg",
  "Yogurt 1.5%- 2 cups",
];

export const fatsDishes = [
  "Raw tehini- 1 spoon",
  "Avocado- 2 spoons",
  "Olives- 8 psc",
];

export const sweetFats = [
  "Almonds- 5 psc",
  "Pistachio- 6 psc",
  "Natural peanut butter- 1 teaspoon",
];

export const TwofatsDishes = [
  "Raw tehini- 2 spoon",
  "Avocado- 4 spoons",
  "Olives- 16 psc",
  "Almonds- 10 psc",
  "Pistachio- 12 psc",
  "Natural peanut butter- 2 teaspoon",
];

export const vegetables = [
  //10
  "Tomato",
  "Cucumber",
  "Small onion",
  "Squash- 2 small units",
  "Beet- 1 small unit",
  "Carrot",
  "Radish- 3 units",
  "Bell peper",
  "Fennel - 1 unit",
  "Cooked green beans- 150 gr",
];

export const fruitsDishes = [
  //12
  "1 small apple",
  "1 small orange",
  "1 small Banana",
  "Peach",
  "Guava",
  "Plum",
  "Melon- 1 cup",
  "Watermelon- 1 cup",
  "Grapes- 12 units",
  "Cherries- 12 units",
  "Mango- half small unit",
  "1 medium pear",
];

export const sweetBreakfast = (number) => {
  //108 options
  // Define an array to store all possible combinations
  let sweetBreakfastCombinations = [];

  // Generate all possible combinations using nested loops
  for (let i = 0; i < sweetCarbs.length; i++) {
    for (let j = 0; j < sweetProtein.length; j++) {
      for (let k = 0; k < sweetFats.length; k++) {
        for (let l = 0; l < fruitsDishes.length; l++) {
          // Combine the items from each group into a single string
          let combination =
            sweetCarbs[i] +
            ", " +
            sweetProtein[j] +
            ", " +
            sweetFats[k] +
            ", " +
            fruitsDishes[l];
          // Add the combination to the array
          sweetBreakfastCombinations.push(combination);
        }
      }
    }
  }
  return sweetBreakfastCombinations[number];
};

export const sweetSnack = (number) => {
  //36 options
  // Define an array to store all possible combinations
  let sweetSnackCombinations = [];

  // Generate all possible combinations using nested loops
  for (let j = 0; j < sweetProtein.length; j++) {
    for (let k = 0; k < sweetFats.length; k++) {
      for (let l = 0; l < fruitsDishes.length; l++) {
        // Combine the items from each group into a single string
        let combination =
          sweetProtein[j] + ", " + sweetFats[k] + ", " + fruitsDishes[l];
        // Add the combination to the array
        sweetSnackCombinations.push(combination);
      }
    }
  }
  return sweetSnackCombinations[number];
};

export const sourBreakfast = (number) => {
  //2700 options
  // Define an array to store all possible combinations
  let sourBreakfastCombinations = [];

  // Generate all possible combinations using nested loops
  for (let i = 0; i < carbsDishes.length; i++) {
    for (let j = 0; j < proteinDishes.length; j++) {
      for (let k = 0; k < fatsDishes.length; k++) {
        for (let l = 0; l < vegetables.length; l++) {
          for (let m = 0; m < vegetables.length; m++) {
            // Combine the items from each group into a single string
            let combination =
              carbsDishes[i] +
              ", " +
              proteinDishes[j] +
              ", " +
              fatsDishes[k] +
              ", " +
              vegetables[l] +
              ", " +
              vegetables[m];
            // Add the combination to the array
            sourBreakfastCombinations.push(combination);
          }
        }
      }
    }
  }
  return sourBreakfastCombinations[number];
};

export const sourSnack = (number) => {
  //27 options
  // Define an array to store all possible combinations
  let sourSnackCombinations = [];

  // Generate all possible combinations using nested loops
  for (let j = 0; j < carbsDishes.length; j++) {
    for (let k = 0; k < proteinDishes.length; k++) {
      for (let l = 0; l < fatsDishes.length; l++) {
        for (let m = 0; m < vegetables.length; m++) {
          // Combine the items from each group into a single string
          let combination =
            carbsDishes[j] +
            ", " +
            proteinDishes[k] +
            ", " +
            fatsDishes[l] +
            ", " +
            vegetables[m];
          // Add the combination to the array
          sourSnackCombinations.push(combination);
        }
      }
    }
  }
  return sourSnackCombinations[number];
};
