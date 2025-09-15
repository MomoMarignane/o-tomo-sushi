import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Star } from 'lucide-react';

interface HeroPremiumProps {
  onOrderClick?: () => void;
}

const HeroPremium: React.FC<HeroPremiumProps> = ({ onOrderClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 right-4 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-100"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-4 sm:left-16 w-16 h-16 sm:w-24 sm:h-24 rounded-lg bg-gray-900 rotate-45"
          animate={{ 
            rotate: [45, 135, 45],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="container-max relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge épuré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-3 py-2 sm:px-4 sm:py-2 mb-6 sm:mb-8"
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
            <span className="text-xs sm:text-sm text-gray-600">Authentique cuisine japonaise</span>
          </motion.div>

          {/* Titre épuré */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight px-4"
          >
            Ô TOMO
            <motion.span 
              className="block text-xl sm:text-3xl md:text-4xl font-light text-gray-600 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Sushi & Izakaya
            </motion.span>
          </motion.h1>

          {/* Description épurée */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Découvrez l'art culinaire japonais dans un cadre contemporain.
            <br className="hidden sm:block" />
            Une expérience gastronomique authentique au cœur de Paris.
          </motion.p>

          {/* CTA épuré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <motion.button
              className="w-full sm:w-auto bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={onOrderClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commander en ligne
            </motion.button>
            
            <motion.button
              className="w-full sm:w-auto border border-gray-300 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg hover:bg-gray-50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Réserver une table
            </motion.button>
          </motion.div>

          {/* Stats épurées */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 pt-8 sm:pt-16 border-t border-gray-200 px-4"
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">15+</div>
              <div className="text-xs sm:text-sm text-gray-600">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">5★</div>
              <div className="text-xs sm:text-sm text-gray-600">Note moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-xs sm:text-sm text-gray-600">Clients satisfaits</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator épuré */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-gray-400"
        >
          <span className="text-xs uppercase tracking-wider">Découvrir</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroPremium;
