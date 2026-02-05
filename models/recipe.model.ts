import mongoose, { Types } from "mongoose";
import { UserInterface } from "./user.model";

interface RecipeInterface extends mongoose.Document {
  name: string;
  description: string;
  calories: number;
  ingredients: string[];
  image: string;
  user: Types.ObjectId | UserInterface;
  createdAt: Date;
  updatedAt: Date;
}

const recipeSchema = new mongoose.Schema<RecipeInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

export const Recipe =
  mongoose.models.Recipe ||
  mongoose.model<RecipeInterface>("Recipe", recipeSchema);
