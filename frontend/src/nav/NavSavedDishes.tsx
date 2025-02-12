import { Link } from 'react-router-dom';
import { Pizza } from 'lucide-react';

const NavSavedDishes = () => {
  return (
    <Link 
    to="/saved-dishes"
    className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium shadow-sm"
  >
    <Pizza size={20} />
    <span>Saved Dishes</span>
  </Link>
  );
}

export default NavSavedDishes;