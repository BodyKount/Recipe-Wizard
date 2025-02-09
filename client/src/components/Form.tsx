import { useState, ChangeEvent, FormEvent } from "react";
import PropTypes from "prop-types";

interface FormProps {
  setRecipe: (recipe: { title: string; ingredients: string[]; instructions: string }) => void;
}

function Form({ setRecipe }: FormProps) {
  const [formData, setFormData] = useState({
    ingredients: "",
    cuisine: "",
    time: "",
    difficulty: "Easy",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/recipes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recipe");
      }
      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        Ingredients:
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter available ingredients..."
        />
      </label>

      <label className="block">
        Cuisine Style:
        <input
          type="text"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g., Italian, Mexican"
        />
      </label>

      <label className="block">
        Cooking Time (mins):
        <input
          type="number"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g., 30"
        />
      </label>

      <label className="block">
        Difficulty Level:
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </label>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
    );
  }
  Form.propTypes = {
    setRecipe: PropTypes.func.isRequired,
  };
  
  export default Form;