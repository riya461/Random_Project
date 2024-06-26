// src/App.tsx
import React from 'react';
import { useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Search from './pages/Search';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import Settings from './pages/Settings';


import { BrowserRouter , Routes, Route  } from 'react-router-dom';


const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

    
  
  

  const toggleDarkMode = () => {
    const switchBox = document.querySelector('.sun-moon')

    setDarkMode(prevMode => !prevMode);
    if (!darkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        //   remove check
        const c = document.querySelector('input[type="checkbox"]');
        if (c)
            c?.setAttribute('checked', '');
        switchBox?.classList.add('move');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        switchBox?.classList.remove('move');
        const c = document.querySelector('input[type="checkbox"]');
        if (c)
            c?.removeAttribute('checked');
    }
  };

  return (
    <>
    <div className="App">
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white '}`}>
      <div className="absolute top-4 left-4">
            <div className="sun-moon">
                <input onChange={toggleDarkMode} type="checkbox" />
                <span className="circle large"></span>
                <span className="circle small"></span>
            </div>
        {/* <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </div>
      <BrowserRouter>
      <Routes>
        
          <Route  >
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/notifications' element={<Notification />} />
          <Route path='/search' element={<Search />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          
          </Route>
          

       
      </Routes>
    </BrowserRouter>

    
    </div>
    </div>
    </>
  );
}

export default App;
