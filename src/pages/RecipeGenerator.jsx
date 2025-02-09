import { useState } from "react";
import Form from "../components/Form";
import RecipeDisplay from "../components/RecipeDisplay";

function RecipeGenerator() {
  const [recipe, setRecipe] = useState("");

  return (
    <div className="h-screen flex">
      {/* Left Side - Form */}
      <div className="w-1/2 p-10 bg-gray-100">
        <Form setRecipe={setRecipe} />
      </div>

      {/* Right Side - Recipe Output */}
      <div className="w-1/2 p-10 bg-black text-white">
        <RecipeDisplay recipe={recipe} />
      </div>
    </div>
  );
}

export default RecipeGenerator;
