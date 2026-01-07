"use client";

import React from "react";
import MealCard from "./MealCard";

const MealContainer = () => {
  return (
    <div className="grid grid-cols-4 place-items-center gap-8 mt-8 ">
      {[1, 2, 3, 4].map((id) => (
        <MealCard key={id} />
      ))}
    </div>
  );
};

export default MealContainer;
