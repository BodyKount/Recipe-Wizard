import { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    ingredients: "",
    cuisine: "",
    time: "",
    difficulty: "Easy",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // This will later be sent to the backend
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
      >
        Generate Recipe
      </button>
    </form>
  );
}

export default Form;
