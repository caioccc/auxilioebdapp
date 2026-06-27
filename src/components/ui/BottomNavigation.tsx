import React from 'react';
import { IconHome, IconArticle } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigationComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (value: string) => {
    navigate(value);
  };

  const isActive = (path: string) => {
    if (path === 'home') return location.pathname === '/';
    if (path === 'posts') return location.pathname === '/blog' || location.pathname.startsWith('/post');
    return false;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-14">
        <button
          onClick={() => handleTabChange('/')}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive('home') ? 'text-blue-600' : 'text-gray-500'
          }`}
          aria-label="Navegar para Início"
        >
          <IconHome size={20} />
          <span className="text-xs mt-1">Início</span>
        </button>
        <button
          onClick={() => handleTabChange('/blog')}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive('posts') ? 'text-blue-600' : 'text-gray-500'
          }`}
          aria-label="Navegar para Posts"
        >
          <IconArticle size={20} />
          <span className="text-xs mt-1">Posts</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigationComponent;