// This is the main entry point of the application


import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <main className="w-full min-h-screen pt-5">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
