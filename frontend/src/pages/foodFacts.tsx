import { useEffect, useState } from "react";
import { FoodFactsInterface } from "../interfaces/foodFactsInterface";



export default function FoodFacts() {
    const [product, setProduct] = useState<FoodFactsInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        if (query.trim() === "") return;

        setLoading(true);
        fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&json=1`)
            .then((res) => res.json())
            .then((data) => {
                if (data.products && data.products.length > 0) {
                    const product = data.products[0];
                    // Filter ingredients to show only those in English
                    if (product.ingredients_text) {
                        const ingredients = product.ingredients_text.split(",").filter((ingredient: string) => {
                            return /[a-zA-Z]/.test(ingredient);
                        }).join(", ");
                        product.ingredients_text = ingredients;
                        setProduct(product);
                    } else {
                        setProduct(null);
                    }
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching food data:", error);
                setLoading(false);
            });
    }, [query]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchQuery = formData.get("search") as string;
        setQuery(searchQuery);
    };

    return (
        <div className="h-screen flex items-center justify-center">
            {/* Food Facts container with slight transparency */}
            <div className="relative bg-white/90 rounded-xl shadow-lg p-8 backdrop-blur-sm w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">Food Facts</h1>
                <form onSubmit={handleSearch} className="mb-4">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search for a product"
                        className="border p-2 rounded w-full"
                    />
                    <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                        Search
                    </button>
                </form>
                {loading ? (
                    <p></p>
                ) : product ? (
                    <div>
                        <h2 className="text-xl font-semibold">{product.product_name}</h2>
                        {product.image_url && (
                            <img src={product.image_url} alt={product.product_name} width="200" className="my-4" />
                        )}
                        <p><strong>Brand:</strong> {product.brands || "Unknown"}</p>
                        <p><strong>Ingredients:</strong> {product.ingredients_text || "N/A"}</p>
                        
                    </div>
                ) : (
                    <p>Product not found.</p>
                )}
            </div>
        </div>
    );
}

