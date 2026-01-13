import Image from "next/image";
import React from "react";

const MealCard = () => {
  return (
    <div className="flex flex-col max-w-sm p-4 border-2 border-gray-300 rounded-2xl">
      <div className="relative aspect-video w-full">
        <Image className="object-cover" src="/pizza.jpg" alt="pizza" fill />
      </div>
      <h2 className="text-lg font-semibold mt-3">French Onion Dip Pizza</h2>
      <p className="text-xs text-gray-500 mt-1">910 Calories</p>
      <p className="text-sm mt-2">
        A savory, comforting pizza inspired by classic French onion dip,
        featuring slow caramelized onions, a creamy onion forward base, melted
        mozzarella and Gruyère, and finished with fresh chives for a rich,
        tangy, and deeply umami bite
      </p>
      <button className="rounded-3xl self-end bg-blue-500 text-white mt-2 p-3">
        Recipe
      </button>
    </div>
  );
};

export default MealCard;
