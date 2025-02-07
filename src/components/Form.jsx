import { useState } from "react";
import PropTypes from "prop-types";

function Form({ setRecipe }) {
  const [formData, setFormData] = useState({
    ingredients: "",
    cuisine: "",
    time: "",
    difficulty: "Easy",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-black">
        Ingredients:
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          placeholder="Enter available ingredients..."
        />
      </label>

      <label className="block text-black">
        Cuisine Style:
        <input
          type="text"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          placeholder="e.g., Italian, Mexican"
        />
      </label>

      <label className="block text-black">
        Cooking Time (mins):
        <input
          type="number"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          placeholder="e.g., 30"
        />
      </label>

      <label className="block text-black">
        Difficulty Level:
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
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
