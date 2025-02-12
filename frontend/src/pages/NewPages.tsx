import { useState } from "react";
import Form from "../components/Form";
import RecipeDisplay from "../components/RecipeDisplay";
import { addFavorites } from "../api/dishAPI";

function RecipeGenerator() {
    const [recipe, setRecipe] = useState< string | null>(null);
    const [favorites, setFavorites] = useState<{ title: string; ingredients: string[]; instructions: string }[]>([]);

    const addFavorite = () => {
        if (recipe ) {
            addFavorites(recipe);
            setFavorites(favorites);
        }
        console.log(recipe);
    };

    return (
<div className="h-screen flex">
    <div className="w-1/2 p-10 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500" />
            <div className="absolute inset-0" 
                 style={{ 
                     backgroundImage: `radial-gradient(circle at 2px 2px, gray 1px, transparent 0)`,
                     backgroundSize: '40px 40px'
                 }} 
            />
        </div>
        
        {/* Form container with slight transparency */}
        <div className="relative bg-white/90 rounded-xl shadow-lg p-8 backdrop-blur-sm">
            <Form setRecipe={setRecipe} />
        </div>
    </div>

    {/* Right Side - Recipe Output */}
    <div className="w-1/2 p-10 bg-black text-white overflow-auto">
        {recipe && <RecipeDisplay recipe={recipe} />}
        <button onClick={addFavorite} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Add to Favorites
        </button>
        <div className="mt-4">
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

