import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Package, 
  Clock, 
  MapPin, 
  Users, 
  BarChart3, 
  FileText,
  Bell,
  X,
  Eye,
  EyeOff,
  LogOut,
  Shield,
  ShoppingCart,
  Megaphone
} from 'lucide-react';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';
import { BannerManager } from './BannerSlider';
import type { RestaurantSettings, AdminUser } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3, permission: 'view_analytics' },
    { id: 'products', label: 'Produits', icon: Package, permission: 'manage_products' },
    { id: 'orders', label: 'Commandes', icon: FileText, permission: 'manage_orders' },
    { id: 'schedule', label: 'Créneaux', icon: Clock, permission: 'manage_settings' },
    { id: 'delivery', label: 'Livraison', icon: MapPin, permission: 'manage_settings' },
    { id: 'customers', label: 'Clients', icon: Users, permission: 'manage_customers' },
    { id: 'settings', label: 'Paramètres', icon: Settings, permission: 'manage_settings' },
    { id: 'notifications', label: 'Bandeaux', icon: Bell, permission: 'manage_settings' },
  ];

  const hasPermission = (permission: string) => {
    return user?.permissions.includes(permission as any) || user?.role === 'admin';
  };

  const filteredTabs = tabs.filter(tab => hasPermission(tab.permission));

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="flex h-full">
            <motion.div
              className="bg-white w-80 h-full shadow-2xl overflow-hidden flex flex-col"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
            {/* Header Admin */}
            <div className="bg-gray-900 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Admin Panel</h2>
                    <p className="text-sm text-gray-300">{user.username}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs bg-yellow-400 text-gray-900 px-2 py-1 rounded-full font-medium">
                  {user.role.toUpperCase()}
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 text-sm hover:text-yellow-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-2">
                {filteredTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        isActive 
                          ? 'bg-gray-900 text-white shadow-lg' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </nav>

            {/* Quick Stats */}
            <div className="border-t border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-2">Statistiques rapides</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">23</div>
                  <div className="text-xs text-gray-500">Commandes aujourd'hui</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">€847</div>
                  <div className="text-xs text-gray-500">CA du jour</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            className="flex-1 bg-gray-50 overflow-y-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ delay: 0.1 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="p-8">
              <AdminContent activeTab={activeTab} user={user} />
            </div>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Composant pour le contenu de l'admin
const AdminContent: React.FC<{ activeTab: string; user: AdminUser }> = ({ activeTab, user }) => {
  switch (activeTab) {
    case 'dashboard':
      return <DashboardContent />;
    case 'products':
      return <ProductManager userRole={user.role} />;
    case 'orders':
      return <OrderManager userRole={user.role} />;
    case 'schedule':
      return <ScheduleContent />;
    case 'delivery':
      return <DeliveryContent />;
    case 'customers':
      return <CustomersContent />;
    case 'settings':
      return <SettingsContent />;
    case 'notifications':
      return <BannerManager />;
    default:
      return <DashboardContent />;
  }
};

// Dashboard Content
const DashboardContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.div
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Commandes en cours</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">CA du jour</p>
            <p className="text-2xl font-bold text-gray-900">€847</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Temps moyen</p>
            <p className="text-2xl font-bold text-gray-900">18min</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </motion.div>
    </div>

    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Commandes récentes</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-500">
            <div>Commande</div>
            <div>Client</div>
            <div>Heure</div>
            <div>Montant</div>
            <div>Statut</div>
          </div>
        </div>
        {/* Liste des commandes */}
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((order) => (
            <div key={order} className="p-4 hover:bg-gray-50">
              <div className="grid grid-cols-5 gap-4 items-center text-sm">
                <div className="font-medium">#CMD-{order.toString().padStart(3, '0')}</div>
                <div>Client {order}</div>
                <div>12h{order.toString().padStart(2, '0')}</div>
                <div className="font-medium">€{(25 + order * 5).toFixed(2)}</div>
                <div>
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    En préparation
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Autres composants de contenu (placeholders pour l'instant)
const ScheduleContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestion des Créneaux</h1>
    <p className="text-gray-600">Interface de gestion des créneaux à développer...</p>
  </div>
);

const DeliveryContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Zones de Livraison</h1>
    <p className="text-gray-600">Interface de gestion des livraisons à développer...</p>
  </div>
);

const CustomersContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Base de données Clients</h1>
    <p className="text-gray-600">Interface de gestion des clients à développer...</p>
  </div>
);

const SettingsContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Paramètres du Restaurant</h1>
    <p className="text-gray-600">Interface des paramètres à développer...</p>
  </div>
);

export default AdminPanel;
