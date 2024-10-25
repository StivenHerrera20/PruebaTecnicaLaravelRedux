import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import { toggleDarkMode } from '../store/Slices/themeSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="w-full py-4 bg-transparent fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-end px-4">
        <button
          onClick={handleToggle}
          className="text-2xl text-gray-800 dark:text-gray-200 focus:outline-none"
        >
          {darkMode ? (
              <MoonIcon className="h-6 w-6" />
            ) : (
              <SunIcon className="h-6 w-6" /> 
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
