import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  TrendingDown,
  Bell,
  Clock
} from 'lucide-react';

interface StockItem {
  id: string;
  name: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  status: 'available' | 'low' | 'out';
  lastUpdated: Date;
  category: string;
}

interface StockManagerProps {
  userRole: 'admin' | 'manager' | 'staff';
}

const StockManager: React.FC<StockManagerProps> = ({ userRole }) => {
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: '1',
      name: 'Saumon frais',
      quantity: 15,
      minQuantity: 5,
      unit: 'kg',
      status: 'available',
      lastUpdated: new Date(),
      category: 'poissons'
    },
    {
      id: '2',
      name: 'Thon rouge',
      quantity: 2,
      minQuantity: 3,
      unit: 'kg',
      status: 'low',
      lastUpdated: new Date(),
      category: 'poissons'
    },
    {
      id: '3',
      name: 'Riz à sushi',
      quantity: 0,
      minQuantity: 10,
      unit: 'kg',
      status: 'out',
      lastUpdated: new Date(),
      category: 'ingredients'
    },
    {
      id: '4',
      name: 'Avocat',
      quantity: 25,
      minQuantity: 10,
      unit: 'pièces',
      status: 'available',
      lastUpdated: new Date(),
      category: 'legumes'
    }
  ]);

  const canEdit = userRole === 'admin' || userRole === 'manager';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'low':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'out':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'out':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'En stock';
      case 'low':
        return 'Stock faible';
      case 'out':
        return 'Rupture';
      default:
        return 'Inconnu';
    }
  };

  const updateStock = (itemId: string, newQuantity: number) => {
    setStockItems(prev => prev.map(item => {
      if (item.id === itemId) {
        let status: 'available' | 'low' | 'out' = 'available';
        if (newQuantity === 0) {
          status = 'out';
        } else if (newQuantity <= item.minQuantity) {
          status = 'low';
        }

        return {
          ...item,
          quantity: newQuantity,
          status,
          lastUpdated: new Date()
        };
      }
      return item;
    }));
  };

  const alertItems = stockItems.filter(item => item.status === 'low' || item.status === 'out');

  return (
    <div className="space-y-6">
      {/* En-tête avec alertes */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des stocks</h2>
          <p className="text-gray-600">Surveillez et gérez votre inventaire en temps réel</p>
        </div>

        {alertItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-2 text-red-700">
              <Bell className="w-5 h-5" />
              <span className="font-medium">
                {alertItems.length} alerte{alertItems.length > 1 ? 's' : ''} stock
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">En stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {stockItems.filter(item => item.status === 'available').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Stock faible</p>
              <p className="text-2xl font-bold text-gray-900">
                {stockItems.filter(item => item.status === 'low').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ruptures</p>
              <p className="text-2xl font-bold text-gray-900">
                {stockItems.filter(item => item.status === 'out').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total articles</p>
              <p className="text-2xl font-bold text-gray-900">
                {stockItems.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des stocks */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">État des stocks</h3>
        </div>

        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {stockItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {getStatusIcon(item.status)}
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {item.quantity} {item.unit}
                      </p>
                      <p className="text-xs text-gray-500">
                        Min: {item.minQuantity} {item.unit}
                      </p>
                    </div>

                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(item.status)}`}>
                      {getStatusText(item.status)}
                    </div>

                    <div className="text-right min-w-[120px]">
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {canEdit && (
                    <div className="flex items-center space-x-2 ml-4">
                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                      
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => updateStock(item.id, item.quantity + 1)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Augmenter"
                        >
                          <TrendingUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateStock(item.id, Math.max(0, item.quantity - 1))}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Diminuer"
                        >
                          <TrendingDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Alertes détaillées */}
      {alertItems.length > 0 && (
        <div className="bg-white rounded-lg border border-red-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-red-200 bg-red-50">
            <h3 className="text-lg font-semibold text-red-900 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Alertes de stock ({alertItems.length})
            </h3>
          </div>

          <div className="divide-y divide-red-100">
            {alertItems.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity === 0 
                        ? 'Rupture de stock' 
                        : `Stock faible: ${item.quantity} ${item.unit} (min: ${item.minQuantity})`
                      }
                    </p>
                  </div>
                </div>

                {canEdit && (
                  <button
                    onClick={() => {
                      const newQuantity = prompt(`Nouvelle quantité pour ${item.name} (${item.unit}):`, item.quantity.toString());
                      if (newQuantity !== null) {
                        updateStock(item.id, parseInt(newQuantity) || 0);
                      }
                    }}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Réapprovisionner
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockManager;
