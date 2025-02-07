import PropTypes from 'prop-types';

function RecipeDisplay({ recipe }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generated Recipe</h2>
      {recipe ? <p className="whitespace-pre-line">{recipe}</p> : <p>Fill out the form and generate a recipe!</p>}
    </div>
  );
}

RecipeDisplay.propTypes = {
  recipe: PropTypes.string
};

export default RecipeDisplay;
