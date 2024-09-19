import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { pageLinks } from './Navlinks';
import { useUser } from "@/context/userContext";
import Button from '../Buttons';

interface NavbarProps {
  currentPath: string;
}

const Navbar: FC<NavbarProps> = ({ currentPath }) => {
  const [language, setLanguage] = useState('sv');
  const { user, isLoading, signOut } = useUser();
console.log(user)
  return (
    <nav className="bg-white w-full h-auto shadow-md px-4 mx-auto pt-3 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col">
          {/* Top row */}
          <div className="flex justify-between items-center mb-4">
            <a href="/">
              <img src="ccblogo.png" alt="Logo" className="h-auto w-[180px] align-middle" />
            </a>
            <div className="flex items-center space-x-4">
              {!isLoading && (
                <>
                  {user ? (
                    <>
                      <span>CCBUILD</span>
                      <span>TJÄNSTER</span>
                      <span>MARKNADSPLATSEN</span>
                      <span>PRODUKTBANKEN</span>
                      <Button size='small' onClick={signOut}>Logga ut</Button>
                      <span>{user.aud} ▼</span>
                    </>
                  ) : (
                    <>
                      <Link to="/sign-in">
                        <Button size='small'>Logga in</Button>
                      </Link>
                      <Link to="/sign-up">
                        <Button size='small'>Registrera</Button>
                      </Link>
                    </>
                  )}
                </>
              )}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-100 border border-gray-300 bg-none rounded px-2 py-1"
              >
                <option value="sv">SV</option>
                <option value="en">EN</option>
              </select>
            </div>
          </div>
          
          {/* thisonly show if user is logged in */}
          {!isLoading && user && (
            <div className="bg-navy-blue text-white py-2 px-4 flex justify-between items-center">
              <div className="flex space-x-4">
                {pageLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.path}
                    className={`hover:text-gray-300 ${currentPath === link.path ? 'font-bold' : ''}`}
                  >
                    {link.title.toUpperCase()}
                  </Link>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Sök produkter, kategorier.."
                  className="bg-white text-black border border-gray-300 rounded pl-8 pr-2 py-1"
                />
                <img src="/search.svg" alt="Search" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;