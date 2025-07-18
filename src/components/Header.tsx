import React, { useState } from 'react';
import { ShoppingCart, User, Moon, Sun, Search, Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';

interface HeaderProps {
  onCartClick: () => void;
  onProfileClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, onProfileClick, currentPage, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
            <h1 
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              МагазинОнлайн
            </h1>
            
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              <button 
                onClick={() => onNavigate('home')}
                className={`font-medium transition-colors ${
                  currentPage === 'home' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Главная
              </button>
              <button 
                onClick={() => onNavigate('catalog')}
                className={`font-medium transition-colors ${
                  currentPage === 'catalog' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Каталог
              </button>
              <button 
                onClick={() => onNavigate('sales')}
                className={`font-medium transition-colors ${
                  currentPage === 'sales' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Акции
              </button>
            </nav>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={onProfileClick}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              {user && (
                <span className="text-sm text-gray-700 dark:text-gray-300 hidden md:inline">
                  {user.name}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};