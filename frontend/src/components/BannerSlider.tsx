import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Calendar, Star } from 'lucide-react';
import type { BannerMessage } from '../types';

interface BannerSliderProps {
  messages: BannerMessage[];
  onDismiss?: (messageId: string) => void;
}

const BannerSlider: React.FC<BannerSliderProps> = ({ messages, onDismiss }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Filtrer les messages actifs
  const activeMessages = messages.filter(message => {
    if (!message.active) return false;
    
    const now = new Date();
    if (message.type === 'temporary') {
      if (message.startDate && new Date(message.startDate) > now) return false;
      if (message.endDate && new Date(message.endDate) < now) return false;
    }
    
    return true;
  }).sort((a, b) => b.priority - a.priority);

  // Debug
  console.log('BannerSlider - Messages reçus:', messages);
  console.log('BannerSlider - Messages actifs:', activeMessages);
  console.log('BannerSlider - isVisible:', isVisible);

  // Auto-slide pour plusieurs messages
  useEffect(() => {
    if (activeMessages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeMessages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeMessages.length]);

  if (!isVisible || activeMessages.length === 0) {
    console.log('BannerSlider - Rendu null car isVisible:', isVisible, 'activeMessages.length:', activeMessages.length);
    return null;
  }

  const currentMessage = activeMessages[currentIndex];

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

  const getColorByPriority = (priority: number) => {
    if (priority >= 90) return 'bg-red-500'; // Urgent
    if (priority >= 70) return 'bg-yellow-500'; // Important
    if (priority >= 50) return 'bg-blue-500'; // Information
    return 'bg-gray-500'; // Normal
  };

  const getTextColorByPriority = (priority: number) => {
    if (priority >= 90) return 'text-red-50';
    if (priority >= 70) return 'text-yellow-50';
    if (priority >= 50) return 'text-blue-50';
    return 'text-gray-50';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`relative overflow-hidden ${getColorByPriority(currentMessage.priority)}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3 flex-1">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="flex-shrink-0"
              >
                {React.createElement(getIconByType(currentMessage.type), {
                  className: `w-5 h-5 ${getTextColorByPriority(currentMessage.priority)}`
                })}
              </motion.div>

              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMessage.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`text-sm font-medium ${getTextColorByPriority(currentMessage.priority)} truncate sm:text-center`}
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
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? `${getTextColorByPriority(currentMessage.priority).replace('text-', 'bg-')}` 
                          : `${getTextColorByPriority(currentMessage.priority).replace('text-', 'bg-')} opacity-50`
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
              className={`flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors ${getTextColorByPriority(currentMessage.priority)}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Progress bar pour auto-slide */}
        {activeMessages.length > 1 && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-white/30"
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

// Composant pour gérer les messages depuis l'admin
export const BannerManager: React.FC = () => {
  const [messages, setMessages] = useState<BannerMessage[]>([
    {
      id: '1',
      text: '🍱 Nouveau menu automne disponible ! Découvrez nos spécialités saisonnières',
      type: 'permanent',
      active: true,
      priority: 80
    },
    {
      id: '2',
      text: '🎉 Livraison gratuite ce week-end pour toute commande supérieure à 30€',
      type: 'temporary',
      active: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      priority: 90
    },
    {
      id: '3',
      text: '📱 Téléchargez notre app mobile pour des commandes encore plus rapides',
      type: 'permanent',
      active: true,
      priority: 60
    }
  ]);

  const handleDismiss = (messageId: string) => {
    // Dans une vraie app, on sauvegarderait la préférence utilisateur
    console.log(`Message ${messageId} dismissed`);
  };

  return (
    <div className="space-y-4">
      {/* Bandeau actuel */}
      <BannerSlider messages={messages} onDismiss={handleDismiss} />
      
      {/* Interface d'admin pour gérer les bandeaux */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestion des bandeaux</h3>
        
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{message.text}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    message.type === 'permanent' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {message.type === 'permanent' ? 'Permanent' : 'Temporaire'}
                  </span>
                  <span className="text-xs text-gray-500">
                    Priorité: {message.priority}
                  </span>
                  <span className={`text-xs font-medium ${
                    message.active ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {message.active ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setMessages(prev => 
                    prev.map(m => 
                      m.id === message.id 
                        ? { ...m, active: !m.active }
                        : m
                    )
                  )}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    message.active
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {message.active ? 'Désactiver' : 'Activer'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors">
          + Ajouter un nouveau bandeau
        </button>
      </div>
    </div>
  );
};

export default BannerSlider;
