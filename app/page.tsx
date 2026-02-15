"use client";

import Hero from "@/components/Hero";
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
    <main className="w-full max-w-max mx-auto mt-16">
      <Hero />
      <IngredientForm onGenerated={handleSetMeal} />
      <MealContainer meals={meals} />
    </main>
  );
}
