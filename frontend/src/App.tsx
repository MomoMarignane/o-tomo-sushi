import { useState } from 'react';
import HeaderPremium from './components/HeaderPremium';
import HeroPremium from './components/HeroPremium';
import MenuModern from './components/MenuModern';
import Cart from './components/Cart';
import Footer from './components/Footer';
import PremiumBanner from './components/PremiumBanner';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import type { CartItem, MenuItem, BannerMessage, AdminUser } from './types';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  // Messages de bannières d'exemple
  const bannerMessages: BannerMessage[] = [
    {
      id: '1',
      text: '🍱 Nouveau menu automne disponible ! Découvrez nos spécialités saisonnières avec des ingrédients frais',
      type: 'permanent',
      active: true,
      priority: 80
    },
    {
      id: '2',
      text: '🎉 PROMO WEEKEND : Livraison gratuite pour toute commande supérieure à 30€ !',
      type: 'permanent',
      active: true,
      priority: 95
    },
    {
      id: '3',
      text: '⭐ Découvrez notre carte des vins japonais et sakés premium sélectionnés par notre sommelier',
      type: 'permanent',
      active: true,
      priority: 60
    }
  ];

  const addToCart = (item: MenuItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...currentCart, { ...item, quantity: 1 }];
      }
    });
  };

  const decrementFromCart = (itemId: string) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === itemId);
      if (!existingItem) return currentCart;
      
      if (existingItem.quantity <= 1) {
        return currentCart.filter(item => item.id !== itemId);
      }
      
      return currentCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(currentCart =>
      currentCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    // Ici on pourrait ouvrir un modal de commande ou rediriger vers une page de checkout
    alert('Fonctionnalité de commande à implémenter avec le backend');
  };

  const handleAdminLogin = (user: AdminUser) => {
    setCurrentUser(user);
    setIsAdminLoginOpen(false);
    setIsAdminPanelOpen(true);
  };

  const handleAdminLogout = () => {
    setCurrentUser(null);
    setIsAdminPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner premium */}
      <PremiumBanner 
        messages={bannerMessages}
        onDismiss={(messageId: string) => console.log('Message dismissed:', messageId)}
      />
      
      {/* Header avec navigation */}
      <HeaderPremium 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onAdminClick={() => setIsAdminLoginOpen(true)}
      />
      
      {/* Contenu principal */}
      <main>
        <HeroPremium />
        <MenuModern 
          onAddToCart={addToCart} 
          onRemoveFromCart={(item) => decrementFromCart(item.id)}
        />
      </main>
      
      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Admin Login Modal */}
      {isAdminLoginOpen && (
        <AdminLogin
          onClose={() => setIsAdminLoginOpen(false)}
          onLogin={handleAdminLogin}
        />
      )}

      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        user={currentUser}
        onLogout={handleAdminLogout}
      />
    </div>
  );
}

export default App;
