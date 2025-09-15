import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Lock } from 'lucide-react';
import type { AdminUser } from '../types';

interface AdminLoginProps {
  onLogin: (user: AdminUser) => void;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Utilisateurs de démonstration
  const demoUsers: AdminUser[] = [
    {
      id: '1',
      username: 'admin',
      role: 'admin',
      permissions: ['manage_products', 'manage_orders', 'manage_customers', 'manage_settings', 'view_analytics', 'manage_users']
    },
    {
      id: '2',
      username: 'manager',
      role: 'manager',
      permissions: ['manage_products', 'manage_orders', 'view_analytics']
    },
    {
      id: '3',
      username: 'staff',
      role: 'staff',
      permissions: ['view_analytics']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'authentification
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Vérification des credentials
    const user = demoUsers.find(u => u.username === credentials.username);
    
    if (user && credentials.password === 'otomo2024') {
      onLogin(user);
    } else {
      setError('Identifiants incorrects');
    }
    
    setIsLoading(false);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Shield className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Administration Ô TOMO</h2>
          <p className="text-gray-600">Accès réservé au personnel autorisé</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all pr-12"
                placeholder="Entrez votre mot de passe"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Se connecter</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Comptes de démonstration :</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div><strong>admin</strong> / otomo2024 (accès complet)</div>
            <div><strong>manager</strong> / otomo2024 (gestion limitée)</div>
            <div><strong>staff</strong> / otomo2024 (consultation uniquement)</div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm transition-colors"
        >
          Annuler
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;
