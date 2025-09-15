import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Info bar */}
      <div className="bg-neutral-900 text-white py-2">
        <div className="container-max section-padding">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Saint-Maximin-la-Sainte-Baume</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>04 94 XX XX XX</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Mar-Dim: 18h30-22h30</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-max section-padding py-4">
        <div className="flex justify-between items-center">
          <div className="font-display text-2xl font-bold text-primary-600">
            Ô TOMO Sushi
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="text-neutral-700 hover:text-primary-600 transition-colors">
              Accueil
            </a>
            <a href="#menu" className="text-neutral-700 hover:text-primary-600 transition-colors">
              Menu
            </a>
            <a href="#restaurant" className="text-neutral-700 hover:text-primary-600 transition-colors">
              Restaurant
            </a>
            <a href="#contact" className="text-neutral-700 hover:text-primary-600 transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <button className="btn-secondary">
              Réserver
            </button>
            <button className="btn-primary">
              Commander
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
