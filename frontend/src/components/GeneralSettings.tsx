import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Store, 
  Clock, 
  Share2, 
  Phone, 
  Search, 
  ShoppingCart,
  Truck,
  Printer,
  Save,
  Eye,
  Edit3,
  Globe,
  MapPin,
  Mail,
  Calendar
} from 'lucide-react';
import type { SiteSettings, RestaurantInfo, ContactInfo } from '../types/advanced';

interface GeneralSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  onSave: (settings: SiteSettings) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ 
  isOpen, 
  onClose, 
  settings,
  onSave 
}) => {
  const [activeTab, setActiveTab] = useState<string>('restaurant');
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
  const [isPreview, setIsPreview] = useState(false);

  const tabs = [
    { id: 'restaurant', name: 'Restaurant', icon: Store },
    { id: 'contact', name: 'Contact', icon: Phone },
    { id: 'hours', name: 'Horaires', icon: Clock },
    { id: 'social', name: 'Réseaux', icon: Share2 },
    { id: 'seo', name: 'Référencement', icon: Search },
    { id: 'ordering', name: 'Commandes', icon: ShoppingCart },
    { id: 'delivery', name: 'Livraison', icon: Truck },
    { id: 'printing', name: 'Impression', icon: Printer }
  ];

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const updateRestaurantInfo = (field: keyof RestaurantInfo, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      restaurantInfo: {
        ...prev.restaurantInfo,
        [field]: value
      }
    }));
  };

  const updateContactInfo = (field: keyof ContactInfo, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Configuration Générale</h2>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>{isPreview ? 'Éditer' : 'Aperçu'}</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder</span>
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <div className="flex h-[80vh]">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
              <div className="p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'restaurant' && (
                      <RestaurantInfoForm
                        info={localSettings.restaurantInfo}
                        onChange={updateRestaurantInfo}
                        isPreview={isPreview}
                      />
                    )}
                    
                    {activeTab === 'contact' && (
                      <ContactInfoForm
                        info={localSettings.contactInfo}
                        onChange={updateContactInfo}
                        isPreview={isPreview}
                      />
                    )}

                    {activeTab === 'hours' && (
                      <BusinessHoursForm
                        hours={localSettings.businessHours}
                        onChange={(hours) => setLocalSettings(prev => ({ ...prev, businessHours: hours }))}
                        isPreview={isPreview}
                      />
                    )}

                    {activeTab === 'social' && (
                      <SocialLinksForm
                        links={localSettings.socialLinks}
                        onChange={(links) => setLocalSettings(prev => ({ ...prev, socialLinks: links }))}
                        isPreview={isPreview}
                      />
                    )}

                    {activeTab === 'seo' && (
                      <SEOSettingsForm
                        seo={localSettings.seoSettings}
                        onChange={(seo) => setLocalSettings(prev => ({ ...prev, seoSettings: seo }))}
                        isPreview={isPreview}
                      />
                    )}

                    {activeTab === 'ordering' && (
                      <OrderingSettingsForm
                        ordering={localSettings.orderingSettings}
                        onChange={(ordering) => setLocalSettings(prev => ({ ...prev, orderingSettings: ordering }))}
                        isPreview={isPreview}
                      />
                    )}

                    {activeTab === 'delivery' && (
                      <DeliverySettingsForm
                        delivery={localSettings.deliverySettings}
                        onChange={(delivery) => setLocalSettings(prev => ({ ...prev, deliverySettings: delivery }))}
                        isPreview={isPreview}
                      />
                    )}

                    {activeTab === 'printing' && (
                      <PrintingSettingsForm
                        printing={localSettings.printingSettings}
                        onChange={(printing) => setLocalSettings(prev => ({ ...prev, printingSettings: printing }))}
                        isPreview={isPreview}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Sous-composant pour les informations du restaurant
const RestaurantInfoForm: React.FC<{
  info: RestaurantInfo;
  onChange: (field: keyof RestaurantInfo, value: any) => void;
  isPreview: boolean;
}> = ({ info, onChange, isPreview }) => {
  if (isPreview) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Aperçu - Informations Restaurant</h3>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
          <h4 className="text-3xl font-bold text-gray-900 mb-2">{info.name}</h4>
          <p className="text-lg text-gray-600 mb-4">{info.shortDescription}</p>
          <p className="text-gray-700">{info.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {info.cuisine.map((cuisine, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {cuisine}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 flex items-center">
        <Store className="w-6 h-6 mr-3 text-blue-600" />
        Informations Restaurant
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom du restaurant
          </label>
          <input
            type="text"
            value={info.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ô TOMO Sushi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description courte
          </label>
          <input
            type="text"
            value={info.shortDescription}
            onChange={(e) => onChange('shortDescription', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Restaurant japonais authentique"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description détaillée
          </label>
          <textarea
            value={info.description}
            onChange={(e) => onChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Découvrez l'authenticité de la cuisine japonaise..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Types de cuisine (séparés par des virgules)
          </label>
          <input
            type="text"
            value={info.cuisine.join(', ')}
            onChange={(e) => onChange('cuisine', e.target.value.split(',').map(s => s.trim()))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Japonais, Sushi, Izakaya"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gamme de prix
          </label>
          <select
            value={info.priceRange}
            onChange={(e) => onChange('priceRange', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="budget">Budget (€)</option>
            <option value="moderate">Modéré (€€)</option>
            <option value="expensive">Cher (€€€)</option>
            <option value="fine-dining">Gastronomique (€€€€)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capacité (nombre de places)
          </label>
          <input
            type="number"
            value={info.capacity}
            onChange={(e) => onChange('capacity', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Année de création
          </label>
          <input
            type="number"
            value={info.foundedYear || ''}
            onChange={(e) => onChange('foundedYear', parseInt(e.target.value) || undefined)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2020"
          />
        </div>
      </div>
    </div>
  );
};

// Sous-composant pour les informations de contact
const ContactInfoForm: React.FC<{
  info: ContactInfo;
  onChange: (field: keyof ContactInfo, value: any) => void;
  isPreview: boolean;
}> = ({ info, onChange, isPreview }) => {
  if (isPreview) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Aperçu - Informations Contact</h3>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl space-y-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">{info.address}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">{info.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">{info.email}</span>
          </div>
          {info.theForkUrl && (
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-green-600" />
              <a href={info.theForkUrl} className="text-blue-600 hover:underline">
                Réservation LaFourchette
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 flex items-center">
        <Phone className="w-6 h-6 mr-3 text-green-600" />
        Informations Contact
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse complète
          </label>
          <textarea
            value={info.address}
            onChange={(e) => onChange('address', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="123 Rue de la Paix, 13100 Aix-en-Provence"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone principal
          </label>
          <input
            type="tel"
            value={info.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="04 42 XX XX XX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email principal
          </label>
          <input
            type="email"
            value={info.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="contact@otomo-sushi.fr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitude GPS
          </label>
          <input
            type="number"
            step="0.000001"
            value={info.gpsCoordinates[0]}
            onChange={(e) => onChange('gpsCoordinates', [parseFloat(e.target.value) || 0, info.gpsCoordinates[1]])}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="43.529742"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitude GPS
          </label>
          <input
            type="number"
            step="0.000001"
            value={info.gpsCoordinates[1]}
            onChange={(e) => onChange('gpsCoordinates', [info.gpsCoordinates[0], parseFloat(e.target.value) || 0])}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="5.447427"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL LaFourchette
          </label>
          <input
            type="url"
            value={info.theForkUrl || ''}
            onChange={(e) => onChange('theForkUrl', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="https://www.lafourchette.com/restaurant/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone réservations
          </label>
          <input
            type="tel"
            value={info.reservationPhone || ''}
            onChange={(e) => onChange('reservationPhone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="04 42 XX XX XX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email traiteur
          </label>
          <input
            type="email"
            value={info.cateringEmail || ''}
            onChange={(e) => onChange('cateringEmail', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="traiteur@otomo-sushi.fr"
          />
        </div>
      </div>
    </div>
  );
};

// Placeholders pour les autres formulaires
const BusinessHoursForm: React.FC<any> = () => <div>Horaires - À implémenter</div>;
const SocialLinksForm: React.FC<any> = () => <div>Réseaux sociaux - À implémenter</div>;
const SEOSettingsForm: React.FC<any> = () => <div>Référencement - À implémenter</div>;
const OrderingSettingsForm: React.FC<any> = () => <div>Commandes - À implémenter</div>;
const DeliverySettingsForm: React.FC<any> = () => <div>Livraison - À implémenter</div>;
const PrintingSettingsForm: React.FC<any> = () => <div>Impression - À implémenter</div>;

export default GeneralSettings;
