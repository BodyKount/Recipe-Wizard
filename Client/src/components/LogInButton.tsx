import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import auth from '../utils/auth';
import { LogIn, LogOut, BookOpen } from 'lucide-react';

const LoginButton = () => {
    const [loginCheck, setLoginCheck] = useState(false);
  
    const checkLogin = () => {
      if (auth.loggedIn()) {
        setLoginCheck(true);
      }
    };
  
    useEffect(() => {
      console.log(loginCheck);
      checkLogin();
    }, [loginCheck]);

  return (
    <div className="flex items-center space-x-4">
      {!loginCheck ? (
        <Link 
          to="/login"
          className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium shadow-sm"
        >
          <LogIn size={20} />
          <span>Login</span>
        </Link>
      ) : (
        <>
          <Link 
            to="/Users"
            className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium shadow-sm"
          >
            <BookOpen size={20} />
            <span>Recipe Book</span>
          </Link>
          
          <button
            onClick={() => auth.logout()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium shadow-sm"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </>
      )}
    </div>
  );
};

export default LoginButton;