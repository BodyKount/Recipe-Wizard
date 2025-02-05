import Form from "../components/Form";
import RecipeDisplay from "../components/RecipeDisplay";

function RecipeGenerator() {
  return (
    <div className="h-screen flex">
      {/* Left Side - Form */}
      <div className="w-1/2 p-10 bg-gray-100">
        <Form />
      </div>

      {/* Right Side - Recipe Output */}
      <div className="w-1/2 p-10 bg-black text-white">
        <RecipeDisplay />
      </div>
    </div>
  );
}

export default RecipeGenerator;
