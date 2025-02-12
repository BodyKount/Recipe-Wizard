import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import auth from '../utils/auth';
import { Wand2 } from 'lucide-react'; // Import Pizza icon

import LoginButton from '../nav/LogInButton';
import LogOutButton from '../nav/LogOutButton';
import NavFoodFacts from '../nav/NavFoodFacts';
import NavHome from '../nav/NavHome';
import NavSavedDishes from '../nav/NavSavedDishes';


const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/new";
  const isFoodFactsPage = location.pathname === "/food-facts";
  const isSavedDishesPage = location.pathname === "/saved-dishes";
  const isLandingPage = location.pathname === "/";

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
        ) : isLoginPage || isLandingPage ? (
          <>
            <LoginButton />
          </>
        ) : isHomePage ? (
          <>
            <NavFoodFacts />
            <NavSavedDishes />
            <LogOutButton />
          </>
        ) : isFoodFactsPage ? (
          <>
            <NavHome />
            <NavSavedDishes />
            <LogOutButton />
          </>
        ) : isSavedDishesPage ? (
          <>
            <NavHome />
            <NavFoodFacts />
            <LogOutButton />
          </>
        ) : (null)}

      </div>
    </div>
  );
};

export default Navbar;
