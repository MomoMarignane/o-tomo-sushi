import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Clock, 
  AlertTriangle,
  Info,
  Star,
  Camera,
  Eye,
  EyeOff,
  Save,
  X,
  Image as ImageIcon
} from 'lucide-react';
import type { BannerMessage } from '../types/advanced';

interface AdvancedBannerManagerProps {
  isOpen: boolean;
  onClose: () => void;
  banners: BannerMessage[];
  onSave: (banners: BannerMessage[]) => void;
}

const AdvancedBannerManager: React.FC<AdvancedBannerManagerProps> = ({
  isOpen,
  onClose,
  banners,
  onSave
}) => {
  const [localBanners, setLocalBanners] = useState<BannerMessage[]>(banners);
  const [editingBanner, setEditingBanner] = useState<BannerMessage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | BannerMessage['type']>('all');

  const bannerTypes = [
    { id: 'permanent', name: 'Permanent', icon: Info, color: 'blue' },
    { id: 'temporary', name: 'Temporaire', icon: Clock, color: 'amber' },
    { id: 'daily-special', name: 'Plat du jour', icon: Star, color: 'green' },
    { id: 'holiday', name: 'Congés/Événement', icon: AlertTriangle, color: 'red' }
  ] as const;

  const createNewBanner = () => {
    const newBanner: BannerMessage = {
      id: `banner-${Date.now()}`,
      text: '',
      type: 'permanent',
      active: true,
      priority: 50,
      startDate: new Date(),
      displayDuration: 6,
      targetAudience: 'all'
    };
    setEditingBanner(newBanner);
    setIsCreating(true);
  };

  const saveBanner = (banner: BannerMessage) => {
    if (isCreating) {
      setLocalBanners(prev => [...prev, banner]);
    } else {
      setLocalBanners(prev => prev.map(b => b.id === banner.id ? banner : b));
    }
    setEditingBanner(null);
    setIsCreating(false);
  };

  const deleteBanner = (id: string) => {
    setLocalBanners(prev => prev.filter(b => b.id !== id));
  };

  const toggleBannerStatus = (id: string) => {
    setLocalBanners(prev => prev.map(b => 
      b.id === id ? { ...b, active: !b.active } : b
    ));
  };

  const handleSave = () => {
    onSave(localBanners);
    onClose();
  };

  const filteredBanners = selectedType === 'all' 
    ? localBanners 
    : localBanners.filter(banner => banner.type === selectedType);

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
          <div className="bg-gradient-to-r from-purple-900 to-indigo-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Camera className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Gestion des Bannières</h2>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={createNewBanner}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle bannière</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder</span>
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

          <div className="flex h-[80vh]">
            {/* Sidebar avec filtres */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
              <div className="p-4 space-y-4">
                <h3 className="font-semibold text-gray-900">Types de bannières</h3>
                
                <button
                  onClick={() => setSelectedType('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedType === 'all' 
                      ? 'bg-purple-100 text-purple-800 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Toutes ({localBanners.length})
                </button>

                {bannerTypes.map((type) => {
                  const Icon = type.icon;
                  const count = localBanners.filter(b => b.type === type.id).length;
                  
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        selectedType === type.id
                          ? `bg-${type.color}-100 text-${type.color}-800 font-medium`
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{type.name}</span>
                      <span className="ml-auto text-sm">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Liste des bannières */}
                <div className="space-y-4">
                  {filteredBanners.map((banner) => (
                    <BannerCard
                      key={banner.id}
                      banner={banner}
                      onEdit={() => setEditingBanner(banner)}
                      onDelete={() => deleteBanner(banner.id)}
                      onToggleStatus={() => toggleBannerStatus(banner.id)}
                    />
                  ))}

                  {filteredBanners.length === 0 && (
                    <div className="text-center py-12">
                      <Camera className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Aucune bannière
                      </h3>
                      <p className="text-gray-500 mb-4">
                        {selectedType === 'all' 
                          ? 'Commencez par créer votre première bannière'
                          : `Aucune bannière de type ${bannerTypes.find(t => t.id === selectedType)?.name}`
                        }
                      </p>
                      <button
                        onClick={createNewBanner}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Créer une bannière</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal d'édition */}
      {editingBanner && (
        <BannerEditModal
          banner={editingBanner}
          isCreating={isCreating}
          onSave={saveBanner}
          onCancel={() => {
            setEditingBanner(null);
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
};

// Composant pour une carte de bannière
const BannerCard: React.FC<{
  banner: BannerMessage;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}> = ({ banner, onEdit, onDelete, onToggleStatus }) => {
  const getTypeConfig = (type: BannerMessage['type']) => {
    const configs = {
      'permanent': { color: 'blue', icon: Info, label: 'Permanent' },
      'temporary': { color: 'amber', icon: Clock, label: 'Temporaire' },
      'daily-special': { color: 'green', icon: Star, label: 'Plat du jour' },
      'holiday': { color: 'red', icon: AlertTriangle, label: 'Congés/Événement' }
    };
    return configs[type];
  };

  const typeConfig = getTypeConfig(banner.type);
  const Icon = typeConfig.icon;

  const getPriorityColor = (priority: number) => {
    if (priority >= 90) return 'red';
    if (priority >= 70) return 'amber';
    return 'blue';
  };

  const priorityColor = getPriorityColor(banner.priority);

  return (
    <motion.div
      layout
      className={`p-4 border-2 rounded-xl transition-all ${
        banner.active 
          ? 'border-gray-200 bg-white shadow-sm' 
          : 'border-gray-100 bg-gray-50 opacity-60'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          {/* Header avec type et priorité */}
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-${typeConfig.color}-100 text-${typeConfig.color}-800`}>
              <Icon className="w-3 h-3" />
              <span>{typeConfig.label}</span>
            </span>
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${priorityColor}-100 text-${priorityColor}-800`}>
              Priorité {banner.priority}
            </span>

            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              banner.active 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {banner.active ? 'Actif' : 'Inactif'}
            </span>
          </div>

          {/* Contenu */}
          <div className="space-y-2">
            <p className="text-gray-900 font-medium line-clamp-2">
              {banner.text || 'Texte de la bannière...'}
            </p>
            
            {banner.image && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ImageIcon className="w-4 h-4" />
                <span>Image attachée</span>
              </div>
            )}

            {/* Dates */}
            {(banner.startDate || banner.endDate) && (
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {banner.startDate && (
                  <span>Du {banner.startDate.toLocaleDateString()}</span>
                )}
                {banner.endDate && (
                  <span>Au {banner.endDate.toLocaleDateString()}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={onToggleStatus}
            className={`p-2 rounded-lg transition-colors ${
              banner.active
                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
            title={banner.active ? 'Désactiver' : 'Activer'}
          >
            {banner.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
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

// Modal d'édition de bannière
const BannerEditModal: React.FC<{
  banner: BannerMessage;
  isCreating: boolean;
  onSave: (banner: BannerMessage) => void;
  onCancel: () => void;
}> = ({ banner, isCreating, onSave, onCancel }) => {
  const [formData, setFormData] = useState<BannerMessage>(banner);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulation d'upload - en production, upload vers un service
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ 
        ...prev, 
        image: imageUrl,
        imageAlt: file.name 
      }));
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white">
            {isCreating ? 'Nouvelle bannière' : 'Modifier la bannière'}
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Type de bannière */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de bannière
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as BannerMessage['type'] }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="permanent">Permanent</option>
              <option value="temporary">Temporaire</option>
              <option value="daily-special">Plat du jour</option>
              <option value="holiday">Congés/Événement</option>
            </select>
          </div>

          {/* Texte */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texte de la bannière
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Écrivez le message de votre bannière..."
            />
          </div>

          {/* Upload d'image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image (optionnel)
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Choisir une image</span>
              </button>
              
              {formData.image && (
                <div className="flex items-center space-x-2">
                  <img 
                    src={formData.image} 
                    alt={formData.imageAlt}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, image: undefined, imageAlt: undefined }))}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Priorité */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priorité (1-100)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) || 50 }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              90+ = Rouge (urgent), 70+ = Orange (important), 50+ = Bleu (informatif)
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début
              </label>
              <input
                type="datetime-local"
                value={formData.startDate?.toISOString().slice(0, 16) || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  startDate: e.target.value ? new Date(e.target.value) : undefined 
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin
              </label>
              <input
                type="datetime-local"
                value={formData.endDate?.toISOString().slice(0, 16) || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  endDate: e.target.value ? new Date(e.target.value) : undefined 
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
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
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              {isCreating ? 'Créer' : 'Sauvegarder'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedBannerManager;
