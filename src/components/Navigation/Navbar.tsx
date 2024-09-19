import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pageLinks } from './Navlinks';
import { useUser } from "@/context/userContext";
import Button from '../Buttons';

interface NavbarProps {
  currentPath: string;
}

const Navbar: FC<NavbarProps> = ({ currentPath }) => {
  const [language, setLanguage] = useState('sv');
  const { user, isLoading, signOut } = useUser();
  const fullname = user?.user_metadata.first_name + ' ' + user?.user_metadata.last_name;
  
  const navigate = useNavigate();

  const handleToSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <nav className="bg-white w-full h-auto shadow-md pt-4 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 pb-4">
          <div className="flex items-center">
            <Link to="/">
              <img src="ccblogo.png" alt="Logo" className="h-auto w-[180px] align-middle mr-4" />
            </Link>
          </div>
          
          {user ? (
            // logged in view
            <div className="flex items-center space-x-4 ">
              <Link to="#" className="text-gray-700 hover:text-gray-900">CCBUILD</Link>
              <Link to="#" className="text-gray-700 hover:text-gray-900">TJÄNSTER</Link>
              <div className="relative group">
                <Link to="#" className="text-gray-700 hover:text-gray-900">
                  MARKNADSPLATSEN
                  <span className="ml-1">▼</span>
                </Link>                
              </div>
              <div className="relative group">
                <Link to="/" className="text-gray-700 hover:text-gray-900">
                  PRODUKTBANKEN
                  <span className="ml-1">▼</span>
                </Link>               
              </div>
              <div className="relative group">
                <span className="bg-seaShell text-gray-900 px-4 py-2 rounded-lg cursor-pointer flex flex-wrap">
                  {fullname} 
                  <span className="ml-1">▼</span>
                </span>                
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-100 border border-gray-300 bg-none rounded px-2 py-1"
              >
                <option value="sv">SV</option>
                <option value="en">EN</option>
              </select>
              {!isLoading && user && <Button onClick={signOut}>Logga ut</Button>}
            </div>
          ) : (
            //not-logged in view
            <>
              <div className='flex flex-col gap-1 py-4'>
                <div className="hidden md:flex md:flex-wrap gap-1 space-x-4 mt-4">
                  {pageLinks.slice(0, 5).map((link) => (
                    <Link
                      key={link.title}
                      to={link.path}
                      className={`text-gray-700 hover:text-gray-900 ${currentPath === link.path ? 'font-bold' : ''}`}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
                <div className="hidden md:flex md:flex-wrap gap-1 space-x-4">
                  {pageLinks.length > 5 && pageLinks.slice(5).map((link) => (
                    <Link
                      key={link.title}
                      to={link.path}
                      className={`text-gray-700 hover:text-gray-900 ${currentPath === link.path ? 'font-bold' : ''}`}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-1'>
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
                    <img src="/searchblack.svg" alt="Search" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className='flex justify-end items-center'>
                  <Button size='small' className='w-1/2' onClick={handleToSignIn}>Logga in</Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {user && (
        <div className="bg-blueZodiac w-full mt-2">
          <div className="flex flex-row justify-between items-center max-w-7xl mx-auto px-4">
            <div className="   flex space-x-4 text-white py-2">
              <Link to="#" className="hover:text-gray-300">ÖVERSIKT</Link>
              <Link to="#" className="hover:text-gray-300">PROJEKT</Link>
              <Link to="#" className="hover:text-gray-300">PRODUKTER</Link>
              <Link to="#" className="hover:text-gray-300">EFTERLYSNINGAR</Link>
              <Link to="#" className="hover:text-gray-300">ORGANISATIONSADMIN</Link>
              <Link to="#" className="hover:text-gray-300">VÄRDEANALYS</Link>
              <Link to="#" className="hover:text-gray-300">MÄRKNING</Link>
              <Link to="#" className="hover:text-gray-300">HJÄLP</Link>
              
            </div>
            <div className="relative py-4">
                <input
                  type="text"
                  placeholder="Sök produkter, kategorier..."
                  className="bg-white bg-opacity-15 border placeholder:text-sm text-white placeholder:text-white rounded pl-8 pr-2 py-1 w-full"
                />
                <img src="/searchwhite.svg" alt="Search" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white" />
              </div>
          </div>
        </div>
      )}
      {user && (
        <div className="bg-light-gray">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Översikt {'>'} Produkter</span>
              <div className="flex-grow"></div>
              
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;