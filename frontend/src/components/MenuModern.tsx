import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { MenuItem } from '../types';

interface MenuModernProps {
  onAddToCart?: (item: MenuItem) => void;
}

const MenuModern: React.FC<MenuModernProps> = ({ onAddToCart }) => {
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
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const addToCart = (item: MenuItem) => {
    onAddToCart?.(item);
    updateQuantity(item.id, 1);
  };

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="container-max">
        {/* Header épuré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Notre Menu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une sélection raffinée de spécialités japonaises préparées avec passion
          </p>
        </motion.div>

        {/* Navigation catégories épurée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-60">({category.count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid menu épuré */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="menu-item group"
            >
              {/* Badge populaire */}
              {item.popular && (
                <div className="absolute top-4 left-4 z-10 bg-gray-900 text-white text-xs px-2 py-1 rounded-full">
                  Populaire
                </div>
              )}

              {/* Image */}
              <div className="relative overflow-hidden rounded-xl mb-4">
                <div className="menu-item-image bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Image</span>
                </div>
              </div>

              {/* Contenu */}
              <div className="space-y-3">
                <div>
                  <h3 className="menu-item-title">{item.name}</h3>
                  <p className="menu-item-description">{item.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="menu-item-price">{item.price.toFixed(2)}€</span>
                  
                  {/* Contrôles quantité épurés */}
                  <div className="flex items-center space-x-3">
                    {quantities[item.id] > 0 && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    )}
                    
                    {quantities[item.id] > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-sm font-medium text-gray-900 min-w-[20px] text-center"
                      >
                        {quantities[item.id]}
                      </motion.span>
                    )}
                    
                    <motion.button
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="w-4 h-4 text-white" />
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
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Envie de découvrir plus ?
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Consultez notre menu complet ou réservez votre table pour une expérience unique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Voir le menu complet
            </button>
            <button className="btn-secondary">
              Réserver une table
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuModern;
