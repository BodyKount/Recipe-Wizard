import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react'; // Import Pizza icon

const NavFoodFacts = () => {
  return (
    <Link 
      to="/food-facts"
      className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium shadow-sm"
    >
      <Utensils size={20} />
      <span>Food Facts</span>
    </Link>
  );
}

export default NavFoodFacts;