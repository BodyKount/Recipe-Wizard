import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';

const NavHome = () => {
    return (
      <Link 
      to="/new"
      className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium shadow-sm"
    >
      <Store size={20} />
      <span>Home</span>
    </Link>
    );
  }
  
  export default NavHome;