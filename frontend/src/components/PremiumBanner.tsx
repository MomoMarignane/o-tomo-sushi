import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Star, Megaphone } from 'lucide-react';
import type { BannerMessage } from '../types';

interface PremiumBannerProps {
  messages: BannerMessage[];
  onDismiss?: (messageId: string) => void;
}

const PremiumBanner: React.FC<PremiumBannerProps> = ({ messages, onDismiss }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Filtrer les messages actifs et les trier par priorité
  const activeMessages = messages
    .filter(message => message.active)
    .sort((a, b) => b.priority - a.priority);

  // Auto-slide pour plusieurs messages
  useEffect(() => {
    if (activeMessages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeMessages.length);
    }, 6000); // 6 secondes pour une meilleure lisibilité

    return () => clearInterval(interval);
  }, [activeMessages.length]);

  // Si pas de messages ou pas visible, ne rien afficher
  if (!isVisible || activeMessages.length === 0) return null;

  const currentMessage = activeMessages[currentIndex];

  const getBannerStyle = (priority: number) => {
    if (priority >= 90) {
      return {
        bg: 'bg-gradient-to-r from-red-600 to-red-700',
        text: 'text-white',
        icon: 'text-red-100'
      };
    }
    if (priority >= 70) {
      return {
        bg: 'bg-gradient-to-r from-amber-500 to-orange-600',
        text: 'text-white',
        icon: 'text-amber-100'
      };
    }
    if (priority >= 50) {
      return {
        bg: 'bg-gradient-to-r from-blue-600 to-indigo-700',
        text: 'text-white',
        icon: 'text-blue-100'
      };
    }
    return {
      bg: 'bg-gradient-to-r from-gray-800 to-gray-900',
      text: 'text-white',
      icon: 'text-gray-300'
    };
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'temporary':
        return Calendar;
      case 'permanent':
        return Star;
      default:
        return Megaphone;
    }
  };

  const style = getBannerStyle(currentMessage.priority);
  const IconComponent = getIconByType(currentMessage.type);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
        className={`fixed top-0 left-0 right-0 overflow-hidden ${style.bg} shadow-lg`}
        style={{ zIndex: 9999 }}
      >
        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Contenu principal */}
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              {/* Icône animée */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="flex-shrink-0"
              >
                <IconComponent className={`w-6 h-6 ${style.icon}`} />
              </motion.div>

              {/* Texte du message */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMessage.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center sm:text-left"
                  >
                    <p className={`text-sm sm:text-base font-medium ${style.text} leading-relaxed`}>
                      {currentMessage.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Indicateurs pour plusieurs messages */}
              {activeMessages.length > 1 && (
                <div className="hidden sm:flex items-center space-x-2 flex-shrink-0">
                  {activeMessages.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-white shadow-lg scale-125' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bouton de fermeture */}
            <motion.button
              onClick={() => {
                setIsVisible(false);
                onDismiss?.(currentMessage.id);
              }}
              className={`flex-shrink-0 p-2 rounded-full hover:bg-white/20 transition-all duration-300 ${style.text} ml-4`}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              title="Masquer le bandeau"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Barre de progression pour auto-slide */}
        {activeMessages.length > 1 && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white/30"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            key={currentIndex}
          />
        )}

        {/* Badge de priorité pour les messages urgents */}
        {currentMessage.priority >= 90 && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-2 right-16 bg-white/20 text-white text-xs px-2 py-1 rounded-full font-bold"
          >
            URGENT
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PremiumBanner;
