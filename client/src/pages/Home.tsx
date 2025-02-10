import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from '../components/Users';
import auth from '../utils/auth';

const Home = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,#6366f1_1px,transparent_0)] bg-[length:40px_40px]" />
        <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-4">
          <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl max-w-2xl w-full text-center">
            <h1 className="text-4xl font-bold text-gray-800 py-6 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Login to start cooking!
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              Join to discover amazing recipes
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Access to exclusive recipes</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <span className="text-gray-700">Connect with other food lovers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Home;
