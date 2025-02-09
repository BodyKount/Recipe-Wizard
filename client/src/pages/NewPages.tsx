import { useState } from "react";
import Form from "../components/Form";
import RecipeDisplay from "../components/RecipeDisplay";

function RecipeGenerator() {
    const [recipe, setRecipe] = useState<{ title: string; ingredients: string[]; instructions: string } | null>(null);
    const [favorites, setFavorites] = useState<{ title: string; ingredients: string[]; instructions: string }[]>([]);

    const addFavorite = () => {
        if (recipe && !favorites.some(fav => fav.title === recipe.title)) {
            setFavorites([...favorites, recipe]);
        }
    };

    return (
        <div className="h-screen flex">
            {/* Left Side - Form */}
            <div className="w-1/2 p-10 bg-gray-100">
                <Form setRecipe={setRecipe} />
            </div>

            {/* Right Side - Recipe Output */}
            <div className="w-1/2 p-10 bg-black text-white overflow-auto">
                {recipe && <RecipeDisplay recipe={recipe} />}
                <button onClick={addFavorite} className="mt-4 p-2 bg-blue-500 text-white rounded">
                    Add to Favorites
                </button>
                <div className="mt-4">
                    <h2 className="text-xl">Favorite Recipes:</h2>
                    <ul>
                        {favorites.map((fav, index) => (
                            <li key={index}>{fav.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RecipeGenerator;

