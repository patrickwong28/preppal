import { Meal } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

interface MealCardProp {
  meal: Meal;
}

const MealCard = ({ meal }: MealCardProp) => {
  const { name, description, calories, recipe, image } = meal;
  const { isLoaded, isSignedIn, user } = useUser();

  const handleSave = async () => {
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ meal: meal }),
    });
  };

  return (
    <div className="flex flex-col w-full h-full max-w-sm p-4 border-2 border-gray-300 rounded-2xl">
      <div className="relative aspect-video w-full">
        <Image className="object-cover" src={image} alt="pizza" fill />
      </div>
      <h2 className="text-lg font-semibold mt-3">{name}</h2>
      <p className="text-xs text-gray-500 mt-1">{calories} calories</p>
      <p className="text-sm mt-2">{description}</p>
      <button
        className="rounded-3xl self-end bg-blue-500 text-white mt-2 p-3"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default MealCard;
