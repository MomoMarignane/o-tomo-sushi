import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Printer,
  Euro,
  MessageSquare,
  Search
} from 'lucide-react';
import type { Order, OrderStatus, DeliveryType } from '../types';

interface OrderManagerProps {
  userRole: 'admin' | 'manager' | 'staff';
}

const OrderManager: React.FC<OrderManagerProps> = ({ userRole }) => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerId: 'CUST001',
      customerInfo: {
        name: 'Marie Dupont',
        email: 'marie.dupont@email.com',
        phone: '06 12 34 56 78',
        address: '123 Rue de la Paix, 75001 Paris'
      },
      items: [
        {
          id: '1',
          name: 'Sashimi de saumon',
          description: 'Sashimi de saumon frais du jour',
          price: 8.50,
          category: 'sashimi',
          available: true,
          quantity: 2,
          selectedOptions: [
            {
              optionId: 'opt1',
              choiceIds: ['large']
            }
          ]
        }
      ],
      totalAmount: 20.50,
      deliveryType: 'delivery',
      deliveryAddress: '123 Rue de la Paix, 75001 Paris',
      deliveryTime: new Date(Date.now() + 45 * 60 * 1000),
      status: 'pending',
      paymentStatus: 'paid',
      createdAt: new Date(Date.now() - 10 * 60 * 1000),
      notes: 'Sans oignons svp',
      preparationTime: 30,
      guestCount: 2,
      guestNames: ['Marie', 'Pierre']
    },
    {
      id: 'ORD002',
      customerId: 'CUST002',
      customerInfo: {
        name: 'Jean Martin',
        email: 'jean.martin@email.com',
        phone: '06 98 76 54 32',
        address: '456 Avenue des Champs, 75008 Paris'
      },
      items: [
        {
          id: '2',
          name: 'Maki California',
          description: 'Maki inversé au saumon et avocat',
          price: 12.00,
          category: 'california',
          available: true,
          quantity: 1
        }
      ],
      totalAmount: 12.00,
      deliveryType: 'pickup',
      deliveryTime: new Date(Date.now() + 30 * 60 * 1000),
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date(Date.now() - 20 * 60 * 1000),
      preparationTime: 15,
      guestCount: 1
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<DeliveryType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Statistiques temps réel
  const stats = {
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0)
  };

  // Filtrage des commandes
  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesDeliveryType = selectedDeliveryType === 'all' || order.deliveryType === selectedDeliveryType;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerInfo.phone.includes(searchTerm);
    
    return matchesStatus && matchesDeliveryType && matchesSearch;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return Clock;
      case 'confirmed': return CheckCircle;
      case 'preparing': return Package;
      case 'ready': return Truck;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return AlertCircle;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date() }
        : order
    ));
  };

  const getTimeUntilDelivery = (deliveryTime: Date) => {
    const now = new Date();
    const diff = deliveryTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 0) return 'En retard';
    if (minutes === 0) return 'Maintenant';
    return `${minutes}min`;
  };

  const printOrder = (order: Order) => {
    // Simuler l'impression
    console.log('Impression de la commande:', order.id);
    // Ici on implementerait l'impression réelle
  };

  const canManageOrders = userRole === 'admin' || userRole === 'manager';

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">En attente</p>
              <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">En préparation</p>
              <p className="text-2xl font-bold text-orange-800">{stats.preparing}</p>
            </div>
            <Package className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Prêtes</p>
              <p className="text-2xl font-bold text-green-800">{stats.ready}</p>
            </div>
            <Truck className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Livrées</p>
              <p className="text-2xl font-bold text-blue-800">{stats.delivered}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Chiffre d'affaires</p>
              <p className="text-2xl font-bold text-red-800">{stats.totalRevenue.toFixed(2)}€</p>
            </div>
            <Euro className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par numéro, nom ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmée</option>
              <option value="preparing">En préparation</option>
              <option value="ready">Prête</option>
              <option value="delivered">Livrée</option>
              <option value="cancelled">Annulée</option>
            </select>

            <select
              value={selectedDeliveryType}
              onChange={(e) => setSelectedDeliveryType(e.target.value as DeliveryType | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">Tous les modes</option>
              <option value="delivery">Livraison</option>
              <option value="pickup">À emporter</option>
              <option value="dine_in">Sur place</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des commandes */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            
            return (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Informations principales */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-gray-900">#{order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        <StatusIcon className="w-3 h-3 inline mr-1" />
                        {order.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.deliveryType === 'delivery' ? 'bg-blue-100 text-blue-800' :
                        order.deliveryType === 'pickup' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {order.deliveryType === 'delivery' ? 'Livraison' :
                         order.deliveryType === 'pickup' ? 'À emporter' : 'Sur place'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <User className="w-4 h-4" />
                          <span className="font-medium">{order.customerInfo.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{order.customerInfo.phone}</span>
                        </div>
                        {order.deliveryType === 'delivery' && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{order.deliveryAddress}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">
                            Livraison: {getTimeUntilDelivery(order.deliveryTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Euro className="w-4 h-4" />
                          <span className="font-bold text-red-600">{order.totalAmount.toFixed(2)}€</span>
                        </div>
                        {order.guestCount && order.guestCount > 1 && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="w-4 h-4" />
                            <span className="text-sm">{order.guestCount} convives</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Articles de la commande */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, index) => (
                          <span
                            key={index}
                            className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-sm"
                          >
                            {item.quantity}x {item.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {order.notes && (
                      <div className="mt-2 flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                        <span className="text-sm text-gray-600 italic">{order.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    {canManageOrders && (
                      <>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Confirmer
                          </button>
                        )}
                        
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="w-full bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm"
                          >
                            En préparation
                          </button>
                        )}
                        
                        {order.status === 'preparing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="w-full bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Prête
                          </button>
                        )}
                        
                        {order.status === 'ready' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="w-full bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                          >
                            Livrée
                          </button>
                        )}
                      </>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex-1 flex items-center justify-center gap-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Voir</span>
                      </button>
                      <button
                        onClick={() => printOrder(order)}
                        className="flex items-center justify-center border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Modal de détail de commande */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={(e: React.MouseEvent) => e.target === e.currentTarget && setSelectedOrder(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Commande #{selectedOrder.id}</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Informations client */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Informations client</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">{selectedOrder.customerInfo.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-600" />
                        <span>{selectedOrder.customerInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-600" />
                        <span>{selectedOrder.customerInfo.email}</span>
                      </div>
                      {selectedOrder.deliveryType === 'delivery' && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                          <span>{selectedOrder.deliveryAddress}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Détails de la commande */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Détails de la commande</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Statut:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">
                          {selectedOrder.deliveryType === 'delivery' ? 'Livraison' :
                           selectedOrder.deliveryType === 'pickup' ? 'À emporter' : 'Sur place'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Heure de livraison:</span>
                        <span className="font-medium">{selectedOrder.deliveryTime.toLocaleTimeString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Montant total:</span>
                        <span className="font-bold text-red-600">{selectedOrder.totalAmount.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Articles commandés */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Articles commandés</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                          {item.selectedOptions && item.selectedOptions.length > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              Options sélectionnées
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{item.quantity}x {item.price.toFixed(2)}€</div>
                          <div className="text-sm text-gray-600">{(item.quantity * item.price).toFixed(2)}€</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-gray-700">{selectedOrder.notes}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => printOrder(selectedOrder)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimer</span>
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderManager;
