import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import { Header } from './components/Header';
import { MainPage } from './components/MainPage';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { Profile } from './components/Profile';
import { Checkout } from './components/Checkout';
import { PaymentPage } from './components/PaymentPage';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => setCurrentPage('payment'), 300); // Wait for modal to close before showing payment page
  };

  const handlePaymentSuccess = () => {
    setCurrentPage('profile');
  };
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header 
              onCartClick={() => setIsCartOpen(true)}
              onProfileClick={() => setIsProfileOpen(true)}
              currentPage={currentPage}
              onNavigate={setCurrentPage}
            />
            
            <main>
              {currentPage === 'home' && <MainPage onNavigate={setCurrentPage} />}
              {currentPage === 'catalog' && <ProductGrid />}
              {currentPage === 'sales' && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Акции и скидки
                  </h1>
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-8 text-white text-center">
                    <h2 className="text-4xl font-bold mb-4">Мега распродажа!</h2>
                    <p className="text-xl mb-6">Скидки до 70% на тысячи товаров</p>
                    <button 
                      onClick={() => setCurrentPage('catalog')}
                      className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Посмотреть товары
                    </button>
                  </div>
                </div>
              )}
              {currentPage === 'payment' && <PaymentPage onPaymentSuccess={handlePaymentSuccess} />}
            </main>

            <Footer />

            <Cart 
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onCheckout={handleCheckout}
            />

            <Profile 
              isOpen={isProfileOpen || currentPage === 'profile'}
              onClose={() => {
                setIsProfileOpen(false);
                if (currentPage === 'profile') setCurrentPage('home');
              }}
            />

            <Checkout 
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
              onOrderComplete={handleOrderComplete}
            />
          </div>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;