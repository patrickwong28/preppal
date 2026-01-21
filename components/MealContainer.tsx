"use client";

import React from "react";
import MealCard from "./MealCard";
import { Meal } from "@/utils/types";

const MealContainer = ({ meals }: { meals: Meal[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-8 mt-8 ">
      {meals.map((meal, index) => (
        <MealCard key={index} meal={meal} />
      ))}
    </div>
  );
};

export default MealContainer;
