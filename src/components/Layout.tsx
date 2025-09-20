// src/components/Layout.tsx
import { Outlet, Link, useLocation } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Layout = () => {
  const { t } = useLanguage();
  const location = useLocation();
  
  // Check if we're on the landing page for cinematic experience
  const isLandingPage = location.pathname === '/';
  
  // Function to check if a route is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/explore' && location.pathname === '/explore') return true;
    if (path !== '/' && path !== '/explore' && location.pathname.includes(path.replace('/category/', ''))) return true;
    return false;
  };

  return (
    <div className="text-gray-800 min-h-screen">
      <nav className={`fixed top-0 left-0 w-full p-6 z-50 ${
        isLandingPage 
          ? 'bg-transparent' 
          : 'bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-100'
      }`}>
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          {/* Only show navigation menu if NOT on landing page */}
          {!isLandingPage && (
            <ul className="flex justify-center gap-8 flex-1 text-sm font-light tracking-wide">
              <li>
                <Link 
                  to="/" 
                  className={`hover:text-gray-500 transition-colors uppercase ${
                    isActive('/') ? 'text-gray-900 font-medium border-b-2 border-gray-900 pb-1' : ''
                  }`}
                >
                  {t('').includes('Bien') ? 'Inicio' : 'Home'}
                </Link>
              </li>
              <li>
                <Link 
                  to="/explore" 
                  className={`hover:text-gray-500 transition-colors uppercase ${
                    isActive('/explore') ? 'text-gray-900 font-medium border-b-2 border-gray-900 pb-1' : ''
                  }`}
                >
                  {t('portfolio.categories.all')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/Illustration" 
                  className={`hover:text-gray-500 transition-colors uppercase ${
                    isActive('/category/Illustration') ? 'text-gray-900 font-medium border-b-2 border-gray-900 pb-1' : ''
                  }`}
                >
                  {t('portfolio.categories.illustration')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/Painting" 
                  className={`hover:text-gray-500 transition-colors uppercase ${
                    isActive('/category/Painting') ? 'text-gray-900 font-medium border-b-2 border-gray-900 pb-1' : ''
                  }`}
                >
                  {t('portfolio.categories.painting')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/Design" 
                  className={`hover:text-gray-500 transition-colors uppercase ${
                    isActive('/category/Design') ? 'text-gray-900 font-medium border-b-2 border-gray-900 pb-1' : ''
                  }`}
                >
                  {t('portfolio.categories.design')}
                </Link>
              </li>
            </ul>
          )}
          
          {/* Language switcher - always visible but positioned differently for landing page */}
          <div className={isLandingPage ? "ml-auto" : ""}>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
      <main className={isLandingPage ? "pt-0" : "pt-20"}>
        <Outlet />
      </main>
    </div>
  );
};