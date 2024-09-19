import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { pageLinks } from './Navlinks';


interface NavbarProps {
  currentPath: string;
}

const Navbar: FC<NavbarProps> = ({ currentPath }) => {
  const [language, setLanguage] = useState('sv');

  return (
    <nav className="bg-white w-full h-auto shadow-md px-4 mx-auto pt-3 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <a href="/" >
            <img src="ccblogo.png" alt="Logo" className="h-auto w-[180px] align-middle mr-4" />
          </a>
        </div>
          
          <div className='flex flex-col gap-1'>
            <div className="hidden md:flex md:flex-wrap gap-1 space-x-4 mt-4">
              {pageLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-gray-700 hover:text-gray-900 ${currentPath === link.path ? 'font-bold' : ''}`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex md:flex-wrap gap-1 space-x-4">
            {pageLinks.slice(5).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-gray-700 hover:text-gray-900 ${currentPath === link.path ? 'font-bold' : ''}`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-100 border border-gray-300 bg-none rounded px-2 py-1"
            >
              <option value="sv">🇸🇪</option>
              <option value="en">🇬🇧</option>
            </select>
            <div className="relative">
              <input
                type="text"
                placeholder="Sök"
                className="bg-gray-100 border border-gray-300 rounded pl-8 pr-2 py-1"
              />
              <img src="/search.svg" alt="Search" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;