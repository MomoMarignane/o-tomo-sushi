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
          ? 'bg-wood-50/95 backdrop-blur-xl border-b border-wood-200/50 shadow-japanese py-3 sm:py-4 top-0' 
          : 'bg-gradient-to-r from-wood-100/90 via-warm-50/80 to-wood-100/90 backdrop-blur-md py-4 sm:py-6 top-14'
      }`}
      style={{
        backgroundImage: !isScrolled 
          ? 'radial-gradient(circle at 1px 1px, rgba(139,111,71,0.05) 1px, transparent 0), linear-gradient(90deg, transparent 0%, rgba(139,111,71,0.02) 50%, transparent 100%)' 
          : 'radial-gradient(circle at 1px 1px, rgba(139,111,71,0.03) 1px, transparent 0)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo japonais moderne */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Logo avec caractère japonais */}
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-wood-700 via-wood-800 to-sumi-800 rounded-japanese flex items-center justify-center shadow-japanese border border-wood-600/30">
                <span className="text-warm-50 font-bold text-sm sm:text-lg font-zen">玉</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-vermillon-500 to-vermillon-600 rounded-full opacity-80"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-display text-xl sm:text-2xl font-bold bg-gradient-to-r from-wood-800 via-sumi-700 to-wood-700 bg-clip-text text-transparent">
                TOMO
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-wood-600 font-zen">寿司</span>
                <div className="w-1 h-1 bg-gold-400 rounded-full"></div>
                <span className="text-xs text-wood-500 font-japanese tracking-wide">SUSHI</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation japonaise moderne */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className={`relative text-sm font-medium font-japanese transition-all duration-300 group ${
                  item.active 
                    ? 'text-wood-800 font-semibold' 
                    : 'text-wood-700 hover:text-wood-800'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 transition-all duration-300 ${
                  item.active 
                    ? 'bg-gradient-to-r from-gold-400 to-vermillon-500 scale-x-100' 
                    : 'bg-gradient-to-r from-wood-400 to-wood-600 scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </motion.a>
            ))}
          </nav>

          {/* Actions japonaises modernes */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <motion.button 
              className="hidden md:flex items-center space-x-2 text-sm font-medium font-japanese text-wood-800 hover:text-wood-900 transition-all duration-300 bg-gradient-to-r from-warm-100 to-warm-50 hover:from-warm-200 hover:to-warm-100 px-5 py-2.5 rounded-japanese border border-wood-200 shadow-japanese hover:shadow-wood-lg group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>予約</span>
              <span className="text-xs text-wood-600 group-hover:text-wood-700">Réserver</span>
            </motion.button>
            
            {/* Bouton Admin japonais */}
            {onAdminClick && (
              <motion.button 
                className="relative p-2.5 text-wood-800 hover:text-wood-900 bg-gradient-to-br from-wood-100 to-wood-50 hover:from-wood-200 hover:to-wood-100 rounded-japanese transition-all duration-300 border border-wood-200 shadow-japanese hover:shadow-wood-lg group"
                onClick={onAdminClick}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                title="Administration"
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-vermillon-500 to-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
            )}
            
            <motion.button 
              className="relative p-2.5 text-wood-800 hover:text-wood-900 bg-gradient-to-br from-wood-100 to-wood-50 hover:from-wood-200 hover:to-wood-100 rounded-japanese transition-all duration-300 border border-wood-200 shadow-japanese hover:shadow-wood-lg group"
              onClick={onCartClick}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-wood-700 to-wood-800 text-wood-50 text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium shadow-wood">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Menu mobile épuré */}
            <motion.button
              className="md:hidden p-2 text-wood-800 hover:bg-wood-100 rounded-full transition-all duration-300 border border-wood-300 shadow-warm"
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

        {/* Menu mobile épuré avec thème boisé */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4 pb-6 border-t-2 border-wood-300 mt-4 px-4 sm:px-6 bg-wood-50/80 rounded-lg backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-base sm:text-sm font-medium transition-colors duration-200 py-2 ${
                    item.active 
                      ? 'text-wood-800 font-semibold' 
                      : 'text-wood-700 hover:text-wood-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button className="text-left text-base sm:text-sm font-medium text-wood-700 hover:text-wood-800 transition-colors duration-200 py-2 bg-warm-100 hover:bg-warm-200 px-4 rounded-lg border border-wood-300">
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
