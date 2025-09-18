import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { MenuItem } from '../types';
import { menuItems } from '../data/menu';

interface MenuModernProps {
  onAddToCart?: (item: MenuItem) => void;
  onRemoveFromCart?: (item: MenuItem) => void;
}

const MenuModern: React.FC<MenuModernProps> = () => {
  const [activeCategory, setActiveCategory] = useState('sushi');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Catégories avec caractères japonais et modernité
  const enhancedCategories = [
    { id: 'sushi', name: '寿司 Sushi', count: menuItems.filter(item => item.category === 'sushi').length },
    { id: 'sashimi', name: '刺身 Sashimi', count: menuItems.filter(item => item.category === 'sashimi').length },
    { id: 'maki', name: '巻き Maki', count: menuItems.filter(item => item.category === 'maki').length },
    { id: 'chirashi', name: 'Chirashi', count: menuItems.filter(item => item.category === 'chirashi').length },
    { id: 'plats-chauds', name: '居酒屋 Izakaya', count: menuItems.filter(item => item.category === 'plats-chauds').length },
    { id: 'desserts', name: 'Desserts', count: menuItems.filter(item => item.category === 'desserts').length },
  ];

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities(prev => {
      const newQuantity = Math.max(0, (prev[itemId] || 0) + change);
      return { ...prev, [itemId]: newQuantity };
    });
  };

  return (
    <section
      id="menu"
      className="relative py-16 sm:py-24 bg-gradient-to-br from-wood-50/95 to-warm-50/90 overflow-hidden min-h-screen"
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(168, 107, 45, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(212, 156, 87, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, rgba(75, 46, 14, 0.05) 0%, rgba(123, 74, 3, 0.1) 50%, rgba(168, 107, 45, 0.05) 100%),
          url('https://www.transparenttextures.com/patterns/wood-pattern.png')
        `,
        backgroundBlendMode: 'multiply',
      }}
    >
      {/* Éléments décoratifs japonais flottants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            x: [-20, 20, -20],
            y: [-10, 10, -10]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-vermillon-400 opacity-30"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            x: [20, -20, 20],
            y: [10, -10, 10]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-3/4 right-1/3 w-6 h-6 rounded-full bg-gradient-to-r from-gold-400 to-sumi-300 opacity-20"
        />
      </div>

      {/* Texture japonaise subtile */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d2691e' fill-opacity='0.2'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 relative">
        {/* Header avec caractères japonais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4"
          >
            <span className="text-6xl sm:text-7xl lg:text-8xl font-japanese text-vermillon-600 opacity-20 block leading-none">
              本格的
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sumi-800 via-indigo-700 to-vermillon-600 bg-clip-text text-transparent mb-3 sm:mb-4 font-display drop-shadow-lg">
            Notre Menu Authentique
          </h2>
          <div className="japanese-divider mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-wood-700 max-w-2xl mx-auto px-4 leading-relaxed">
            Une sélection raffinée de spécialités japonaises préparées avec <span className="font-japanese text-vermillon-700">和の心で</span> dans notre cuisine traditionnelle
          </p>
        </motion.div>

        {/* Navigation catégories japonaises */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8 sm:mb-12 px-4"
        >
          <div className="inline-flex bg-gradient-to-r from-wood-100/90 to-warm-50/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gold-200 overflow-x-auto max-w-full">
            {enhancedCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-2 sm:px-5 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap font-japanese-body ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-vermillon-600 to-indigo-600 text-white shadow-lg border border-vermillon-500 transform scale-105'
                    : 'text-sumi-700 hover:text-vermillon-700 hover:bg-gold-100/50 hover:scale-102'
                }`}
              >
                {category.name}
                <span className="ml-1 sm:ml-2 text-xs opacity-70">({category.count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid menu japonais moderne */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="japanese-card group relative overflow-hidden"
            >
              {/* Badge populaire japonais */}
              {item.popular && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-gradient-to-r from-vermillon-600 to-gold-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium font-japanese-body">
                  人気 Populaire
                </div>
              )}

              {/* Image avec overlay japonais */}
              <div className="relative overflow-hidden rounded-xl mb-3 sm:mb-4 mx-4 mt-4">
                <div className="bg-gradient-to-br from-wood-200 to-warm-100 flex items-center justify-center h-32 sm:h-40 rounded-lg border border-gold-300 group-hover:border-vermillon-400 transition-all duration-300 relative overflow-hidden">
                  {/* Motif japonais décoratif */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 right-2 text-2xl text-vermillon-600 font-japanese">桜</div>
                    <div className="absolute bottom-2 left-2 text-xl text-indigo-600 font-japanese">竹</div>
                  </div>
                  <span className="text-sumi-500 text-sm font-medium relative z-10">Image</span>
                </div>
              </div>

              {/* Contenu avec style japonais */}
              <div className="space-y-2 sm:space-y-3 px-4 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-sumi-800 group-hover:text-vermillon-700 transition-colors font-japanese-body">
                    {item.name}
                  </h3>
                  <p className="text-sm sm:text-base text-wood-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg sm:text-xl font-bold text-vermillon-600">{item.price.toFixed(2)}€</span>
                  
                  {/* Contrôles quantité style japonais */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {quantities[item.id] > 0 && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-sumi-600 to-sumi-500 flex items-center justify-center hover:from-sumi-700 hover:to-sumi-600 transition-all duration-200 shadow-lg border border-sumi-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </motion.button>
                    )}

                    {quantities[item.id] > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 text-center font-bold text-sumi-700 font-japanese-body"
                      >
                        {quantities[item.id]}
                      </motion.span>
                    )}

                    <motion.button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-vermillon-600 to-indigo-500 flex items-center justify-center hover:from-vermillon-700 hover:to-indigo-600 transition-all duration-200 shadow-lg border border-vermillon-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA section japonaise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-gold-300 px-4"
        >
          <div className="mb-6">
            <span className="text-4xl sm:text-5xl font-japanese text-vermillon-500 opacity-30 block leading-none mb-4">
              いらっしゃいませ
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-sumi-800 mb-3 sm:mb-4 font-display">
            Découvrez notre univers culinaire
          </h3>
          <p className="text-sm sm:text-base text-wood-600 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
            Réservez votre table pour une expérience authentique dans notre restaurant traditionnel japonais
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-none mx-auto">
            <motion.button 
              className="btn-primary w-full sm:w-auto bg-gradient-to-r from-vermillon-600 to-indigo-600 hover:from-vermillon-700 hover:to-indigo-700 shadow-lg border border-vermillon-500 font-japanese-body"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              メニュー Menu complet
            </motion.button>
            <motion.button 
              className="btn-secondary w-full sm:w-auto border-vermillon-600 text-vermillon-700 hover:bg-vermillon-50 font-japanese-body"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              予約 Réserver
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuModern;
