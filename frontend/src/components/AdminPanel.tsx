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
  LogOut,
  Shield
} from 'lucide-react';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';
import { BannerManager } from './BannerSlider';
import type { AdminUser } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
          className="fixed inset-0 bg-black z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="flex h-full">
            <motion.div
              className="w-80 h-full shadow-wood-2xl overflow-hidden flex flex-col relative bg-wood-800"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Header Admin */}
              <div className="bg-wood-900 text-warm-50 p-6 border-b border-wood-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-warm-500 to-warm-400 rounded-full flex items-center justify-center shadow-warm">
                      <Shield className="w-5 h-5 text-wood-800" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Admin Panel</h2>
                      <p className="text-sm text-warm-200">{user.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-wood-700 rounded-full transition-colors border border-wood-600 hover:border-wood-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-warm-400 text-wood-800 px-2 py-1 rounded-full font-medium">
                    {user.role.toUpperCase()}
                  </span>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 text-sm hover:text-warm-300 transition-colors bg-wood-700 px-3 py-1 rounded-lg border border-wood-600 hover:border-wood-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 bg-wood-800">
                <div className="space-y-2">
                  {filteredTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 border ${
                          isActive
                            ? 'bg-wood-700 text-warm-100 shadow-wood border-wood-500'
                            : 'text-warm-200 hover:bg-wood-700 border-wood-600 hover:border-wood-500'
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
              <div className="border-t border-wood-700 p-4 bg-wood-900">
                <div className="text-xs text-warm-300 mb-3 font-medium">Statistiques rapides</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center bg-wood-800 p-3 rounded-lg border border-wood-700">
                    <div className="text-lg font-bold text-warm-100">23</div>
                    <div className="text-xs text-warm-300">Commandes aujourd'hui</div>
                  </div>
                  <div className="text-center bg-wood-800 p-3 rounded-lg border border-wood-700">
                    <div className="text-lg font-bold text-warm-100">€847</div>
                    <div className="text-xs text-warm-300">CA du jour</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div
              className="flex-1 overflow-y-auto relative bg-wood-50"
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
    <h1 className="text-3xl font-bold text-wood-800 mb-8 font-display">Tableau de bord</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.div
        className="bg-wood-100 rounded-xl p-6 shadow-wood border border-wood-300"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-wood-600 font-medium">Commandes en cours</p>
            <p className="text-2xl font-bold text-wood-800">12</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center shadow-sm">
            <FileText className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-wood-100 rounded-xl p-6 shadow-wood border border-wood-300"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-wood-600 font-medium">CA du jour</p>
            <p className="text-2xl font-bold text-wood-800">€847</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center shadow-sm">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-wood-100 rounded-xl p-6 shadow-wood border border-wood-300"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-wood-600 font-medium">Temps moyen</p>
            <p className="text-2xl font-bold text-wood-800">18min</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-warm-500 to-warm-400 rounded-full flex items-center justify-center shadow-sm">
            <Clock className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>
    </div>

    <div className="mt-8">
      <h2 className="text-xl font-semibold text-wood-800 mb-4 font-display">Commandes récentes</h2>
      <div className="bg-wood-100 rounded-xl shadow-wood border border-wood-300 overflow-hidden">
        <div className="p-4 border-b border-wood-300 bg-wood-200">
          <div className="grid grid-cols-5 gap-4 text-sm font-medium text-wood-700">
            <div>Commande</div>
            <div>Client</div>
            <div>Heure</div>
            <div>Montant</div>
            <div>Statut</div>
          </div>
        </div>
        <div className="divide-y divide-wood-300">
          {[1, 2, 3].map((order) => (
            <div key={order} className="p-4 hover:bg-wood-200 transition-colors">
              <div className="grid grid-cols-5 gap-4 items-center text-sm">
                <div className="font-medium text-wood-800">#CMD-{order.toString().padStart(3, '0')}</div>
                <div className="text-wood-700">Client {order}</div>
                <div className="text-wood-700">12h{order.toString().padStart(2, '0')}</div>
                <div className="font-medium text-wood-800">€{(25 + order * 5).toFixed(2)}</div>
                <div>
                  <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-warm-500 to-warm-400 text-white rounded-full shadow-sm">
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

// Autres composants de contenu
const ScheduleContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-wood-800 mb-8 font-display">Gestion des Créneaux</h1>
    <p className="text-wood-600">Interface de gestion des créneaux à développer...</p>
  </div>
);

const DeliveryContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-wood-800 mb-8 font-display">Zones de Livraison</h1>
    <p className="text-wood-600">Interface de gestion des livraisons à développer...</p>
  </div>
);

const CustomersContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-wood-800 mb-8 font-display">Base de données Clients</h1>
    <p className="text-wood-600">Interface de gestion des clients à développer...</p>
  </div>
);

const SettingsContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-wood-800 mb-8 font-display">Paramètres du Restaurant</h1>
    <p className="text-wood-600">Interface des paramètres à développer...</p>
  </div>
);

export default AdminPanel;
