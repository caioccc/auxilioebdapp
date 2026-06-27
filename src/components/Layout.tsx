import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";
import "../index.css";
/**
 * Layout customizado com Tailwind CSS para estrutura base da aplicação.
 * Mobile-first, acessível e consistente com design system.
 */
const Layout: React.FC<{
  children: React.ReactNode;
  onBlogClick: () => void;
}> = ({ children, onBlogClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleBlogLinkClick = () => {
    if (navigator.onLine) {
      window.open("https://auxilioebd.blogspot.com/", "_blank");
    } else {
      onBlogClick();
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 md:hidden">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
            <h1 className="text-xl font-bold text-gray-900 ml-2">
              Auxilio EBD
            </h1>
          </div>
        </div>
      </header>

      {/* Sidebar para desktop e menu mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none`}
      >
        <div className="flex flex-col h-full pt-16 md:pt-0">
          <div className="md:hidden bg-white border-b border-gray-200 p-4">
            <h1 className="text-xl font-bold text-gray-900">Auxilio EBD</h1>
          </div>
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay para mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <main className="flex-1 pb-16 md:pb-0">
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
