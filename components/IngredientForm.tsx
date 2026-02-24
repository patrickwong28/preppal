"use client";

import { Meal } from "@/utils/types";
import { useState } from "react";
import CloseIcon from "./icons/CloseIcon";

const IngredientForm = ({
  onGenerated,
}: {
  onGenerated: (meals: Meal[]) => void;
}) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    const response = await fetch("/api/recipes/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredients }),
    });

    // TODO: Render an error message on the page if the fetch request failed
    if (!response.ok) setError(true);

    const data = await response.json();

    console.log("Response to Client", data);

    onGenerated(data.data);
    setIngredients([]);
    setLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddIngredient = () => {
    if (inputValue.length === 0) return;

    setIngredients((prevIngredients) => [...prevIngredients, inputValue]);
    setInputValue("");
  };

  const handleRemoveIngredient = (indexToRemove: number) => {
    const newIngedientsList = ingredients.filter(
      (_, index) => index !== indexToRemove,
    );
    setIngredients(newIngedientsList);
  };

  return (
    <section className="flex flex-col">
      <div className="flex justify-center items-center gap-2 pt-8">
        <input
          className="w-full max-w-2xl border-2 border-gray-300 rounded-4xl outline-none px-4 py-2"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingredients go here"
          id="form"
        />

        <button
          className="bg-text text-background rounded-4xl cursor-pointer px-4 py-2"
          onClick={handleAddIngredient}
        >
          Add
        </button>
      </div>

      {ingredients.length > 0 && (
        <div className="w-full max-w-2xl mt-8 mx-auto">
          <h2 className="text-2xl">Ingredients</h2>

          <div className="flex flex-col justify-center border border-gray-300 mt-4">
            {ingredients.length > 0 &&
              ingredients.map((ingredient, index) => (
                <div
                  className="flex justify-between items-center border border-gray-300 p-3"
                  key={index}
                >
                  {ingredient}
                  <CloseIcon
                    className="w-8 h-8 hover:text-white hover:bg-text transition-color duration-150 rounded-lg cursor-pointer p-2"
                    onClick={() => handleRemoveIngredient(index)}
                  />
                </div>
              ))}
          </div>

          <button
            className="w-full bg-text text-background rounded-4xl disabled:hidden cursor-pointer mt-8 p-2"
            disabled={ingredients.length === 0}
            onClick={handleGenerate}
          >
            Generate
          </button>
        </div>
      )}
    </section>
  );
};

export default IngredientForm;
