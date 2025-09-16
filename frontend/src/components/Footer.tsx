import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Heart } from 'lucide-react';
import { restaurantInfo } from '../data/menu';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-600" />

      <div className="relative container-max section-padding py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Restaurant Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="font-display text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-3">
                Ô TOMO Sushi
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-4"></div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              {restaurantInfo.description}
            </p>
            <div className="flex space-x-4">
              <a 
                href={restaurantInfo.social.facebook}
                className="group flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-blue-600 transition-all duration-300 rounded-full border border-gray-700 hover:border-blue-500"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href={restaurantInfo.social.instagram}
                className="group flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 rounded-full border border-gray-700 hover:border-purple-500"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-xl mb-6 text-gray-100 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-red-400" />
              Contact
            </h4>
            <div className="space-y-4">
              <div className="group flex items-start space-x-3 p-3 rounded-lg transition-colors hover:bg-gray-800/50">
                <MapPin className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {restaurantInfo.address}
                  </p>
                </div>
              </div>
              <div className="group flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-gray-800/50">
                <Phone className="w-5 h-5 text-red-400" />
                <a 
                  href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`}
                  className="text-gray-300 text-sm hover:text-red-400 transition-colors font-medium"
                >
                  {restaurantInfo.phone}
                </a>
              </div>
              <div className="group flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-gray-800/50">
                <Mail className="w-5 h-5 text-red-400" />
                <a 
                  href={`mailto:${restaurantInfo.email}`}
                  className="text-gray-300 text-sm hover:text-red-400 transition-colors"
                >
                  {restaurantInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="font-semibold text-xl mb-6 text-gray-100 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-400" />
              Horaires d'ouverture
            </h4>
            <div className="space-y-3">
              {Object.entries(restaurantInfo.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
                  <span className="text-gray-300 text-sm font-medium">{day}</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    hours === 'Fermé' 
                      ? 'text-red-400 bg-red-400/10' 
                      : 'text-green-400 bg-green-400/10'
                  }`}>
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-xl mb-6 text-gray-100">Nos Services</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20">
                <h5 className="font-medium text-red-400 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                  Click & Collect
                </h5>
                <p className="text-gray-400 text-sm">
                  Commandez en ligne et récupérez sur place
                </p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-gray-200 mb-3">Moyens de paiement</h5>
                <div className="grid grid-cols-2 gap-2">
                  {restaurantInfo.paymentMethods.map((method, index) => (
                    <div key={index} className="text-gray-400 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Ô TOMO Sushi. Tous droits réservés.
            </p>
            <div className="flex items-center text-gray-400 text-sm">
              <span>Développé avec</span>
              <Heart className="w-4 h-4 mx-1 text-red-400 fill-current" />
              <span>pour l'authenticité japonaise</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
