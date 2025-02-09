// This is the main entry point of the application


import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <main className='container pt-5'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
