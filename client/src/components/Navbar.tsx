import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import { Wand2, LogOut, MapPin } from 'lucide-react'; // Ensure MapPin is imported
import LoginButton from './LogInButton';

const Navbar = () => {
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";

  const checkLogin = () => {
    setLoginCheck(auth.loggedIn());
  };

  useEffect(() => {
    checkLogin();
  }, []);

  console.log('Current login status:', loginCheck);

  return (
    <div className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
      {!loginCheck ? (
        <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
          <Wand2 size={28} className="text-white" />
          <h1 className="text-2xl font-bold text-white font-serif tracking-wide">
            Recipe Wizard
          </h1>
        </Link>
        ) : (
          <div>
            <Wand2 size={28} className="text-white" />
            <h1 className="text-2xl font-bold text-white font-serif tracking-wide">
              Recipe Wizard
            </h1>
          </div>
      )}
      
      <div className="flex items-center space-x-4">
        {!loginCheck ? (
          <>
            <LoginButton />
          </>
        ) : (
          <>
            {!isLoginPage && !isHomePage && (
              <>
                <Link 
                  to="/food-facts" // Updated the path to /food-facts
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium shadow-sm"
                >
                  <MapPin size={20} />
                  <span>Food Facts</span>
                </Link>
                
                <button
                  onClick={() => {
                    auth.logout();
                    setLoginCheck(false);
                    navigate('/')
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium shadow-sm"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
