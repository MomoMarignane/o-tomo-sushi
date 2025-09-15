import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';

// Types
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  allergens?: string[];
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  pickupTime: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed';
  createdAt: string;
}

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Stockage en mémoire (pour le MVP)
let orders: Order[] = [];
let reservations: Reservation[] = [];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Commandes
app.post('/api/orders', (req, res) => {
  try {
    const { items, customerInfo, pickupTime } = req.body;

    // Validation basique
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items requis' });
    }

    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return res.status(400).json({ error: 'Informations client requises' });
    }

    if (!pickupTime) {
      return res.status(400).json({ error: 'Heure de récupération requise' });
    }

    const total = items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);

    const order: Order = {
      id: uuidv4(),
      items,
      total,
      customerInfo,
      pickupTime,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    orders.push(order);

    res.status(201).json({
      success: true,
      order: {
        id: order.id,
        total: order.total,
        status: order.status,
        pickupTime: order.pickupTime
      }
    });
  } catch (error) {
    console.error('Erreur création commande:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Commande non trouvée' });
  }
  res.json(order);
});

// Réservations
app.post('/api/reservations', (req, res) => {
  try {
    const { name, email, phone, date, time, guests, message } = req.body;

    // Validation basique
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: 'Toutes les informations sont requises' });
    }

    const reservation: Reservation = {
      id: uuidv4(),
      name,
      email,
      phone,
      date,
      time,
      guests: parseInt(guests),
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    reservations.push(reservation);

    res.status(201).json({
      success: true,
      reservation: {
        id: reservation.id,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
        status: reservation.status
      }
    });
  } catch (error) {
    console.error('Erreur création réservation:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/reservations/:id', (req, res) => {
  const reservation = reservations.find(r => r.id === req.params.id);
  if (!reservation) {
    return res.status(404).json({ error: 'Réservation non trouvée' });
  }
  res.json(reservation);
});

// Gestion des erreurs
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erreur:', error);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🍣 Serveur Ô TOMO démarré sur le port ${PORT}`);
  console.log(`📡 API disponible sur http://localhost:${PORT}/api`);
});

export default app;
