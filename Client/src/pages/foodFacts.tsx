import { useEffect, useState } from "react";
import { foodFactsInterface } from "../interfaces/foodFactsInterface";
import auth from "../utils/auth";

interface dishInterface {
    id: number;
    dishName: string;
    userId: string;
}

export default function FoodFacts() {
    const [product, setProduct] = useState<foodFactsInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [savedDishes, setSavedDishes] = useState([]);

    useEffect(() => {
        fetch("https://world.openfoodfacts.org/api/v0/product/737628064502.json")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 1) {
                    setProduct(data.product);
                } else {
                    setProduct(null);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching food data:", error);
                setLoading(false);
            });
    }, []);

    //get dishes from /api/dishes
    useEffect(() => {
        fetch("/api/dishes", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.getToken()}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Dishes:", data);
                setSavedDishes(data);
            })
            .catch((error) => {
                console.error("Error fetching dishes:", error);
            });
    }, []);

    return (
        <div className="h-screen flex items-center justify-center">
            {/* Food Facts container with slight transparency */}
            <div className="relative bg-white/90 rounded-xl shadow-lg p-8 backdrop-blur-sm w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">Food Facts</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : product ? (
                    <div>
                        <h2 className="text-xl font-semibold">{product.product_name}</h2>
                        {product.image_url && (
                            <img src={product.image_url} alt={product.product_name} width="200" className="my-4" />
                        )}
                        <p><strong>Brand:</strong> {product.brands || "Unknown"}</p>
                        <p><strong>Ingredients:</strong> {product.ingredients_text || "N/A"}</p>
                        <p><strong>Calories:</strong> {product.nutriments?.energy_kcal || "N/A"} kcal</p>
                    </div>
                ) : (
                    <p>Product not found.</p>
                )}
            </div>
            {/* Saved dishes container */}
            <div className="ml-8">
                <h2 className="text-2xl font-bold mb-4">Saved Dishes</h2>
                <ul>
                    {savedDishes.map((dish: dishInterface) => (
                        <li key={dish.id} className="mb-2">
                            <h3 className="text-lg font-semibold">{dish.dishName}</h3>
                            <p><strong>Created by:</strong> {dish.userId}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
