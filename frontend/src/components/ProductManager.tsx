import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Search,
  Eye,
  EyeOff,
  Clock,
  Tag,
  AlertCircle,
  Camera
} from 'lucide-react';
import type { MenuItem, ProductOption, Allergen, Category } from '../types';

interface ProductManagerProps {
  userRole: 'admin' | 'manager' | 'staff';
}

const ProductManager: React.FC<ProductManagerProps> = ({ userRole }) => {
  const [products, setProducts] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Sashimi de saumon',
      description: 'Sashimi de saumon frais du jour, coupé finement',
      price: 8.50,
      category: 'sashimi',
      image: '/api/placeholder/300/200',
      available: true,
      preparationTime: 5,
      kitchenName: 'Sashimi saumon',
      barName: 'Sashimi saumon',
      allergens: ['fish'],
      options: [
        {
          id: 'opt1',
          name: 'Portion',
          type: 'radio',
          required: true,
          choices: [
            { id: 'normal', name: 'Normal (6 pièces)', price: 0 },
            { id: 'large', name: 'Grande (9 pièces)', price: 3.50 }
          ]
        },
        {
          id: 'opt2',
          name: 'Accompagnements',
          type: 'checkbox',
          required: false,
          choices: [
            { id: 'wasabi', name: 'Wasabi extra', price: 0.50 },
            { id: 'ginger', name: 'Gingembre mariné', price: 0.50 }
          ]
        }
      ]
    }
  ]);

  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnavailable, setShowUnavailable] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: Category[] = [
    { id: 'all', name: 'Toutes les catégories', description: 'Toutes les catégories', color: '#6B7280' },
    { id: 'sashimi', name: 'Sashimi', description: 'Poissons crus tranchés', color: '#EF4444' },
    { id: 'maki', name: 'Maki', description: 'Rouleaux d\'algue', color: '#F59E0B' },
    { id: 'california', name: 'California', description: 'Maki inversés', color: '#10B981' },
    { id: 'chirashi', name: 'Chirashi', description: 'Bol de riz au poisson', color: '#8B5CF6' },
    { id: 'tempura', name: 'Tempura', description: 'Fritures japonaises', color: '#F97316' },
    { id: 'boissons', name: 'Boissons', description: 'Boissons chaudes et froides', color: '#06B6D4' },
    { id: 'desserts', name: 'Desserts', description: 'Desserts japonais', color: '#EC4899' }
  ];

  const allergens: Allergen[] = [
    { id: 'fish', name: 'Poisson', icon: '🐟' },
    { id: 'shellfish', name: 'Fruits de mer', icon: '🦐' },
    { id: 'eggs', name: 'Œufs', icon: '🥚' },
    { id: 'soy', name: 'Soja', icon: '🌱' },
    { id: 'gluten', name: 'Gluten', icon: '🌾' },
    { id: 'sesame', name: 'Sésame', icon: '⚪' },
    { id: 'nuts', name: 'Fruits à coque', icon: '🥜' }
  ];

  // Filtrage des produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesAvailability = showUnavailable || product.available;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleCreateProduct = () => {
    const newProduct: MenuItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      category: 'sashimi',
      image: '',
      available: true,
      preparationTime: 5,
      kitchenName: '',
      barName: '',
      allergens: [],
      options: []
    };
    setEditingProduct(newProduct);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: MenuItem) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;

    if (products.find(p => p.id === editingProduct.id)) {
      // Mise à jour
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      ));
    } else {
      // Création
      setProducts(prev => [...prev, editingProduct]);
    }

    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleToggleAvailability = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, available: !p.available } : p
    ));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editingProduct) {
      // Simuler l'upload d'image
      const imageUrl = URL.createObjectURL(file);
      setEditingProduct(prev => prev ? { ...prev, image: imageUrl } : null);
    }
  };

  const addOption = () => {
    if (!editingProduct) return;
    
    const newOption: ProductOption = {
      id: Date.now().toString(),
      name: '',
      type: 'radio',
      required: false,
      choices: []
    };

    setEditingProduct(prev => prev ? {
      ...prev,
      options: [...(prev.options || []), newOption]
    } : null);
  };

  const removeOption = (optionId: string) => {
    if (!editingProduct) return;
    
    setEditingProduct(prev => prev ? {
      ...prev,
      options: prev.options?.filter(opt => opt.id !== optionId) || []
    } : null);
  };

  const addChoice = (optionId: string) => {
    if (!editingProduct) return;
    
    setEditingProduct(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        options: prev.options?.map(opt => 
          opt.id === optionId 
            ? {
                ...opt,
                choices: [...opt.choices, {
                  id: Date.now().toString(),
                  name: '',
                  price: 0
                }]
              }
            : opt
        ) || []
      };
    });
  };

  const canEdit = userRole === 'admin' || userRole === 'manager';

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des produits</h2>
          <p className="text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} 
            {selectedCategory !== 'all' && ` dans ${categories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>
        
        {canEdit && (
          <motion.button
            onClick={handleCreateProduct}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            <span>Nouveau produit</span>
          </motion.button>
        )}
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowUnavailable(!showUnavailable)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                showUnavailable
                  ? 'bg-gray-100 border-gray-300 text-gray-700'
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {showUnavailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="text-sm">Indisponibles</span>
            </button>
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-300 hover:shadow-md ${
                product.available 
                  ? 'border-gray-200 hover:border-red-200' 
                  : 'border-gray-300 opacity-60'
              }`}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={product.image || '/api/placeholder/300/200'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                
                {!product.available && (
                  <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                    <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded-full">
                      Indisponible
                    </span>
                  </div>
                )}

                {product.options && product.options.length > 0 && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      +{product.options.length} option{product.options.length > 1 ? 's' : ''}
                    </div>
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                  <span className="text-red-600 font-bold text-lg ml-2">{product.price.toFixed(2)}€</span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                {/* Métadonnées */}
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{product.preparationTime}min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span className="capitalize">{product.category}</span>
                  </div>
                </div>

                {/* Allergènes */}
                {product.allergens && product.allergens.length > 0 && (
                  <div className="flex items-center gap-1 mb-3">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <div className="flex gap-1">
                      {product.allergens.map(allergenId => {
                        const allergen = allergens.find(a => a.id === allergenId);
                        return allergen ? (
                          <span key={allergenId} className="text-xs" title={allergen.name}>
                            {allergen.icon}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {canEdit && (
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleToggleAvailability(product.id)}
                      className={`text-xs px-2 py-1 rounded-full transition-colors ${
                        product.available
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {product.available ? 'Disponible' : 'Indisponible'}
                    </button>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal d'édition */}
      <AnimatePresence>
        {isModalOpen && editingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={(e: React.MouseEvent) => e.target === e.currentTarget && setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {products.find(p => p.id === editingProduct.id) ? 'Modifier le produit' : 'Nouveau produit'}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Colonne gauche - Informations de base */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du produit *
                      </label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct(prev => prev ? { ...prev, name: e.target.value } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Ex: Sashimi de saumon"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct(prev => prev ? { ...prev, description: e.target.value } : null)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Description du produit..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prix (€) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Temps de préparation (min)
                        </label>
                        <input
                          type="number"
                          value={editingProduct.preparationTime}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, preparationTime: parseInt(e.target.value) || 5 } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie
                      </label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct(prev => prev ? { ...prev, category: e.target.value } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        {categories.filter(c => c.id !== 'all').map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image du produit
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        {editingProduct.image ? (
                          <div className="relative">
                            <img
                              src={editingProduct.image}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => setEditingProduct(prev => prev ? { ...prev, image: '' } : null)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="flex flex-col items-center justify-center py-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <Camera className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">Cliquer pour ajouter une image</span>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Allergènes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Allergènes
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {allergens.map(allergen => (
                          <label key={allergen.id} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingProduct.allergens?.includes(allergen.id) || false}
                              onChange={(e) => {
                                setEditingProduct(prev => {
                                  if (!prev) return null;
                                  const allergens = prev.allergens || [];
                                  if (e.target.checked) {
                                    return { ...prev, allergens: [...allergens, allergen.id] };
                                  } else {
                                    return { ...prev, allergens: allergens.filter(a => a !== allergen.id) };
                                  }
                                });
                              }}
                              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm flex items-center gap-1">
                              <span>{allergen.icon}</span>
                              <span>{allergen.name}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Colonne droite - Options et compléments */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Options et compléments</h3>
                      <button
                        onClick={addOption}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Ajouter une option</span>
                      </button>
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {editingProduct.options?.map((option, optionIndex) => (
                        <div key={option.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <input
                              type="text"
                              value={option.name}
                              onChange={(e) => setEditingProduct(prev => {
                                if (!prev) return null;
                                return {
                                  ...prev,
                                  options: prev.options?.map((opt, idx) => 
                                    idx === optionIndex ? { ...opt, name: e.target.value } : opt
                                  ) || []
                                };
                              })}
                              placeholder="Nom de l'option"
                              className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                            />
                            <button
                              onClick={() => removeOption(option.id)}
                              className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex gap-4 mb-3">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`type-${option.id}`}
                                checked={option.type === 'radio'}
                                onChange={() => setEditingProduct(prev => {
                                  if (!prev) return null;
                                  return {
                                    ...prev,
                                    options: prev.options?.map((opt, idx) => 
                                      idx === optionIndex ? { ...opt, type: 'radio' } : opt
                                    ) || []
                                  };
                                })}
                                className="text-red-600 focus:ring-red-500"
                              />
                              <span className="text-sm">Choix unique</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`type-${option.id}`}
                                checked={option.type === 'checkbox'}
                                onChange={() => setEditingProduct(prev => {
                                  if (!prev) return null;
                                  return {
                                    ...prev,
                                    options: prev.options?.map((opt, idx) => 
                                      idx === optionIndex ? { ...opt, type: 'checkbox' } : opt
                                    ) || []
                                  };
                                })}
                                className="text-red-600 focus:ring-red-500"
                              />
                              <span className="text-sm">Choix multiple</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={option.required}
                                onChange={(e) => setEditingProduct(prev => {
                                  if (!prev) return null;
                                  return {
                                    ...prev,
                                    options: prev.options?.map((opt, idx) => 
                                      idx === optionIndex ? { ...opt, required: e.target.checked } : opt
                                    ) || []
                                  };
                                })}
                                className="text-red-600 focus:ring-red-500"
                              />
                              <span className="text-sm">Obligatoire</span>
                            </label>
                          </div>

                          <div className="space-y-2">
                            {option.choices.map((choice, choiceIndex) => (
                              <div key={choice.id} className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  value={choice.name}
                                  onChange={(e) => setEditingProduct(prev => {
                                    if (!prev) return null;
                                    return {
                                      ...prev,
                                      options: prev.options?.map((opt, optIdx) => 
                                        optIdx === optionIndex ? {
                                          ...opt,
                                          choices: opt.choices.map((ch, chIdx) => 
                                            chIdx === choiceIndex ? { ...ch, name: e.target.value } : ch
                                          )
                                        } : opt
                                      ) || []
                                    };
                                  })}
                                  placeholder="Nom du choix"
                                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500"
                                />
                                <input
                                  type="number"
                                  step="0.01"
                                  value={choice.price}
                                  onChange={(e) => setEditingProduct(prev => {
                                    if (!prev) return null;
                                    return {
                                      ...prev,
                                      options: prev.options?.map((opt, optIdx) => 
                                        optIdx === optionIndex ? {
                                          ...opt,
                                          choices: opt.choices.map((ch, chIdx) => 
                                            chIdx === choiceIndex ? { ...ch, price: parseFloat(e.target.value) || 0 } : ch
                                          )
                                        } : opt
                                      ) || []
                                    };
                                  })}
                                  placeholder="0.00"
                                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500"
                                />
                                <span className="text-xs text-gray-500">€</span>
                                <button
                                  onClick={() => setEditingProduct(prev => {
                                    if (!prev) return null;
                                    return {
                                      ...prev,
                                      options: prev.options?.map((opt, optIdx) => 
                                        optIdx === optionIndex ? {
                                          ...opt,
                                          choices: opt.choices.filter((_, chIdx) => chIdx !== choiceIndex)
                                        } : opt
                                      ) || []
                                    };
                                  })}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addChoice(option.id)}
                              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Ajouter un choix</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <motion.button
                    onClick={handleSaveProduct}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!editingProduct.name || !editingProduct.price}
                  >
                    <Save className="w-4 h-4" />
                    <span>Enregistrer</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductManager;
