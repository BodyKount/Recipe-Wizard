import { useState } from 'react';
import { LogOut } from 'lucide-react';
import auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const NavLogOut = () => {
    const navigate = useNavigate();
    const [loginCheck, setLoginCheck] = useState(false);
    console.log(loginCheck);

    return (
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
    );
}

export default NavLogOut;