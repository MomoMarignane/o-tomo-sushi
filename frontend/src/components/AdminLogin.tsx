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
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(75, 46, 14, 0.4) 50%, rgba(0, 0, 0, 0.6) 100%),
          url('https://www.transparenttextures.com/patterns/wood-pattern.png')
        `,
        backgroundBlendMode: 'multiply',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="rounded-2xl p-8 max-w-md w-full shadow-wood-2xl border border-wood-300 relative overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(245, 234, 218, 0.95) 0%, rgba(235, 214, 188, 0.9) 50%, rgba(245, 234, 218, 0.95) 100%),
            url('https://www.transparenttextures.com/patterns/wood-pattern.png')
          `,
          backgroundBlendMode: 'multiply',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Background decorative element */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d2691e' fill-opacity='0.2'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Header */}
        <div className="text-center mb-8 relative">
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-wood-700 to-wood-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-wood border border-wood-500"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Shield className="w-8 h-8 text-warm-200" />
          </motion.div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-wood-800 to-wood-700 bg-clip-text text-transparent mb-2 font-display">
            Administration Ô TOMO
          </h2>
          <p className="text-wood-600">Accès réservé au personnel autorisé</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div>
            <label className="block text-sm font-medium text-wood-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-4 py-3 border border-wood-300 rounded-lg bg-wood-50/80 backdrop-blur-sm text-wood-800 placeholder-wood-500 focus:ring-2 focus:ring-warm-500 focus:border-warm-500 transition-all shadow-sm"
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-wood-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-wood-300 rounded-lg bg-wood-50/80 backdrop-blur-sm text-wood-800 placeholder-wood-500 focus:ring-2 focus:ring-warm-500 focus:border-warm-500 transition-all pr-12 shadow-sm"
                placeholder="Entrez votre mot de passe"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-wood-500 hover:text-wood-700 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-100/80 border border-red-300 rounded-lg text-red-700 text-sm backdrop-blur-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-wood-700 to-wood-600 text-warm-50 py-3 rounded-lg font-medium hover:from-wood-800 hover:to-wood-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-wood border border-wood-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-warm-100 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Se connecter</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-wood-100/80 backdrop-blur-sm rounded-lg border border-wood-300 relative">
          <h4 className="text-sm font-medium text-wood-800 mb-2">Comptes de démonstration :</h4>
          <div className="space-y-1 text-xs text-wood-600">
            <div><strong>admin</strong> / otomo2024 (accès complet)</div>
            <div><strong>manager</strong> / otomo2024 (gestion limitée)</div>
            <div><strong>staff</strong> / otomo2024 (consultation uniquement)</div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 w-full text-wood-600 hover:text-wood-800 text-sm transition-colors bg-wood-100/50 py-2 rounded-lg border border-wood-200 hover:border-wood-300"
        >
          Annuler
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;
