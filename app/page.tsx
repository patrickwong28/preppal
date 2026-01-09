"use client";

import IngredientForm from "@/components/IngredientForm";
import MealContainer from "@/components/MealContainer";
import { useState } from "react";
// import Meal from "../utils/types.ts";

export default function Home() {
  // TODO: change the type for the array storing string to array storing Meal objects
  const [meals, setMeals] = useState<string[]>([]);

  const handleSetMeal = (newMeals: string[]) => {
    setMeals(newMeals);
  };

  return (
    <section className="w-full max-w-max mx-auto mt-16">
      <IngredientForm onGenerated={handleSetMeal} />
      {/* TODO: create meal container to display the meals */}
      <MealContainer meals={meals} />
    </section>
  );
}
