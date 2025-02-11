import { useEffect, useState } from "react";
import { foodFactsInterface } from "../interfaces/foodFactsInterface";

export default function FoodFacts() {
    const [product, setProduct] = useState<foodFactsInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
        </div>
    );
}
