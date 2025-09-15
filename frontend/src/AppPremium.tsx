import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import HeaderPremium from './components/HeaderPremium';
import HeroPremium from './components/HeroPremium';
import MenuModern from './components/MenuModern';
import type { CartItem, MenuItem } from './types';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculer le nombre total d'articles dans le panier
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (item: MenuItem, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...currentCart, { ...item, quantity }];
      }
    });
  };

  const decrementFromCart = (item: MenuItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else if (existingItem && existingItem.quantity === 1) {
        return currentCart.filter(cartItem => cartItem.id !== item.id);
      }
      
      return currentCart;
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(currentCart =>
        currentCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Premium */}
      <HeaderPremium 
        cartCount={cartCount}
        onCartClick={openCart}
      />

      {/* Hero Premium */}
      <HeroPremium onOrderClick={openCart} />

      {/* Menu Modern */}
      <MenuModern 
        onAddToCart={(item) => addToCart(item, 1)} 
        onRemoveFromCart={decrementFromCart}
      />

      {/* Modal Panier */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          >
            <motion.div 
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header du panier */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Panier</h3>
                <button 
                  onClick={closeCart}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenu du panier */}
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">Votre panier est vide</p>
                  <button 
                    onClick={closeCart}
                    className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    Découvrir le menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Articles du panier */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id} 
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.price.toFixed(2)}€ x {item.quantity}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Total et commande */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-2xl font-bold text-gray-900">
                        {getTotalPrice().toFixed(2)}€
                      </span>
                    </div>
                    
                    <button className="bg-gray-900 text-white w-full px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                      Commander maintenant
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
