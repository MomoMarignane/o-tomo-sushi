import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HeroPremium: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-wood-50 via-wood-100 to-warm-100">
      {/* Arrière-plan boisé chaleureux pour l'accueil */}
      <div className="absolute inset-0 z-0">
        {/* Texture bois principale */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(139, 111, 71, 0.95) 0%, rgba(168, 107, 45, 0.85) 25%, rgba(212, 156, 87, 0.75) 50%, rgba(185, 122, 86, 0.85) 75%, rgba(139, 111, 71, 0.95) 100%),
              url('https://www.transparenttextures.com/patterns/wood-pattern.png')
            `,
            backgroundBlendMode: 'multiply',
            backgroundSize: '200px 200px, cover',
          }}
        />
        
        {/* Overlay bois subtil */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 20%, rgba(168, 107, 45, 0.3) 0%, transparent 60%),
              radial-gradient(circle at 70% 80%, rgba(139, 111, 71, 0.2) 0%, transparent 60%),
              linear-gradient(45deg, rgba(212, 156, 87, 0.1) 0%, rgba(168, 107, 45, 0.15) 100%)
            `,
          }}
        />
        
        {/* Motif grain de bois */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b6f47' fill-opacity='0.4'%3E%3Cpath d='M0 40c13.3-13.3 26.7-13.3 40 0s26.7 13.3 40 0v40H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Éléments décoratifs boisés flottants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            x: [-20, 20, -20],
            y: [-15, 15, -15]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/6 w-6 h-6 rounded-full bg-gradient-to-r from-warm-400 to-wood-500 opacity-40 shadow-warm"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            x: [25, -25, 25],
            y: [10, -10, 10]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-2/3 right-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-wood-600 to-warm-500 opacity-30 shadow-wood"
        />
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-gradient-to-r from-warm-300 to-wood-400 opacity-50"
        />
        
        <motion.div
          animate={{
            y: [-8, 8, -8],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/3 text-5xl font-japanese text-wood-600 opacity-25"
        >
          木
        </motion.div>
        <motion.div
          animate={{
            y: [12, -12, 12],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/5 text-4xl font-japanese text-warm-600 opacity-30"
        >
          温
        </motion.div>
      </div>

      {/* Contenu principal avec thème boisé */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="text-7xl sm:text-8xl lg:text-[10rem] font-japanese text-wood-600 opacity-30 block leading-none drop-shadow-lg">
            玉
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-display bg-gradient-to-r from-wood-800 via-warm-700 to-wood-600 bg-clip-text text-transparent"
          style={{ textShadow: '3px 3px 6px rgba(139, 111, 71, 0.4)' }}
        >
          Ô TOMO
          <motion.span 
            className="block text-xl sm:text-3xl md:text-4xl font-light text-wood-700 mt-2 font-japanese"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Restaurant Japonais <span className="text-warm-600">寿司</span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-wood-800 mb-8 leading-relaxed max-w-3xl mx-auto"
          style={{ textShadow: '1px 1px 2px rgba(139, 111, 71, 0.2)' }}
        >
          <br />
          <span className="text-warm-700 font-japanese text-base sm:text-lg mt-2 block opacity-90">
            木の温もりの中で本格的な日本料理を
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-wood-700 to-warm-600 hover:from-wood-800 hover:to-warm-700 text-white px-8 py-4 rounded-full font-medium text-lg shadow-wood-xl border border-wood-600 transition-all duration-300 min-w-[200px] font-display"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
          >
            Découvrir le Menu
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-wood-600 text-wood-800 hover:bg-wood-100 hover:border-wood-700 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 min-w-[200px] backdrop-blur-sm bg-wood-50/80 shadow-wood font-display"
          >
            Réserver une Table
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center"
        >
          <p className="text-warm-700 font-japanese text-xl mb-4 opacity-80">
            いらっしゃいませ
          </p>
          <p className="text-wood-700 text-sm opacity-90">
            Bienvenue dans notre refuge boisé de saveurs japonaises
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-wood-600 hover:text-warm-600 transition-colors duration-300 bg-wood-100/80 backdrop-blur-sm p-3 rounded-full shadow-wood border border-wood-300 hover:border-warm-400"
          onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroPremium;
