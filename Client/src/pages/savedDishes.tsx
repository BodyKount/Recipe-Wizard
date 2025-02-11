import React, { useEffect, useState } from 'react';
import auth from '../utils/auth';

interface dishInterface {
  id: number;
  dishName: string;
  userId: string;
  recipe: string;
}

const SavedDishes: React.FC = () => {
  const [savedDishes, setSavedDishes] = useState<dishInterface[]>([]);

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
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Saved Dishes</h1>
      </div>
      <div className="ml-8">
        <h2 className="text-2xl font-bold mb-4">Saved Dishes</h2>
        <ul>
          {savedDishes.map((dish: dishInterface) => (
            <li key={dish.id} className="mb-2">
              <h3 className="text-lg font-semibold">{dish.dishName}</h3>
              <p><strong>{savedDishes.indexOf(dish) + 1}. </strong>{dish.recipe}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavedDishes;

