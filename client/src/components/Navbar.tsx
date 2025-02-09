import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
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
    <div className='flex justify-between items-center py-2 px-5 bg-blue-200'>
      <h1>Authentication Review</h1>
      <div>
        {!loginCheck ? (
          <button className='btn' type='button'>
            <Link to='/login'>Login</Link>
          </button>
        ) : (
          <>
            <button className='btn' type='button'>
              <Link to='/Users'>Recipe Book</Link>
            </button>
            <button
              className='btn'
              type='button'
              style={{ marginLeft: '100px' }}
              onClick={() => {
                auth.logout();
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
