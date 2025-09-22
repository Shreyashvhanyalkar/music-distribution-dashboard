import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogout = () => {
    // Clear user from localStorage
    localStorage.removeItem('user');
    // Redirect to login
    router.push('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-indigo-600 dark:bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold">
          Music Distribution
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/dashboard" className={`hover:text-indigo-200 dark:hover:text-gray-300 ${router.pathname === '/dashboard' ? 'font-bold' : ''}`}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/upload" className={`hover:text-indigo-200 dark:hover:text-gray-300 ${router.pathname === '/upload' ? 'font-bold' : ''}`}>
                Upload Track
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="hover:text-indigo-200 dark:hover:text-gray-300"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-indigo-700 dark:bg-gray-700">
          <ul className="flex flex-col px-4 py-2">
            <li className="py-2">
              <Link href="/dashboard" className={`block hover:text-indigo-200 dark:hover:text-gray-300 ${router.pathname === '/dashboard' ? 'font-bold' : ''}`}>
                Dashboard
              </Link>
            </li>
            <li className="py-2">
              <Link href="/upload" className={`block hover:text-indigo-200 dark:hover:text-gray-300 ${router.pathname === '/upload' ? 'font-bold' : ''}`}>
                Upload Track
              </Link>
            </li>
            <li className="py-2 flex">
              <ThemeToggle />
              <span className="ml-2">Toggle Theme</span>
            </li>
            <li className="py-2">
              <button 
                onClick={handleLogout}
                className="hover:text-indigo-200 dark:hover:text-gray-300"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;