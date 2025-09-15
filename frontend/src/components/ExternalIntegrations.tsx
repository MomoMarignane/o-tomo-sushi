import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Phone, 
  Map,
  MessageCircle,
  Calendar,
  Instagram,
  Facebook,
  Star,
  MapPin,
  Check,
  X
} from 'lucide-react';

interface ExternalIntegrationsProps {
  isOpen: boolean;
  onClose: () => void;
}

// Types pour les intégrations
interface TheForkReservation {
  restaurantId: string;
  widgetUrl: string;
  minPartySize: number;
  maxPartySize: number;
  advanceBookingDays: number;
  timeSlots: string[];
}

interface SocialMediaConfig {
  platform: 'instagram' | 'facebook' | 'tripadvisor' | 'yelp';
  url: string;
  displayReviews: boolean;
  reviewsCount: number;
  averageRating: number;
}

interface GPSIntegration {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  wazeUrl: string;
  appleMapsUrl: string;
}

const ExternalIntegrations: React.FC<ExternalIntegrationsProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'gps' | 'phone' | 'thefork' | 'social'>('gps');
  
  // État pour TheFork
  const [theForkConfig, setTheForkConfig] = useState<TheForkReservation>({
    restaurantId: '',
    widgetUrl: '',
    minPartySize: 1,
    maxPartySize: 10,
    advanceBookingDays: 30,
    timeSlots: ['12:00', '12:30', '13:00', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00']
  });

  // État pour les réseaux sociaux
  const [socialConfig, setSocialConfig] = useState<SocialMediaConfig[]>([
    {
      platform: 'instagram',
      url: '',
      displayReviews: false,
      reviewsCount: 0,
      averageRating: 0
    },
    {
      platform: 'facebook',
      url: '',
      displayReviews: true,
      reviewsCount: 45,
      averageRating: 4.7
    },
    {
      platform: 'tripadvisor',
      url: '',
      displayReviews: true,
      reviewsCount: 128,
      averageRating: 4.5
    }
  ]);

  // État pour GPS
  const [gpsConfig, setGpsConfig] = useState<GPSIntegration>({
    address: '123 Rue de la Paix, 75001 Paris',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    googleMapsUrl: '',
    wazeUrl: '',
    appleMapsUrl: ''
  });

  const [phoneNumbers] = useState([
    { type: 'principal', number: '+33 1 42 00 00 00', label: 'Numéro principal' },
    { type: 'livraison', number: '+33 1 42 00 00 01', label: 'Commandes & Livraisons' },
    { type: 'reservation', number: '+33 1 42 00 00 02', label: 'Réservations' }
  ]);

  const tabs = [
    { id: 'gps', name: 'GPS & Cartes', icon: MapPin },
    { id: 'phone', name: 'Téléphone', icon: Phone },
    { id: 'thefork', name: 'TheFork', icon: Calendar },
    { id: 'social', name: 'Réseaux Sociaux', icon: MessageCircle }
  ] as const;

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
          <div className="bg-gradient-to-r from-blue-900 to-purple-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Intégrations Externes</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex h-[80vh]">
            {/* Sidebar avec onglets */}
            <div className="w-64 bg-gray-50 border-r border-gray-200">
              <div className="p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-800 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {activeTab === 'gps' && <GPSTab config={gpsConfig} onChange={setGpsConfig} />}
                {activeTab === 'phone' && <PhoneTab numbers={phoneNumbers} />}
                {activeTab === 'thefork' && <TheForkTab config={theForkConfig} onChange={setTheForkConfig} />}
                {activeTab === 'social' && <SocialTab config={socialConfig} onChange={setSocialConfig} />}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Onglet GPS et Cartes
const GPSTab: React.FC<{
  config: GPSIntegration;
  onChange: (config: GPSIntegration) => void;
}> = ({ config, onChange }) => {
  const generateMapsUrls = () => {
    const encoded = encodeURIComponent(config.address);
    
    onChange({
      ...config,
      googleMapsUrl: `https://maps.google.com/maps?q=${encoded}`,
      wazeUrl: `https://waze.com/ul?q=${encoded}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encoded}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <MapPin className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Configuration GPS & Cartes</h3>
      </div>

      {/* Adresse */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse complète
        </label>
        <input
          type="text"
          value={config.address}
          onChange={(e) => onChange({ ...config, address: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="123 Rue de la Paix, 75001 Paris"
        />
      </div>

      {/* Coordonnées */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitude
          </label>
          <input
            type="number"
            step="0.0001"
            value={config.coordinates.lat}
            onChange={(e) => onChange({
              ...config,
              coordinates: { ...config.coordinates, lat: parseFloat(e.target.value) || 0 }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitude
          </label>
          <input
            type="number"
            step="0.0001"
            value={config.coordinates.lng}
            onChange={(e) => onChange({
              ...config,
              coordinates: { ...config.coordinates, lng: parseFloat(e.target.value) || 0 }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={generateMapsUrls}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Générer les liens de cartes
      </button>

      {/* URLs générées */}
      {config.googleMapsUrl && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900">Liens générés :</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <Map className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Google Maps</span>
              </div>
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Waze</span>
              </div>
              <a
                href={config.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <Map className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Apple Maps</span>
              </div>
              <a
                href={config.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Onglet Téléphone
const PhoneTab: React.FC<{
  numbers: Array<{ type: string; number: string; label: string }>;
}> = ({ numbers }) => {
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});

  const testPhoneNumber = (_number: string, type: string) => {
    // Simulation de test de numéro
    setTimeout(() => {
      setTestResults(prev => ({ ...prev, [type]: true }));
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Phone className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-bold text-gray-900">Configuration Téléphone</h3>
      </div>

      <div className="space-y-4">
        {numbers.map((phone) => (
          <div key={phone.type} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{phone.label}</h4>
                <p className="text-gray-600">{phone.number}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                {testResults[phone.type] && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Testé</span>
                  </div>
                )}
                
                <button
                  onClick={() => testPhoneNumber(phone.number, phone.type)}
                  className="px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
                >
                  Tester
                </button>
                
                <a
                  href={`tel:${phone.number}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Appeler
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guide d'intégration */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Guide d'intégration</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Les liens téléphone utilisent le protocole tel:</li>
          <li>• Compatible avec tous les appareils mobiles</li>
          <li>• Fonctionne avec les applications de téléphone par défaut</li>
          <li>• Intégration automatique dans les boutons de contact</li>
        </ul>
      </div>
    </div>
  );
};

// Onglet TheFork
const TheForkTab: React.FC<{
  config: TheForkReservation;
  onChange: (config: TheForkReservation) => void;
}> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Calendar className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-900">Intégration TheFork</h3>
      </div>

      {/* Configuration TheFork */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Restaurant TheFork
          </label>
          <input
            type="text"
            value={config.restaurantId}
            onChange={(e) => onChange({ ...config, restaurantId: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Ex: 123456"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL du Widget
          </label>
          <input
            type="url"
            value={config.widgetUrl}
            onChange={(e) => onChange({ ...config, widgetUrl: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="https://module.lafourchette.com/..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taille min. groupe
            </label>
            <input
              type="number"
              min="1"
              value={config.minPartySize}
              onChange={(e) => onChange({ ...config, minPartySize: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taille max. groupe
            </label>
            <input
              type="number"
              min="1"
              value={config.maxPartySize}
              onChange={(e) => onChange({ ...config, maxPartySize: parseInt(e.target.value) || 10 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Prévisualisation */}
      {config.widgetUrl && (
        <div className="p-4 bg-orange-50 rounded-lg">
          <h4 className="font-medium text-orange-900 mb-2">Prévisualisation</h4>
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h5 className="font-medium text-gray-900">Réserver une table</h5>
              <p className="text-sm text-gray-600 mb-3">Via TheFork</p>
              <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Onglet Réseaux Sociaux
const SocialTab: React.FC<{
  config: SocialMediaConfig[];
  onChange: (config: SocialMediaConfig[]) => void;
}> = ({ config, onChange }) => {
  const updatePlatform = (index: number, updates: Partial<SocialMediaConfig>) => {
    const newConfig = [...config];
    newConfig[index] = { ...newConfig[index], ...updates };
    onChange(newConfig);
  };

  const getPlatformIcon = (platform: SocialMediaConfig['platform']) => {
    const icons = {
      instagram: Instagram,
      facebook: Facebook,
      tripadvisor: Star,
      yelp: Star
    };
    return icons[platform];
  };

  const getPlatformColor = (platform: SocialMediaConfig['platform']) => {
    const colors = {
      instagram: 'pink',
      facebook: 'blue',
      tripadvisor: 'green',
      yelp: 'red'
    };
    return colors[platform];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <MessageCircle className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-900">Réseaux Sociaux</h3>
      </div>

      <div className="space-y-6">
        {config.map((platform, index) => {
          const Icon = getPlatformIcon(platform.platform);
          const color = getPlatformColor(platform.platform);
          
          return (
            <div key={platform.platform} className="p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Icon className={`w-6 h-6 text-${color}-600`} />
                <h4 className="text-lg font-medium text-gray-900 capitalize">
                  {platform.platform}
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de la page
                  </label>
                  <input
                    type="url"
                    value={platform.url}
                    onChange={(e) => updatePlatform(index, { url: e.target.value })}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${color}-500 focus:border-transparent`}
                    placeholder={`https://${platform.platform}.com/otomosushi`}
                  />
                </div>

                {platform.platform !== 'instagram' && (
                  <>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={platform.displayReviews}
                        onChange={(e) => updatePlatform(index, { displayReviews: e.target.checked })}
                        className={`w-4 h-4 text-${color}-600 rounded focus:ring-${color}-500`}
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Afficher les avis
                      </label>
                    </div>

                    {platform.displayReviews && (
                      <div className="grid grid-cols-2 gap-4 pl-7">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre d'avis
                          </label>
                          <input
                            type="number"
                            value={platform.reviewsCount}
                            onChange={(e) => updatePlatform(index, { reviewsCount: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Note moyenne
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={platform.averageRating}
                            onChange={(e) => updatePlatform(index, { averageRating: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Prévisualisation */}
              {platform.url && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 text-${color}-600`} />
                      <span className="font-medium text-gray-900 capitalize">
                        {platform.platform}
                      </span>
                      {platform.displayReviews && platform.averageRating > 0 && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">{platform.averageRating}</span>
                          <span className="text-sm text-gray-500">({platform.reviewsCount})</span>
                        </div>
                      )}
                    </div>
                    
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-1 bg-${color}-600 hover:bg-${color}-700 text-white text-sm rounded-lg transition-colors`}
                    >
                      Voir la page
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExternalIntegrations;
