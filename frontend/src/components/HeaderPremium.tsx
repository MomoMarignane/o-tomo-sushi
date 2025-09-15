import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Shield } from 'lucide-react';

interface HeaderPremiumProps {
  cartCount?: number;
  onCartClick?: () => void;
  onAdminClick?: () => void;
}

const HeaderPremium: React.FC<HeaderPremiumProps> = ({ cartCount = 0, onCartClick, onAdminClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', href: '#', active: true },
    { label: 'Menu', href: '#menu' },
    { label: 'À propos', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header 
      className={`fixed left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 sm:py-4 top-0' 
          : 'bg-transparent py-4 sm:py-6 top-14'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo épuré */}
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">Ô</span>
            </div>
            <div>
              <h1 className="font-display text-lg sm:text-xl font-bold text-gray-900">TOMO</h1>
            </div>
          </motion.div>

          {/* Navigation épurée */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 ${
                  item.active 
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-1' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Actions épurées */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button 
              className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Réserver
            </motion.button>
            
            {/* Bouton Admin */}
            {onAdminClick && (
              <motion.button 
                className="relative p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-300"
                onClick={onAdminClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Administration"
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            )}
            
            <motion.button 
              className="relative p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-300"
              onClick={onCartClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Menu mobile épuré */}
            <motion.button
              className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Menu mobile épuré */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4 pb-6 border-t border-gray-100 mt-4 px-4 sm:px-6">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-base sm:text-sm font-medium transition-colors duration-200 py-2 ${
                    item.active 
                      ? 'text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button className="text-left text-base sm:text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 py-2">
                Réserver
              </button>
            </nav>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default HeaderPremium;
