import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Plus, 
  Edit, 
  Trash2,
  Clock,
  Truck,
  DollarSign,
  Map,
  Save,
  X,
  AlertCircle,
  Zap,
  Timer,
  Euro
} from 'lucide-react';

interface DeliveryZoneManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Types pour les zones de livraison
interface DeliveryZone {
  id: string;
  name: string;
  description?: string;
  coordinates: Array<{ lat: number; lng: number }>;
  isActive: boolean;
  deliveryFee: number;
  freeDeliveryThreshold?: number;
  estimatedTime: {
    min: number;
    max: number;
  };
  maxDistance: number;
  priority: number;
  restrictions: {
    minOrderAmount?: number;
    maxOrderAmount?: number;
    allowedDays: number[]; // 0 = dimanche, 1 = lundi, etc.
    timeSlots: Array<{
      start: string;
      end: string;
    }>;
  };
  specialRates: Array<{
    condition: string;
    fee: number;
    description: string;
  }>;
}

const DeliveryZoneManager: React.FC<DeliveryZoneManagerProps> = ({ isOpen, onClose }) => {
  const [zones, setZones] = useState<DeliveryZone[]>([
    {
      id: 'zone-1',
      name: 'Centre-ville',
      description: 'Zone premium du centre-ville',
      coordinates: [],
      isActive: true,
      deliveryFee: 3.50,
      freeDeliveryThreshold: 25,
      estimatedTime: { min: 20, max: 35 },
      maxDistance: 3,
      priority: 1,
      restrictions: {
        minOrderAmount: 15,
        allowedDays: [1, 2, 3, 4, 5, 6, 0],
        timeSlots: [
          { start: '11:30', end: '14:30' },
          { start: '18:30', end: '22:00' }
        ]
      },
      specialRates: [
        {
          condition: 'Commande > 50€',
          fee: 0,
          description: 'Livraison gratuite'
        }
      ]
    },
    {
      id: 'zone-2',
      name: 'Banlieue proche',
      description: 'Zones résidentielles proches',
      coordinates: [],
      isActive: true,
      deliveryFee: 4.90,
      freeDeliveryThreshold: 35,
      estimatedTime: { min: 30, max: 50 },
      maxDistance: 8,
      priority: 2,
      restrictions: {
        minOrderAmount: 20,
        allowedDays: [1, 2, 3, 4, 5, 6, 0],
        timeSlots: [
          { start: '11:30', end: '14:00' },
          { start: '19:00', end: '21:30' }
        ]
      },
      specialRates: []
    },
    {
      id: 'zone-3',
      name: 'Zone étendue',
      description: 'Livraisons exceptionnelles',
      coordinates: [],
      isActive: false,
      deliveryFee: 7.50,
      freeDeliveryThreshold: 50,
      estimatedTime: { min: 45, max: 70 },
      maxDistance: 15,
      priority: 3,
      restrictions: {
        minOrderAmount: 30,
        allowedDays: [5, 6, 0], // Vendredi, samedi, dimanche seulement
        timeSlots: [
          { start: '19:00', end: '21:00' }
        ]
      },
      specialRates: [
        {
          condition: 'Weekend',
          fee: 9,
          description: 'Supplément weekend'
        }
      ]
    }
  ]);

  const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedView, setSelectedView] = useState<'list' | 'map'>('list');

  const createNewZone = () => {
    const newZone: DeliveryZone = {
      id: `zone-${Date.now()}`,
      name: '',
      coordinates: [],
      isActive: true,
      deliveryFee: 4.50,
      estimatedTime: { min: 30, max: 45 },
      maxDistance: 5,
      priority: zones.length + 1,
      restrictions: {
        allowedDays: [1, 2, 3, 4, 5, 6, 0],
        timeSlots: [
          { start: '11:30', end: '14:30' },
          { start: '18:30', end: '22:00' }
        ]
      },
      specialRates: []
    };
    setEditingZone(newZone);
    setIsCreating(true);
  };

  const saveZone = (zone: DeliveryZone) => {
    if (isCreating) {
      setZones(prev => [...prev, zone]);
    } else {
      setZones(prev => prev.map(z => z.id === zone.id ? zone : z));
    }
    setEditingZone(null);
    setIsCreating(false);
  };

  const deleteZone = (id: string) => {
    setZones(prev => prev.filter(z => z.id !== id));
  };

  const toggleZoneStatus = (id: string) => {
    setZones(prev => prev.map(z => 
      z.id === id ? { ...z, isActive: !z.isActive } : z
    ));
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
          <div className="bg-gradient-to-r from-blue-900 to-indigo-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Zones de Livraison</h2>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex bg-white/20 rounded-lg p-1">
                  <button
                    onClick={() => setSelectedView('list')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedView === 'list' 
                        ? 'bg-white text-blue-900' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Liste
                  </button>
                  <button
                    onClick={() => setSelectedView('map')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedView === 'map' 
                        ? 'bg-white text-blue-900' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Carte
                  </button>
                </div>
                <button
                  onClick={createNewZone}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle zone</span>
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="h-[85vh]">
            {selectedView === 'list' ? (
              <ZoneListView 
                zones={zones}
                onEdit={setEditingZone}
                onDelete={deleteZone}
                onToggleStatus={toggleZoneStatus}
              />
            ) : (
              <ZoneMapView zones={zones} />
            )}
          </div>

          {/* Modal d'édition */}
          {editingZone && (
            <ZoneEditModal
              zone={editingZone}
              isCreating={isCreating}
              onSave={saveZone}
              onCancel={() => {
                setEditingZone(null);
                setIsCreating(false);
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Vue liste des zones
const ZoneListView: React.FC<{
  zones: DeliveryZone[];
  onEdit: (zone: DeliveryZone) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}> = ({ zones, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="space-y-4">
        {zones.map((zone) => (
          <ZoneCard
            key={zone.id}
            zone={zone}
            onEdit={() => onEdit(zone)}
            onDelete={() => onDelete(zone.id)}
            onToggleStatus={() => onToggleStatus(zone.id)}
          />
        ))}

        {zones.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune zone de livraison
            </h3>
            <p className="text-gray-500">
              Commencez par créer votre première zone de livraison
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Vue carte (simulation)
const ZoneMapView: React.FC<{ zones: DeliveryZone[] }> = ({ zones }) => {
  return (
    <div className="p-6 h-full">
      <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-4">
          <Map className="w-16 h-16 text-gray-400 mx-auto" />
          <h3 className="text-xl font-medium text-gray-600">Vue Carte Interactive</h3>
          <p className="text-gray-500 max-w-md">
            Ici s'afficherait une carte interactive pour visualiser et modifier graphiquement les zones de livraison
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {zones.map((zone) => (
              <div key={zone.id} className="p-3 bg-white rounded-lg shadow">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    zone.isActive ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span className="font-medium">{zone.name}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {zone.deliveryFee}€ • {zone.estimatedTime.min}-{zone.estimatedTime.max} min
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Carte de zone
const ZoneCard: React.FC<{
  zone: DeliveryZone;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}> = ({ zone, onEdit, onDelete, onToggleStatus }) => {
  const getPriorityColor = (priority: number) => {
    if (priority === 1) return 'green';
    if (priority === 2) return 'blue';
    return 'orange';
  };

  const priorityColor = getPriorityColor(zone.priority);

  const getDayName = (day: number) => {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    return days[day];
  };

  return (
    <motion.div
      layout
      className={`p-6 border-2 rounded-xl transition-all ${
        zone.isActive 
          ? 'border-gray-200 bg-white shadow-sm' 
          : 'border-gray-100 bg-gray-50 opacity-60'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-bold text-gray-900">{zone.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${priorityColor}-100 text-${priorityColor}-800`}>
              Priorité {zone.priority}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              zone.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {zone.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>

          {zone.description && (
            <p className="text-gray-600">{zone.description}</p>
          )}

          {/* Informations principales */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div>
                <div className="text-sm font-medium">{zone.deliveryFee}€</div>
                <div className="text-xs text-gray-500">Livraison</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-sm font-medium">
                  {zone.estimatedTime.min}-{zone.estimatedTime.max} min
                </div>
                <div className="text-xs text-gray-500">Délai</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              <div>
                <div className="text-sm font-medium">{zone.maxDistance} km</div>
                <div className="text-xs text-gray-500">Distance max</div>
              </div>
            </div>

            {zone.freeDeliveryThreshold && (
              <div className="flex items-center space-x-2">
                <Euro className="w-4 h-4 text-orange-600" />
                <div>
                  <div className="text-sm font-medium">{zone.freeDeliveryThreshold}€</div>
                  <div className="text-xs text-gray-500">Gratuit dès</div>
                </div>
              </div>
            )}
          </div>

          {/* Restrictions */}
          <div className="space-y-2">
            {zone.restrictions.minOrderAmount && (
              <div className="flex items-center space-x-2 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span className="text-gray-600">
                  Commande minimum: {zone.restrictions.minOrderAmount}€
                </span>
              </div>
            )}

            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600">
                Jours: {zone.restrictions.allowedDays.map(getDayName).join(', ')}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <Truck className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">
                Horaires: {zone.restrictions.timeSlots.map(slot => 
                  `${slot.start}-${slot.end}`
                ).join(', ')}
              </span>
            </div>
          </div>

          {/* Tarifs spéciaux */}
          {zone.specialRates.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Tarifs spéciaux:</h4>
              {zone.specialRates.map((rate, index) => (
                <div key={index} className="p-2 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium">{rate.condition}</span>
                    <span className="text-sm text-yellow-700">{rate.fee}€</span>
                  </div>
                  <p className="text-xs text-gray-600 ml-6">{rate.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={onToggleStatus}
            className={`p-2 rounded-lg transition-colors ${
              zone.isActive
                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
            title={zone.isActive ? 'Désactiver' : 'Activer'}
          >
            <MapPin className="w-4 h-4" />
          </button>
          
          <button
            onClick={onEdit}
            className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
            title="Modifier"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={onDelete}
            className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Modal d'édition de zone
const ZoneEditModal: React.FC<{
  zone: DeliveryZone;
  isCreating: boolean;
  onSave: (zone: DeliveryZone) => void;
  onCancel: () => void;
}> = ({ zone, isCreating, onSave, onCancel }) => {
  const [formData, setFormData] = useState<DeliveryZone>(zone);

  const addTimeSlot = () => {
    setFormData(prev => ({
      ...prev,
      restrictions: {
        ...prev.restrictions,
        timeSlots: [...prev.restrictions.timeSlots, { start: '12:00', end: '14:00' }]
      }
    }));
  };

  const removeTimeSlot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      restrictions: {
        ...prev.restrictions,
        timeSlots: prev.restrictions.timeSlots.filter((_, i) => i !== index)
      }
    }));
  };

  const toggleDay = (day: number) => {
    setFormData(prev => ({
      ...prev,
      restrictions: {
        ...prev.restrictions,
        allowedDays: prev.restrictions.allowedDays.includes(day)
          ? prev.restrictions.allowedDays.filter(d => d !== day)
          : [...prev.restrictions.allowedDays, day].sort()
      }
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white">
            {isCreating ? 'Nouvelle zone de livraison' : 'Modifier la zone'}
          </h3>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Informations de base */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la zone *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Centre-ville"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priorité
              </label>
              <input
                type="number"
                min="1"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Description de la zone..."
            />
          </div>

          {/* Tarification */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frais de livraison (€)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.deliveryFee}
                onChange={(e) => setFormData(prev => ({ ...prev, deliveryFee: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gratuit dès (€)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.freeDeliveryThreshold || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  freeDeliveryThreshold: e.target.value ? parseFloat(e.target.value) : undefined 
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance max (km)
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxDistance}
                onChange={(e) => setFormData(prev => ({ ...prev, maxDistance: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Délais de livraison */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Délai minimum (min)
              </label>
              <input
                type="number"
                min="1"
                value={formData.estimatedTime.min}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  estimatedTime: { ...prev.estimatedTime, min: parseInt(e.target.value) || 1 }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Délai maximum (min)
              </label>
              <input
                type="number"
                min="1"
                value={formData.estimatedTime.max}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  estimatedTime: { ...prev.estimatedTime, max: parseInt(e.target.value) || 1 }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Restrictions */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Restrictions</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commande minimum (€)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.restrictions.minOrderAmount || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  restrictions: {
                    ...prev.restrictions,
                    minOrderAmount: e.target.value ? parseFloat(e.target.value) : undefined
                  }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Jours de la semaine */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Jours de livraison
              </label>
              <div className="flex space-x-2">
                {days.map((day, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleDay(index)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.restrictions.allowedDays.includes(index)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Créneaux horaires */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Créneaux horaires
                </label>
                <button
                  type="button"
                  onClick={addTimeSlot}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
              </div>
              
              <div className="space-y-2">
                {formData.restrictions.timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="time"
                      value={slot.start}
                      onChange={(e) => {
                        const newSlots = [...formData.restrictions.timeSlots];
                        newSlots[index] = { ...newSlots[index], start: e.target.value };
                        setFormData(prev => ({
                          ...prev,
                          restrictions: { ...prev.restrictions, timeSlots: newSlots }
                        }));
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">à</span>
                    <input
                      type="time"
                      value={slot.end}
                      onChange={(e) => {
                        const newSlots = [...formData.restrictions.timeSlots];
                        newSlots[index] = { ...newSlots[index], end: e.target.value };
                        setFormData(prev => ({
                          ...prev,
                          restrictions: { ...prev.restrictions, timeSlots: newSlots }
                        }));
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(index)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isCreating ? 'Créer' : 'Sauvegarder'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeliveryZoneManager;
