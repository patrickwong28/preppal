"use client";

import IngredientForm from "@/components/IngredientForm";
import MealContainer from "@/components/MealContainer";
import { Meal } from "@/utils/types";
import { useState } from "react";

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const handleSetMeal = (newMeals: Meal[]) => {
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
