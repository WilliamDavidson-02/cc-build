import { FC } from 'react';
import { Link } from 'react-router-dom';
import { pageLinks } from './Navigation/Navlinks';
import facebook from '/facebook.svg';
import instagram from '/instagram.svg';
import linkedin from '/linkedin.svg';
import youtube from '/youtube.svg';

interface FooterProps {
  currentPath: string;
  
}

const Footer: FC<FooterProps> = ({ currentPath }) => {
  
  const currentPageName = currentPath === '/' ? 'Produktbanken' : pageLinks.find(link => link.path === currentPath)?.title || 'CCBuild.se';
  return (
    <footer className="bg-blueZodiac text-white py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">CCBuild.se - {currentPageName}</h2>
        <nav className="mb-4">
          <Link to="/" className="mx-2 hover:underline">Start</Link>
          <Link to="#" className="mx-2 hover:underline">Projekt</Link>
          <Link to="#" className="mx-2 hover:underline">Produkter</Link>
          <Link to="#" className="mx-2 hover:underline">Efterlysningar</Link>
          <Link to="#" className="mx-2 hover:underline">Organisationsadmin</Link>
          <Link to="#" className="mx-2 hover:underline">Värdeanalys</Link>
          <Link to="#" className="mx-2 hover:underline">Märkning</Link>
          <Link to="#" className="mx-2 hover:underline">Hjälp</Link>
        </nav>
        <p className="mb-4">CCBuild har utvecklats med stöd från Vinnova - läs mer på <a href="http://www.ccbuild.se" className="underline">www.ccbuild.se</a></p>
        <div>
          <span className="mr-4">Följ oss på sociala medier</span> 
          <div className='flex justify-center items-center'>         
            <a href="https://www.facebook.com/ccbuild.se" className="mx-2" aria-label="Facebook">
              <img src={facebook} alt="Facebook" className='w-5 h-5  ' />
            </a>
            <a href="https://www.instagram.com/ccbuild.se/?__coig_challenged=1" className="mx-2" aria-label="Instagram">
              <img src={instagram} alt="Instagram" className='w-5 h-5  ' />
            </a>
            <a href="https://www.linkedin.com/company/centrum-f-r-cirkul-rt-byggande-ccbuild/" className="mx-2" aria-label="LinkedIn">
              <img src={linkedin} alt="LinkedIn" className='w-5 h-5  ' />
            </a>
            <a href="https://www.youtube.com/channel/UCdX12FxcGuP3gdAuyTZHW_A" className="mx-2" aria-label="YouTube">
              <img src={youtube} alt="YouTube" className='w-5 h-5  ' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;