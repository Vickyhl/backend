import Recipe from "../models/recipeModel.js";

export const fetchRecipe = async (req, res) => {
  let ingredients = [];
  let instructions = [];
  let timers = [];
  let stepTimers = [];
  const rid = req.params.rid;

  const response = await fetch(
    `https://api.spoonacular.com/recipes/${rid}/information?apiKey=${process.env.RECIPES_API_KEY}&includeNutrition=false`
  );

  const data = await response.json();
  for (let i = 0; i < data.extendedIngredients.length; i++) {
    ingredients[i] = data.extendedIngredients[i].original;
  }

  for (let i = 0; i < data.analyzedInstructions[0].steps.length; i++) {
    const step = data.analyzedInstructions[0].steps[i];

    const instruction = {
      text: step.step,
      id: i,
    };

    if (step.length) {
      instruction.duration = step.length.number;
    }

    instructions.push(instruction);
  }

  let title = data.title;
  const prepServe = await prepAndServing(title);
  console.log(prepServe);

  const recipe = {
    title,
    prepTime: prepServe.prepTime,
    serving: prepServe.serving,
    ingredients,
    instructions,
    timers,
    stepTimers,
  };

  res.status(201).json({ recipe: recipe });
};

async function prepAndServing(targetTitle) {
  const document = await Recipe.findOne({ title: targetTitle });
  const PAS = {
    prepTime: document.prepTime,
    serving: document.serving,
  };
  return PAS;
}

export const fetchNutrients = async (req, res) => {
  const rid = req.params.rid;
  let bad = [];
  let good = [];

  const response = await fetch(
    `https://api.spoonacular.com/recipes/${rid}/nutritionWidget.json?apiKey=${process.env.RECIPES_API_KEY}`
  );
  const data = await response.json();
  bad = data.bad;
  good = data.good.slice(0, 7);

  const extractedBad = bad.map(({ amount, title }) => ({ amount, title }));
  const extractedGood = good.map(({ amount, title }) => ({ amount, title }));

  const items = extractedBad.concat(extractedGood);
  // console.log(items);

  res.status(201).json({ items: items });
};
