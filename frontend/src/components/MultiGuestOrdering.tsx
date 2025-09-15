import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  CreditCard,
  Split,
  UserPlus,
  X,
  DollarSign,
  AlertCircle,
  Trash2,
  Share2
} from 'lucide-react';

interface MultiGuestOrderingProps {
  isOpen: boolean;
  onClose: () => void;
}

// Types pour la gestion multi-invités
interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  items: OrderItem[];
  total: number;
  paymentMethod: 'separate' | 'host-pays' | 'split-equal';
  status: 'selecting' | 'confirmed' | 'paid';
  joinedAt: Date;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
  specialInstructions?: string;
}

interface GroupOrder {
  id: string;
  hostName: string;
  restaurantTable?: string;
  createdAt: Date;
  status: 'open' | 'ordering' | 'confirmed' | 'completed';
  guests: Guest[];
  totalAmount: number;
  paymentMode: 'individual' | 'split-equal' | 'host-pays-all';
  deliveryAddress?: string;
  scheduledTime?: Date;
}

const MultiGuestOrdering: React.FC<MultiGuestOrderingProps> = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState<'create' | 'join' | 'manage'>('create');
  const [groupOrder, setGroupOrder] = useState<GroupOrder | null>(null);
  const [inviteCode, setInviteCode] = useState('');
  const [newGuestName, setNewGuestName] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<string | null>(null);

  // Données d'exemple pour la démo
  const sampleMenuItems = [
    { id: '1', name: 'Sushi Saumon (6 pcs)', price: 12.90, category: 'Sushi' },
    { id: '2', name: 'Maki California (8 pcs)', price: 8.50, category: 'Maki' },
    { id: '3', name: 'Chirashi Saumon', price: 16.90, category: 'Chirashi' },
    { id: '4', name: 'Soupe Miso', price: 4.50, category: 'Entrées' },
    { id: '5', name: 'Gyoza (5 pcs)', price: 7.90, category: 'Entrées' }
  ];

  // Créer une nouvelle commande de groupe
  const createGroupOrder = (hostName: string, paymentMode: GroupOrder['paymentMode']) => {
    const newOrder: GroupOrder = {
      id: `order-${Date.now()}`,
      hostName,
      createdAt: new Date(),
      status: 'open',
      guests: [],
      totalAmount: 0,
      paymentMode
    };
    setGroupOrder(newOrder);
    setCurrentView('manage');
  };

  // Ajouter un invité
  const addGuest = (name: string, email?: string, phone?: string) => {
    if (!groupOrder) return;

    const newGuest: Guest = {
      id: `guest-${Date.now()}`,
      name,
      email,
      phone,
      items: [],
      total: 0,
      paymentMethod: groupOrder.paymentMode === 'host-pays-all' ? 'host-pays' : 'separate',
      status: 'selecting',
      joinedAt: new Date()
    };

    setGroupOrder({
      ...groupOrder,
      guests: [...groupOrder.guests, newGuest]
    });
    setNewGuestName('');
  };

  // Ajouter un article à un invité
  const addItemToGuest = (guestId: string, item: OrderItem) => {
    if (!groupOrder) return;

    setGroupOrder({
      ...groupOrder,
      guests: groupOrder.guests.map(guest =>
        guest.id === guestId
          ? {
              ...guest,
              items: [...guest.items, item],
              total: guest.total + (item.price * item.quantity)
            }
          : guest
      ),
      totalAmount: groupOrder.totalAmount + (item.price * item.quantity)
    });
  };

  // Supprimer un invité
  const removeGuest = (guestId: string) => {
    if (!groupOrder) return;

    const guestToRemove = groupOrder.guests.find(g => g.id === guestId);
    if (!guestToRemove) return;

    setGroupOrder({
      ...groupOrder,
      guests: groupOrder.guests.filter(g => g.id !== guestId),
      totalAmount: groupOrder.totalAmount - guestToRemove.total
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900 to-pink-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Commande Multi-Invités</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="h-[85vh] overflow-y-auto">
            {currentView === 'create' && (
              <CreateOrderView 
                onCreateOrder={createGroupOrder}
                onSwitchToJoin={() => setCurrentView('join')}
              />
            )}
            
            {currentView === 'join' && (
              <JoinOrderView 
                inviteCode={inviteCode}
                onInviteCodeChange={setInviteCode}
                onSwitchToCreate={() => setCurrentView('create')}
              />
            )}
            
            {currentView === 'manage' && groupOrder && (
              <ManageOrderView 
                groupOrder={groupOrder}
                onAddGuest={addGuest}
                onRemoveGuest={removeGuest}
                onAddItem={addItemToGuest}
                menuItems={sampleMenuItems}
                newGuestName={newGuestName}
                onNewGuestNameChange={setNewGuestName}
                selectedGuest={selectedGuest}
                onSelectGuest={setSelectedGuest}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Vue de création de commande
const CreateOrderView: React.FC<{
  onCreateOrder: (hostName: string, paymentMode: GroupOrder['paymentMode']) => void;
  onSwitchToJoin: () => void;
}> = ({ onCreateOrder, onSwitchToJoin }) => {
  const [hostName, setHostName] = useState('');
  const [paymentMode, setPaymentMode] = useState<GroupOrder['paymentMode']>('individual');
  const [tableNumber, setTableNumber] = useState('');

  const paymentModes = [
    {
      id: 'individual',
      name: 'Paiement Individuel',
      description: 'Chaque invité paie ses propres articles',
      icon: CreditCard,
      color: 'blue'
    },
    {
      id: 'split-equal',
      name: 'Partage Équitable',
      description: 'Le total est divisé également entre tous',
      icon: Split,
      color: 'green'
    },
    {
      id: 'host-pays-all',
      name: 'Hôte Paie Tout',
      description: 'L\'organisateur paie pour tous les invités',
      icon: DollarSign,
      color: 'purple'
    }
  ] as const;

  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <Users className="w-16 h-16 text-purple-600 mx-auto" />
        <h3 className="text-2xl font-bold text-gray-900">Créer une Commande de Groupe</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Organisez une commande partagée avec vos amis, collègues ou famille
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Informations de base */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Votre nom (organisateur) *
            </label>
            <input
              type="text"
              required
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ex: Marie Dupont"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro de table (optionnel)
            </label>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ex: Table 12"
            />
          </div>
        </div>

        {/* Mode de paiement */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Mode de paiement *
          </label>
          <div className="space-y-3">
            {paymentModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <label
                  key={mode.id}
                  className={`flex items-start space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMode === mode.id
                      ? `border-${mode.color}-500 bg-${mode.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMode"
                    value={mode.id}
                    checked={paymentMode === mode.id}
                    onChange={(e) => setPaymentMode(e.target.value as GroupOrder['paymentMode'])}
                    className={`mt-1 w-4 h-4 text-${mode.color}-600`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-5 h-5 text-${mode.color}-600`} />
                      <span className="font-medium text-gray-900">{mode.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{mode.description}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => onCreateOrder(hostName, paymentMode)}
            disabled={!hostName.trim()}
            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
          >
            Créer la commande de groupe
          </button>
          
          <button
            onClick={onSwitchToJoin}
            className="w-full px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
          >
            Rejoindre une commande existante
          </button>
        </div>
      </div>
    </div>
  );
};

// Vue pour rejoindre une commande
const JoinOrderView: React.FC<{
  inviteCode: string;
  onInviteCodeChange: (code: string) => void;
  onSwitchToCreate: () => void;
}> = ({ inviteCode, onInviteCodeChange, onSwitchToCreate }) => {
  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <UserPlus className="w-16 h-16 text-green-600 mx-auto" />
        <h3 className="text-2xl font-bold text-gray-900">Rejoindre une Commande</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Saisissez le code d'invitation partagé par l'organisateur
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code d'invitation
          </label>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => onInviteCodeChange(e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg font-mono"
            placeholder="ABC123"
            maxLength={6}
          />
        </div>

        <div className="space-y-3">
          <button
            disabled={inviteCode.length < 6}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
          >
            Rejoindre la commande
          </button>
          
          <button
            onClick={onSwitchToCreate}
            className="w-full px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
          >
            Créer une nouvelle commande
          </button>
        </div>

        {/* Info aide */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Code d'invitation</h4>
              <p className="text-sm text-blue-700 mt-1">
                Le code est composé de 6 caractères alphanumériques fourni par l'organisateur de la commande.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Vue de gestion de commande
const ManageOrderView: React.FC<{
  groupOrder: GroupOrder;
  onAddGuest: (name: string, email?: string, phone?: string) => void;
  onRemoveGuest: (guestId: string) => void;
  onAddItem: (guestId: string, item: OrderItem) => void;
  menuItems: Array<{ id: string; name: string; price: number; category: string }>;
  newGuestName: string;
  onNewGuestNameChange: (name: string) => void;
  selectedGuest: string | null;
  onSelectGuest: (guestId: string | null) => void;
}> = ({ 
  groupOrder, 
  onAddGuest, 
  onRemoveGuest, 
  onAddItem, 
  menuItems, 
  newGuestName, 
  onNewGuestNameChange,
  selectedGuest,
  onSelectGuest
}) => {
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const inviteCode = `${groupOrder.id.slice(-6).toUpperCase()}`;

  const addGuestAndClose = () => {
    if (newGuestName.trim()) {
      onAddGuest(newGuestName.trim(), guestEmail.trim() || undefined);
      setShowAddGuest(false);
      setGuestEmail('');
    }
  };

  const addItemToSelectedGuest = (menuItem: any) => {
    if (!selectedGuest) return;
    
    const orderItem: OrderItem = {
      id: `item-${Date.now()}`,
      name: menuItem.name,
      price: menuItem.price,
      quantity: 1
    };
    
    onAddItem(selectedGuest, orderItem);
    setShowMenu(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header avec infos commande */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Commande de {groupOrder.hostName}
            </h3>
            <p className="text-gray-600">
              Créée le {groupOrder.createdAt.toLocaleDateString()} à {groupOrder.createdAt.toLocaleTimeString()}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                {groupOrder.guests.length} invité{groupOrder.guests.length > 1 ? 's' : ''}
              </span>
              <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                Total: {groupOrder.totalAmount.toFixed(2)}€
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="mb-2">
              <span className="text-sm text-gray-600">Code d'invitation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-mono font-bold text-purple-600 bg-white px-3 py-1 rounded-lg border">
                {inviteCode}
              </span>
              <button
                className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                title="Partager le code"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des invités */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-gray-900">Invités</h4>
            <button
              onClick={() => setShowAddGuest(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un invité</span>
            </button>
          </div>

          <div className="space-y-3">
            {groupOrder.guests.map((guest) => (
              <GuestCard
                key={guest.id}
                guest={guest}
                isSelected={selectedGuest === guest.id}
                onSelect={() => onSelectGuest(guest.id)}
                onRemove={() => onRemoveGuest(guest.id)}
                onAddItem={() => {
                  onSelectGuest(guest.id);
                  setShowMenu(true);
                }}
              />
            ))}

            {groupOrder.guests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Aucun invité pour le moment</p>
                <p className="text-sm">Commencez par ajouter des invités à votre commande</p>
              </div>
            )}
          </div>
        </div>

        {/* Résumé de commande */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Résumé de la commande</h4>
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            {groupOrder.guests.map((guest) => (
              guest.items.length > 0 && (
                <div key={guest.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="font-medium text-gray-900 mb-2">{guest.name}</div>
                  <div className="space-y-1">
                    {guest.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">
                          {(item.price * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-right mt-2 font-medium text-purple-600">
                    Sous-total: {guest.total.toFixed(2)}€
                  </div>
                </div>
              )
            ))}
            
            <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
              <span className="text-lg font-bold text-gray-900">Total général:</span>
              <span className="text-xl font-bold text-purple-600">
                {groupOrder.totalAmount.toFixed(2)}€
              </span>
            </div>
          </div>

          <button className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
            Finaliser la commande
          </button>
        </div>
      </div>

      {/* Modal d'ajout d'invité */}
      <AnimatePresence>
        {showAddGuest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-xl p-6 space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-900">Ajouter un invité</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={newGuestName}
                    onChange={(e) => onNewGuestNameChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Nom de l'invité"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (optionnel)
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="email@exemple.com"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddGuest(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={addGuestAndClose}
                  disabled={!newGuestName.trim()}
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de menu */}
      <AnimatePresence>
        {showMenu && selectedGuest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Ajouter un plat pour {groupOrder.guests.find(g => g.id === selectedGuest)?.name}
                </h3>
                <button
                  onClick={() => setShowMenu(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => addItemToSelectedGuest(item)}
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-purple-600">{item.price.toFixed(2)}€</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Composant carte d'invité
const GuestCard: React.FC<{
  guest: Guest;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onAddItem: () => void;
}> = ({ guest, isSelected, onSelect, onRemove, onAddItem }) => {
  const getStatusColor = (status: Guest['status']) => {
    switch (status) {
      case 'selecting': return 'blue';
      case 'confirmed': return 'green';
      case 'paid': return 'purple';
      default: return 'gray';
    }
  };

  const statusColor = getStatusColor(guest.status);

  return (
    <motion.div
      layout
      className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
        isSelected 
          ? 'border-purple-500 bg-purple-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h4 className="font-medium text-gray-900">{guest.name}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${statusColor}-100 text-${statusColor}-800`}>
              {guest.status === 'selecting' && 'En sélection'}
              {guest.status === 'confirmed' && 'Confirmé'}
              {guest.status === 'paid' && 'Payé'}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <span>{guest.items.length} article{guest.items.length > 1 ? 's' : ''}</span>
            <span className="font-medium text-purple-600">{guest.total.toFixed(2)}€</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddItem();
            }}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title="Ajouter un plat"
          >
            <Plus className="w-4 h-4" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title="Supprimer l'invité"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MultiGuestOrdering;
