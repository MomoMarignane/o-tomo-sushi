import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { restaurantInfo } from '../data/menu';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-wood-pattern text-wood-50 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(75, 46, 14, 0.9) 0%, rgba(123, 74, 3, 0.8) 50%, rgba(168, 107, 45, 0.9) 100%),
          url('https://www.transparenttextures.com/patterns/wood-pattern.png')
        `,
        backgroundBlendMode: 'multiply',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e7c9a9' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Top Border */}
      <div className="h-2 bg-gradient-to-r from-warm-500 via-warm-600 to-warm-500" />

      <div className="relative container-max section-padding py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Restaurant Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="font-display text-3xl font-bold bg-gradient-to-r from-warm-200 to-warm-100 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                Ô TOMO Sushi
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-warm-400 to-warm-500 rounded-full mb-4 shadow-warm"></div>
            </div>
            <p className="text-warm-100 leading-relaxed mb-6 text-sm">
              {restaurantInfo.description}
            </p>
            <div className="flex space-x-4">
              <a 
                href={restaurantInfo.social.facebook}
                className="group flex items-center justify-center w-10 h-10 bg-wood-700/80 hover:bg-blue-600 transition-all duration-300 rounded-full border border-wood-600 hover:border-blue-500 shadow-wood"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-warm-200 group-hover:text-white transition-colors" />
              </a>
              <a 
                href={restaurantInfo.social.instagram}
                className="group flex items-center justify-center w-10 h-10 bg-wood-700/80 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 rounded-full border border-wood-600 hover:border-purple-500 shadow-wood"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-warm-200 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg text-warm-100 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {['Accueil', 'Menu', 'À Propos', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-warm-200 hover:text-warm-100 transition-all duration-300 text-sm group flex items-center"
                  >
                    <span className="w-2 h-2 bg-warm-500 rounded-full mr-3 opacity-50 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg text-warm-100 mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-warm-400 mt-1 mr-3 flex-shrink-0" />
                <div className="text-warm-200 text-sm leading-relaxed">
                  <div className="font-medium text-warm-100">{restaurantInfo.address}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-warm-400 mr-3" />
                <a 
                  href={`tel:${restaurantInfo.phone}`}
                  className="text-warm-200 hover:text-warm-100 transition-colors text-sm"
                >
                  {restaurantInfo.phone}
                </a>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-warm-400 mr-3" />
                <a 
                  href={`mailto:${restaurantInfo.email}`}
                  className="text-warm-200 hover:text-warm-100 transition-colors text-sm"
                >
                  {restaurantInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-display font-bold text-lg text-warm-100 mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-warm-400" />
              Horaires
            </h4>
            <div className="space-y-3">
              {Object.entries(restaurantInfo.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center text-sm">
                  <span className="text-warm-200 font-medium">{day}</span>
                  <span className={`font-mono px-2 py-1 rounded border text-xs ${
                    hours === 'Fermé' 
                      ? 'text-red-300 bg-red-900/30 border-red-700' 
                      : 'text-warm-100 bg-wood-700/50 border-wood-600'
                  }`}>
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="border-t border-wood-600 mt-16 pt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-wood-700/30 rounded-lg border border-wood-600 shadow-wood">
              <h5 className="font-display font-bold text-warm-100 mb-3 flex items-center">
                <div className="w-3 h-3 bg-warm-500 rounded-full mr-3"></div>
                Click & Collect
              </h5>
              <p className="text-warm-200 text-sm leading-relaxed">
                Commandez en ligne et récupérez sur place dans une ambiance chaleureuse
              </p>
            </div>
            
            <div className="p-6 bg-wood-700/30 rounded-lg border border-wood-600 shadow-wood">
              <h5 className="font-display font-bold text-warm-100 mb-3">Moyens de paiement</h5>
              <div className="grid grid-cols-2 gap-2">
                {restaurantInfo.paymentMethods.map((method, index) => (
                  <div key={index} className="text-warm-200 text-sm flex items-center">
                    <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-2"></div>
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-wood-600 mt-12 pt-12">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-display text-xl font-bold text-warm-100 mb-4">
              Newsletter
            </h4>
            <p className="text-warm-200 text-sm mb-6">
              Recevez nos dernières nouvelles et offres spéciales
            </p>
            <div className="flex bg-wood-700/50 rounded-full border border-wood-600 p-1 shadow-wood">
              <input
                type="email"
                placeholder="Votre email..."
                className="flex-1 bg-transparent text-warm-100 placeholder-warm-300 px-4 py-2 text-sm focus:outline-none"
              />
              <button className="btn-primary px-6 py-2 text-sm font-medium rounded-full">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-wood-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-warm-200">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 Ô TOMO Sushi. Tous droits réservés.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-warm-100 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-warm-100 transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-warm-500 via-warm-600 to-warm-500" />
    </footer>
  );
};

export default Footer;
