"use client";

import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState([]);

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

  return <div>PrepPal</div>;
}
