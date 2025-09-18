import React, { useState } from 'react';
import { Filter, Plus } from 'lucide-react';
import { categories, menuItems } from '../data/menu';
import type { MenuItem, CartItem } from '../types';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  cart: CartItem[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, cart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.available;
  });

  const getCartQuantity = (itemId: string): number => {
    return cart.find(item => item.id === itemId)?.quantity || 0;
  };

  return (
    <section id="menu" className="py-16 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(75, 46, 14, 0.03) 0%, rgba(123, 74, 3, 0.08) 50%, rgba(168, 107, 45, 0.03) 100%),
          url('https://www.transparenttextures.com/patterns/wood-pattern.png')
        `,
        backgroundBlendMode: 'multiply',
      }}
    >
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d2691e' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-max section-padding relative">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-wood-800 to-wood-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Notre Menu
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-warm-500 to-warm-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-wood-700 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre sélection de plats japonais authentiques, 
            préparés avec des ingrédients frais et de qualité dans notre cuisine traditionnelle.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-warm-600 to-warm-500 text-white shadow-warm border border-warm-600'
                    : 'bg-wood-100 text-wood-700 hover:bg-wood-200 border border-wood-200 hover:border-wood-300'
                }`}
              >
                Tous
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-warm-600 to-warm-500 text-white shadow-warm border border-warm-600'
                      : 'bg-wood-100 text-wood-700 hover:bg-wood-200 border border-wood-200 hover:border-wood-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un plat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-wood-300 rounded-lg bg-wood-50/80 backdrop-blur-sm text-wood-800 placeholder-wood-500 focus:ring-2 focus:ring-warm-500 focus:border-warm-500 transition-colors shadow-sm"
              />
              <Filter className="absolute left-3 top-2.5 w-4 h-4 text-wood-500" />
            </div>
          </div>
        </div>

        {/* Menu items grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <MenuCard
              key={item.id}
              item={item}
              onAddToCart={onAddToCart}
              cartQuantity={getCartQuantity(item.id)}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-wood-600 text-lg font-medium">
              Aucun plat trouvé pour cette recherche.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  cartQuantity: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart, cartQuantity }) => {
  return (
    <div className="group relative bg-wood-50/90 backdrop-blur-sm border border-wood-200 rounded-xl overflow-hidden hover:shadow-wood-lg transition-all duration-300"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 234, 218, 0.8) 100%),
          url('https://www.transparenttextures.com/patterns/wood-pattern.png')
        `,
        backgroundBlendMode: 'multiply',
        backgroundSize: '80px 80px, cover',
      }}
    >
      <div className="aspect-video bg-wood-200 relative border-b border-wood-300">
        <img
          src={item.image || '/images/placeholder-dish.jpg'}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-dish.jpg';
          }}
        />
        {cartQuantity > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-warm-600 to-warm-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-warm border border-warm-600">
            {cartQuantity}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg text-wood-800 mb-2 group-hover:text-wood-900 transition-colors">
          {item.name}
        </h3>
        <p className="text-wood-600 text-sm mb-4 leading-relaxed">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-warm-600">
            {item.price.toFixed(2)} €
          </span>
          
          <button
            onClick={() => onAddToCart(item)}
            className="flex items-center space-x-2 bg-gradient-to-r from-warm-600 to-warm-500 hover:from-warm-700 hover:to-warm-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-warm border border-warm-600 hover:shadow-warm-lg transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
