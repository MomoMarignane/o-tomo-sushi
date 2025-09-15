import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { restaurantInfo } from '../data/menu';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-max section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div>
            <h3 className="font-display text-2xl font-bold text-primary-400 mb-4">
              Ô TOMO Sushi
            </h3>
            <p className="text-gray-300 mb-4">
              {restaurantInfo.description}
            </p>
            <div className="flex space-x-4">
              <a 
                href={restaurantInfo.social.facebook}
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={restaurantInfo.social.instagram}
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {restaurantInfo.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300 text-sm">
                  {restaurantInfo.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300 text-sm">
                  {restaurantInfo.email}
                </span>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Horaires</h4>
            <div className="space-y-2">
              {Object.entries(restaurantInfo.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="text-gray-300">{day}</span>
                  <span className={hours === 'Fermé' ? 'text-red-400' : 'text-white'}>
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Paiement */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Moyens de paiement</h4>
            <div className="space-y-2">
              {restaurantInfo.paymentMethods.map((method, index) => (
                <div key={index} className="text-gray-300 text-sm">
                  {method}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h5 className="font-medium mb-2">Click & Collect</h5>
              <p className="text-gray-400 text-sm">
                Commandez en ligne et récupérez sur place
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Ô TOMO Sushi. Tous droits réservés. | 
            <span className="ml-2">Développé avec ❤️ pour l'authenticité japonaise</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
