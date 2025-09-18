import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Star } from 'lucide-react';

interface HeroPremiumProps {
  onOrderClick?: () => void;
}

const HeroPremium: React.FC<HeroPremiumProps> = ({ onOrderClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-wood-pattern overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(253, 251, 247, 0.9) 0%, rgba(248, 243, 233, 0.8) 50%, rgba(231, 201, 169, 0.9) 100%),
          url('https://www.transparenttextures.com/patterns/light-wood.png')
        `,
        backgroundBlendMode: 'multiply',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Geometric Background Elements avec thème boisé */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 right-4 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-warm-200 to-warm-300 shadow-warm border-2 border-wood-300"
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
          className="absolute bottom-32 left-4 sm:left-16 w-16 h-16 sm:w-24 sm:h-24 rounded-lg bg-gradient-to-br from-wood-700 to-wood-800 rotate-45 shadow-wood-lg border border-wood-600"
          animate={{ 
            rotate: [45, 135, 45],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        {/* Nouveaux éléments décoratifs boisés */}
        <motion.div 
          className="absolute top-1/3 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-warm-400 to-warm-500 opacity-70"
          animate={{ 
            x: [0, 15, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="container-max relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge épuré avec thème boisé */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-wood-50/90 border-2 border-wood-300 rounded-full px-3 py-2 sm:px-4 sm:py-2 mb-6 sm:mb-8 shadow-warm backdrop-blur-sm"
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-warm-600 fill-current" />
            <span className="text-xs sm:text-sm text-wood-700 font-medium">Authentique cuisine japonaise</span>
          </motion.div>

          {/* Titre épuré avec thème boisé */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-wood-gradient mb-4 sm:mb-6 tracking-tight px-4 drop-shadow-lg"
            style={{ textShadow: '2px 2px 4px rgba(168, 107, 45, 0.3)' }}
          >
            Ô TOMO
            <motion.span 
              className="block text-xl sm:text-3xl md:text-4xl font-light text-wood-600 mt-2 font-japanese"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Sushi & Izakaya <span className="text-warm-700">寿司</span>
            </motion.span>
          </motion.h1>

          {/* Description épurée avec thème boisé */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-wood-700 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 font-medium"
            style={{ textShadow: '1px 1px 2px rgba(168, 107, 45, 0.2)' }}
          >
            Découvrez l'art culinaire japonais dans un cadre chaleureux et moderne.
            <br className="hidden sm:block" />
            Une expérience gastronomique authentique à Saint-Maximin-la-Sainte-Baume.
          </motion.p>

          {/* CTA épuré avec thème boisé */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <motion.button
              className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg"
              onClick={onOrderClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commander en ligne
            </motion.button>
            
            <motion.button
              className="btn-secondary w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Réserver une table
            </motion.button>
          </motion.div>

          {/* Stats épurées avec thème boisé */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 pt-8 sm:pt-16 border-t-2 border-wood-300 px-4"
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-wood-800 mb-1 font-display">15+</div>
              <div className="text-xs sm:text-sm text-wood-600 font-medium">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-wood-800 mb-1 font-display">5★</div>
              <div className="text-xs sm:text-sm text-wood-600 font-medium">Note moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-wood-800 mb-1 font-display">500+</div>
              <div className="text-xs sm:text-sm text-wood-600 font-medium">Clients satisfaits</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator épuré avec thème boisé */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-wood-600"
        >
          <span className="text-xs uppercase tracking-wider font-medium">Découvrir</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroPremium;
