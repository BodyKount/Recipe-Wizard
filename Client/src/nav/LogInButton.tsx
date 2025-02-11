import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const LoginButton = () => {
  return (
    <div className="flex items-center space-x-4">
        <Link 
          to="/login"
          className="z-50 flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium shadow-sm"
        >
          <LogIn size={20} />
          <span>Login</span>
        </Link>
    </div>
  );
};

export default LoginButton;