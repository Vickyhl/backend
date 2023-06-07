import mongoose from "mongoose";
import moment from "moment-timezone";

const recipesMenuSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Recipe",
      },
    ],
    category: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: true,
    },
    paymentMethod: {
      type: String,
      // required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    isPaid: {
      type: Boolean,
      // required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: moment().tz("Israel").format(),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RecipesMenu = mongoose.model("RecipesMenu", recipesMenuSchema);

export default RecipesMenu;
