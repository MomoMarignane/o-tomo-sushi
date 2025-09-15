import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  User, 
  MapPin,
  ChefHat,
  MessageSquare,
  Upload,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

interface ContactFormsProps {
  isOpen: boolean;
  onClose: () => void;
}

// Types pour les formulaires
interface CVApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  availability: string;
  cv: File | null;
  motivation: string;
}

interface CateringRequest {
  eventType: string;
  eventDate: string;
  guestCount: number;
  budget: string;
  contactName: string;
  email: string;
  phone: string;
  specialRequests: string;
  dietaryRestrictions: string[];
  venue: string;
}

interface Suggestion {
  type: 'dish' | 'service' | 'ambiance' | 'other';
  subject: string;
  message: string;
  contactName: string;
  email: string;
  rating: number;
}

const ContactForms: React.FC<ContactFormsProps> = ({ isOpen, onClose }) => {
  const [activeForm, setActiveForm] = useState<'cv' | 'catering' | 'suggestion'>('cv');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // États des formulaires
  const [cvForm, setCvForm] = useState<CVApplication>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    availability: '',
    cv: null,
    motivation: ''
  });

  const [cateringForm, setCateringForm] = useState<CateringRequest>({
    eventType: '',
    eventDate: '',
    guestCount: 0,
    budget: '',
    contactName: '',
    email: '',
    phone: '',
    specialRequests: '',
    dietaryRestrictions: [],
    venue: ''
  });

  const [suggestionForm, setSuggestionForm] = useState<Suggestion>({
    type: 'dish',
    subject: '',
    message: '',
    contactName: '',
    email: '',
    rating: 5
  });

  const forms = [
    { id: 'cv', name: 'Candidature CV', icon: User, description: 'Rejoignez notre équipe' },
    { id: 'catering', name: 'Traiteur', icon: ChefHat, description: 'Événements & réceptions' },
    { id: 'suggestion', name: 'Suggestions', icon: MessageSquare, description: 'Votre avis nous intéresse' }
  ] as const;

  const handleSubmit = async (_formType: string) => {
    setSubmitStatus('sending');
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('success');
    setTimeout(() => {
      setSubmitStatus('idle');
      // Reset form here if needed
    }, 3000);
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
          <div className="bg-gradient-to-r from-green-900 to-teal-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Send className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Formulaires de Contact</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex h-[85vh]">
            {/* Sidebar avec types de formulaires */}
            <div className="w-64 bg-gray-50 border-r border-gray-200">
              <div className="p-4 space-y-2">
                {forms.map((form) => {
                  const Icon = form.icon;
                  return (
                    <button
                      key={form.id}
                      onClick={() => setActiveForm(form.id)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        activeForm === form.id
                          ? 'bg-green-100 text-green-800 border-2 border-green-200'
                          : 'text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{form.name}</span>
                      </div>
                      <p className="text-sm text-gray-500">{form.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {activeForm === 'cv' && (
                  <CVForm 
                    form={cvForm} 
                    onChange={setCvForm} 
                    onSubmit={() => handleSubmit('cv')}
                    submitStatus={submitStatus}
                  />
                )}
                {activeForm === 'catering' && (
                  <CateringForm 
                    form={cateringForm} 
                    onChange={setCateringForm} 
                    onSubmit={() => handleSubmit('catering')}
                    submitStatus={submitStatus}
                  />
                )}
                {activeForm === 'suggestion' && (
                  <SuggestionForm 
                    form={suggestionForm} 
                    onChange={setSuggestionForm} 
                    onSubmit={() => handleSubmit('suggestion')}
                    submitStatus={submitStatus}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Formulaire CV
const CVForm: React.FC<{
  form: CVApplication;
  onChange: (form: CVApplication) => void;
  onSubmit: () => void;
  submitStatus: string;
}> = ({ form, onChange, onSubmit, submitStatus }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onChange({ ...form, cv: file });
    }
  };

  const positions = [
    'Chef de cuisine',
    'Sous-chef',
    'Commis de cuisine',
    'Serveur/Serveuse',
    'Chef de rang',
    'Barman/Barmaid',
    'Plongeur',
    'Réceptionniste',
    'Manager',
    'Autre'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <User className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-bold text-gray-900">Candidature Spontanée</h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Informations personnelles */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prénom *
            </label>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={(e) => onChange({ ...form, firstName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom *
            </label>
            <input
              type="text"
              required
              value={form.lastName}
              onChange={(e) => onChange({ ...form, lastName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => onChange({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => onChange({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Informations professionnelles */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poste recherché *
            </label>
            <select
              required
              value={form.position}
              onChange={(e) => onChange({ ...form, position: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Sélectionnez un poste</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expérience (années)
            </label>
            <input
              type="text"
              value={form.experience}
              onChange={(e) => onChange({ ...form, experience: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ex: 3 ans en restauration japonaise"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disponibilité
            </label>
            <input
              type="text"
              value={form.availability}
              onChange={(e) => onChange({ ...form, availability: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ex: Immédiate, à partir du..."
            />
          </div>

          {/* Upload CV */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CV (PDF uniquement)
            </label>
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Choisir un fichier</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              
              {form.cv && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">{form.cv.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lettre de motivation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Lettre de motivation
        </label>
        <textarea
          rows={6}
          value={form.motivation}
          onChange={(e) => onChange({ ...form, motivation: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Présentez-vous et expliquez votre motivation pour rejoindre notre équipe..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          disabled={submitStatus === 'sending'}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
            submitStatus === 'sending'
              ? 'bg-gray-400 cursor-not-allowed'
              : submitStatus === 'success'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-green-600 hover:bg-green-700'
          } text-white`}
        >
          {submitStatus === 'sending' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Envoi en cours...</span>
            </>
          ) : submitStatus === 'success' ? (
            <>
              <Check className="w-4 h-4" />
              <span>Candidature envoyée !</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Envoyer ma candidature</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Formulaire Traiteur
const CateringForm: React.FC<{
  form: CateringRequest;
  onChange: (form: CateringRequest) => void;
  onSubmit: () => void;
  submitStatus: string;
}> = ({ form, onChange, onSubmit, submitStatus }) => {
  const eventTypes = [
    'Mariage',
    'Anniversaire',
    'Événement d\'entreprise',
    'Réception privée',
    'Cocktail',
    'Buffet',
    'Autre'
  ];

  const budgetRanges = [
    'Moins de 500€',
    '500€ - 1000€',
    '1000€ - 2000€',
    '2000€ - 5000€',
    'Plus de 5000€',
    'Sur devis'
  ];

  const dietaryOptions = [
    'Végétarien',
    'Végétalien',
    'Sans gluten',
    'Halal',
    'Kasher',
    'Sans allergènes'
  ];

  const toggleDietaryRestriction = (restriction: string) => {
    const current = form.dietaryRestrictions;
    const updated = current.includes(restriction)
      ? current.filter(r => r !== restriction)
      : [...current, restriction];
    onChange({ ...form, dietaryRestrictions: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <ChefHat className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-900">Demande de Traiteur</h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Détails de l'événement */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Détails de l'événement</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type d'événement *
            </label>
            <select
              required
              value={form.eventType}
              onChange={(e) => onChange({ ...form, eventType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Sélectionnez le type</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de l'événement *
            </label>
            <input
              type="date"
              required
              value={form.eventDate}
              onChange={(e) => onChange({ ...form, eventDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre d'invités *
            </label>
            <input
              type="number"
              required
              min="1"
              value={form.guestCount || ''}
              onChange={(e) => onChange({ ...form, guestCount: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget approximatif
            </label>
            <select
              value={form.budget}
              onChange={(e) => onChange({ ...form, budget: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Sélectionnez une fourchette</option>
              {budgetRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Informations contact */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Vos coordonnées</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              required
              value={form.contactName}
              onChange={(e) => onChange({ ...form, contactName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => onChange({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => onChange({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lieu de l'événement
            </label>
            <input
              type="text"
              value={form.venue}
              onChange={(e) => onChange({ ...form, venue: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Adresse du lieu"
            />
          </div>
        </div>
      </div>

      {/* Restrictions alimentaires */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Restrictions alimentaires
        </label>
        <div className="grid grid-cols-3 gap-3">
          {dietaryOptions.map(option => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.dietaryRestrictions.includes(option)}
                onChange={() => toggleDietaryRestriction(option)}
                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Demandes spéciales */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Demandes spéciales ou commentaires
        </label>
        <textarea
          rows={4}
          value={form.specialRequests}
          onChange={(e) => onChange({ ...form, specialRequests: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Décrivez vos souhaits particuliers, le style de menu désiré, etc."
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          disabled={submitStatus === 'sending'}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
            submitStatus === 'sending'
              ? 'bg-gray-400 cursor-not-allowed'
              : submitStatus === 'success'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-orange-600 hover:bg-orange-700'
          } text-white`}
        >
          {submitStatus === 'sending' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Envoi en cours...</span>
            </>
          ) : submitStatus === 'success' ? (
            <>
              <Check className="w-4 h-4" />
              <span>Demande envoyée !</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Envoyer ma demande</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Formulaire Suggestions
const SuggestionForm: React.FC<{
  form: Suggestion;
  onChange: (form: Suggestion) => void;
  onSubmit: () => void;
  submitStatus: string;
}> = ({ form, onChange, onSubmit, submitStatus }) => {
  const suggestionTypes = [
    { id: 'dish', name: 'Plats & Menu', icon: ChefHat },
    { id: 'service', name: 'Service', icon: User },
    { id: 'ambiance', name: 'Ambiance', icon: MapPin },
    { id: 'other', name: 'Autre', icon: MessageSquare }
  ];

  const StarRating: React.FC<{ rating: number; onChange: (rating: number) => void }> = ({
    rating,
    onChange
  }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-2xl transition-colors ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-400`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <MessageSquare className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-900">Suggestions & Avis</h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Type de suggestion */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Catégorie de votre suggestion *
            </label>
            <div className="space-y-2">
              {suggestionTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label key={type.id} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="suggestionType"
                      value={type.id}
                      checked={form.type === type.id}
                      onChange={(e) => onChange({ ...form, type: e.target.value as Suggestion['type'] })}
                      className="w-4 h-4 text-purple-600"
                    />
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{type.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Note globale */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note globale de votre expérience
            </label>
            <div className="flex items-center space-x-3">
              <StarRating 
                rating={form.rating} 
                onChange={(rating) => onChange({ ...form, rating })} 
              />
              <span className="text-sm text-gray-600">({form.rating}/5)</span>
            </div>
          </div>
        </div>

        {/* Informations contact */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Votre nom (optionnel)
            </label>
            <input
              type="text"
              value={form.contactName}
              onChange={(e) => onChange({ ...form, contactName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Pour personnaliser notre réponse"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email (optionnel)
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => onChange({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Si vous souhaitez une réponse"
            />
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">Anonymat respecté</h4>
                <p className="text-sm text-purple-700 mt-1">
                  Vos coordonnées ne seront utilisées que pour vous répondre si vous le souhaitez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sujet et message */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sujet de votre suggestion *
          </label>
          <input
            type="text"
            required
            value={form.subject}
            onChange={(e) => onChange({ ...form, subject: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Résumez votre suggestion en quelques mots"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Votre message *
          </label>
          <textarea
            rows={6}
            required
            value={form.message}
            onChange={(e) => onChange({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Décrivez votre suggestion, votre expérience, ou ce que vous aimeriez voir améliorer..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          disabled={submitStatus === 'sending'}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
            submitStatus === 'sending'
              ? 'bg-gray-400 cursor-not-allowed'
              : submitStatus === 'success'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white`}
        >
          {submitStatus === 'sending' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Envoi en cours...</span>
            </>
          ) : submitStatus === 'success' ? (
            <>
              <Check className="w-4 h-4" />
              <span>Suggestion envoyée !</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Envoyer ma suggestion</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ContactForms;
