import mongoose from "mongoose";
import moment from "moment-timezone";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    prepTime: {
      type: Number,
      required: true,
    },
    serving: {
      type: Number,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    rid: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
