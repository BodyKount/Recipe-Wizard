import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import LoginButton from "../components/LogInButton";
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
            <h2>
              <LoginButton />
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Login to discover amazing recipes
            </p>
            <div className="mt-8 space-y-4">
            </div>
          </div>
        </div>
      </div>
    );
};

export default Home;
