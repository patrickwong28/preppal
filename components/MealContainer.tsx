"use client";

import React from "react";
import MealCard from "./MealCard";

const MealContainer = ({ meals }: { meals: string[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-8 mt-8 ">
      {[1, 2, 3, 4].map((id) => (
        <MealCard key={id} />
      ))}
    </div>
  );
};

export default MealContainer;
