import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { MenuItem } from '../types';

interface MenuModernProps {
  onAddToCart?: (item: MenuItem) => void;
  onRemoveFromCart?: (item: MenuItem) => void;
}

const MenuModern: React.FC<MenuModernProps> = ({ onAddToCart, onRemoveFromCart }) => {
  const [activeCategory, setActiveCategory] = useState('sushi');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories = [
    { id: 'sushi', name: 'Sushi', count: 12 },
    { id: 'sashimi', name: 'Sashimi', count: 8 },
    { id: 'maki', name: 'Maki', count: 15 },
    { id: 'izakaya', name: 'Izakaya', count: 10 },
  ];

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Saumon Premium",
      description: "Saumon frais du marché, riz vinaigré parfumé",
      price: 4.50,
      image: "/api/placeholder/300/200",
      category: "sushi",
      popular: true,
      available: true
    },
    {
      id: "2",
      name: "Thon Rouge",
      description: "Thon rouge de qualité supérieure, texture fondante",
      price: 5.20,
      image: "/api/placeholder/300/200",
      category: "sushi",
      available: true
    },
    {
      id: "3",
      name: "Anguille Grillée",
      description: "Anguille grillée au charbon, sauce tare maison",
      price: 6.00,
      image: "/api/placeholder/300/200",
      category: "sushi",
      available: true
    }
  ];

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  const updateQuantity = (itemId: string, change: number) => {
    const currentQuantity = quantities[itemId] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));

    // Si on diminue la quantité, appeler onRemoveFromCart
    if (change < 0 && onRemoveFromCart) {
      const item = menuItems.find(item => item.id === itemId);
      if (item) {
        onRemoveFromCart(item);
      }
    }
  };

  const addToCart = (item: MenuItem) => {
    onAddToCart?.(item);
    updateQuantity(item.id, 1);
  };

  return (
    <section id="menu" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(75, 46, 14, 0.05) 0%, rgba(123, 74, 3, 0.1) 50%, rgba(168, 107, 45, 0.05) 100%),
          url('https://www.transparenttextures.com/patterns/wood-pattern.png')
        `,
        backgroundBlendMode: 'multiply',
      }}
    >
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d2691e' fill-opacity='0.2'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 relative">
        {/* Header épuré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-wood-800 to-wood-600 bg-clip-text text-transparent mb-3 sm:mb-4 font-display drop-shadow-lg">
            Notre Menu
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-warm-500 to-warm-600 rounded-full mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-wood-700 max-w-2xl mx-auto px-4 leading-relaxed">
            Une sélection raffinée de spécialités japonaises préparées avec passion dans notre cuisine traditionnelle
          </p>
        </motion.div>

        {/* Navigation catégories épurée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8 sm:mb-12 px-4"
        >
          <div className="inline-flex bg-wood-100/80 backdrop-blur-sm rounded-full p-1 shadow-wood border border-wood-300 overflow-x-auto max-w-full">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-wood-600 text-warm-50 shadow-wood border border-wood-500'
                    : 'text-wood-700 hover:text-wood-800 hover:bg-wood-200/50'
                }`}
              >
                {category.name}
                <span className="ml-1 sm:ml-2 text-xs opacity-60">({category.count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid menu épuré */}
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
              className="group relative bg-wood-50/90 backdrop-blur-sm rounded-xl border border-wood-200 shadow-wood hover:shadow-wood-lg transition-all duration-300 overflow-hidden"
              style={{
                backgroundImage: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 234, 218, 0.8) 100%),
                  url('https://www.transparenttextures.com/patterns/wood-pattern.png')
                `,
                backgroundBlendMode: 'multiply',
                backgroundSize: '100px 100px, cover',
              }}
            >
              {/* Badge populaire */}
              {item.popular && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-gradient-to-r from-warm-600 to-warm-500 text-white text-xs px-3 py-1 rounded-full shadow-warm font-medium">
                  Populaire ⭐
                </div>
              )}

              {/* Image */}
              <div className="relative overflow-hidden rounded-xl mb-3 sm:mb-4 mx-4 mt-4">
                <div className="bg-wood-200 flex items-center justify-center h-32 sm:h-40 rounded-lg border border-wood-300 group-hover:border-wood-400 transition-colors">
                  <span className="text-wood-500 text-sm font-medium">Image</span>
                </div>
              </div>

              {/* Contenu */}
              <div className="space-y-2 sm:space-y-3 px-4 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-wood-800 group-hover:text-wood-900 transition-colors">{item.name}</h3>
                  <p className="text-sm sm:text-base text-wood-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg sm:text-xl font-bold text-warm-600">{item.price.toFixed(2)}€</span>
                  
                  {/* Contrôles quantité épurés */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {quantities[item.id] > 0 && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-wood-200 border border-wood-300 flex items-center justify-center hover:bg-wood-300 hover:border-wood-400 transition-all duration-200 shadow-sm"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-wood-700" />
                      </motion.button>
                    )}
                    
                    {quantities[item.id] > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-sm font-bold text-wood-800 min-w-[16px] sm:min-w-[20px] text-center bg-wood-100 px-2 py-1 rounded-full border border-wood-200"
                      >
                        {quantities[item.id]}
                      </motion.span>
                    )}
                    
                    <motion.button
                      onClick={() => addToCart(item)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-warm-600 to-warm-500 flex items-center justify-center hover:from-warm-700 hover:to-warm-600 transition-all duration-200 shadow-warm border border-warm-600"
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

        {/* CTA section épurée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-wood-300 px-4"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-wood-800 mb-3 sm:mb-4 font-display">
            Envie de découvrir plus ?
          </h3>
          <p className="text-sm sm:text-base text-wood-600 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
            Consultez notre menu complet ou réservez votre table pour une expérience unique dans notre restaurant traditionnel
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-none mx-auto">
            <button className="btn-primary w-full sm:w-auto shadow-warm">
              Voir le menu complet
            </button>
            <button className="btn-secondary w-full sm:w-auto">
              Réserver une table
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuModern;
