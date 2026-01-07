"use client";

import { useState } from "react";
import MealCard from "./MealCard";

const IngredientForm = ({
  onGenerated,
}: {
  onGenerated: (meals: string[]) => void;
}) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // Create a Meal interface that stores information about meals then create a meals array state variable to map over to display information in the form of cards

  const handleSubmit = async () => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Does an array need to be wrapped in curly braces like an object, also do I need to assign a field name for the data im attaching to the body
      body: JSON.stringify(ingredients),
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddIngredient = () => {
    if (inputValue.length === 0) return;

    setIngredients((prevIngredients) => [...prevIngredients, inputValue]);
    setInputValue("");
  };

  return (
    <div className="flex flex-col">
      <hr className="border border-gray-300" />
      <div className="flex justify-center items-center gap-2 pt-8">
        <input
          className="w-full max-w-2xl border-2 border-gray-300 rounded-4xl outline-none p-4"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingredients go here"
          id="form"
        />

        <button
          className="bg-text text-background rounded-4xl px-4 py-2"
          onClick={handleAddIngredient}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center max-w-2xl gap-4 mt-4 mx-auto">
        {ingredients.length > 0 &&
          ingredients.map((ingredient, index) => (
            <div key={index}>{ingredient}</div>
          ))}
      </div>

      {/* OnClick should call the handleSubmit function that makes a POST request to recipe API route */}
      <button
        className="bg-text text-background rounded-4xl disabled:hidden mt-8 mx-auto p-4"
        disabled={ingredients.length === 0}
      >
        Generate
      </button>
    </div>
  );
};

export default IngredientForm;
