import React from 'react';
import { ChefHat, Star, Clock, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Bienvenue chez <br />
              <span className="text-primary-400">Ô TOMO Sushi</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Découvrez l'authenticité de la cuisine japonaise dans notre Izakaya à 
              Saint-Maximin-la-Sainte-Baume. Des sushi fraîchement préparés aux spécialités 
              chaudes traditionnelles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="btn-primary text-lg px-8 py-4">
                Commander en ligne
              </button>
              <button className="btn-secondary text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
                Réserver une table
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <ChefHat className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Chef expérimenté</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Qualité premium</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Préparation rapide</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Authentique</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl overflow-hidden">
              <img 
                src="/images/hero-sushi.jpg" 
                alt="Plateau de sushi Ô TOMO" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback si l'image n'existe pas
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Fallback content */}
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white">
                  <ChefHat className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Sushi d'exception</p>
                </div>
              </div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="font-bold text-lg">4.8/5</div>
                  <div className="text-sm text-gray-600">Avis clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
