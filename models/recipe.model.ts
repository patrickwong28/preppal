import mongoose, { Types } from "mongoose";

interface RecipeInterface extends mongoose.Document {
  name: string;
  description: string;
  calories: number;
  recipe: string[];
  image: string;
  clerkUserId: string;
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
    recipe: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

export const Recipe =
  mongoose.models.Recipe ||
  mongoose.model<RecipeInterface>("Recipe", recipeSchema);
