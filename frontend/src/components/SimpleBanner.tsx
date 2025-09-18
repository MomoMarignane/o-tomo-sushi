import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Calendar, Star } from 'lucide-react';
import type { BannerMessage } from '../types';

interface SimpleBannerProps {
  messages: BannerMessage[];
  onDismiss?: (messageId: string) => void;
}

const SimpleBanner: React.FC<SimpleBannerProps> = ({ messages, onDismiss }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Filtrer seulement les messages actifs
  const activeMessages = messages.filter(message => message.active);

  // Auto-slide pour plusieurs messages
  useEffect(() => {
    if (activeMessages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeMessages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeMessages.length]);

  // Si pas de messages ou pas visible, ne rien afficher
  if (!isVisible || activeMessages.length === 0) return null;

  const currentMessage = activeMessages[currentIndex];

  // Thème boisé : couleurs chaudes et textures
  const getColorByPriority = (priority: number) => {
    if (priority >= 90) return 'bg-gradient-to-r from-[#7c4a03] via-[#b97a56] to-[#a86b2d]'; // Urgent bois foncé
    if (priority >= 70) return 'bg-gradient-to-r from-[#b97a56] via-[#e7c9a9] to-[#a86b2d]'; // Important bois doré
    if (priority >= 50) return 'bg-gradient-to-r from-[#e7c9a9] via-[#b97a56] to-[#a86b2d]'; // Information beige/bois
    return 'bg-gradient-to-r from-[#a86b2d] via-[#e7c9a9] to-[#b97a56]'; // Normal bois clair
  };

  const getTextColorByPriority = (priority: number) => {
    if (priority >= 90) return 'text-[#fff8f0]';
    if (priority >= 70) return 'text-[#4b2e0e]';
    if (priority >= 50) return 'text-[#7c4a03]';
    return 'text-[#4b2e0e]';
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'temporary':
        return Calendar;
      case 'permanent':
        return Star;
      default:
        return Info;
    }
  };

  const IconComponent = getIconByType(currentMessage.type);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`relative overflow-hidden ${getColorByPriority(currentMessage.priority)} shadow-lg border-b-4 border-[#a86b2d]`}
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
          backgroundBlendMode: 'multiply',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3 flex-1">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="flex-shrink-0 bg-[#e7c9a9] rounded-full p-2 shadow"
              >
                <IconComponent className={`w-6 h-6 ${getTextColorByPriority(currentMessage.priority)}`} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMessage.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`text-base font-display font-semibold tracking-wide ${getTextColorByPriority(currentMessage.priority)} truncate sm:text-center drop-shadow`}
                    style={{
                      textShadow: '0 1px 2px #a86b2d55',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {currentMessage.text}
                  </motion.p>
                </AnimatePresence>
              </div>

              {activeMessages.length > 1 && (
                <div className="hidden sm:flex items-center space-x-2">
                  {activeMessages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full border border-[#a86b2d] transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-[#a86b2d]' 
                          : 'bg-[#e7c9a9] opacity-50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <motion.button
              onClick={() => {
                setIsVisible(false);
                onDismiss?.(currentMessage.id);
              }}
              className={`flex-shrink-0 p-1 rounded-full hover:bg-[#a86b2d]/20 transition-colors ${getTextColorByPriority(currentMessage.priority)} border border-[#a86b2d]`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Progress bar pour auto-slide */}
        {activeMessages.length > 1 && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#a86b2d] via-[#e7c9a9] to-[#b97a56]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            key={currentIndex}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SimpleBanner;
