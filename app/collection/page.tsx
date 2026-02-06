"use client";

import MealCard from "@/components/MealCard";
import { Meal } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const StoredMealsPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [storedMeals, setStoredMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;

    const getStoredMeals = async () => {
      const response = await fetch("/api/recipes", {
        method: "GET",
      });

      if (!response.ok) setError(true);

      const data = await response.json();

      setStoredMeals(data.data);
    };

    getStoredMeals();
  }, []);

  if (!isSignedIn) return <></>;
  if (!isLoaded) return <div>Loading...</div>; // TODO: Use a spinner to show the user that their stored meals are being retrieved from the database

  return (
    <main className="w-full max-w-max mx-auto mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-8 mt-8">
        {storedMeals.map((meal, index) => (
          <MealCard key={index} meal={meal} />
        ))}
      </div>
    </main>
  );
};

export default StoredMealsPage;
