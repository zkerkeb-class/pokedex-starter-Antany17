import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { pokemonsList } from './assets/pokemons.js';
import { users } from './assets/users.js';
import { Pokemon } from './models/pokemon.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Middleware pour vérifier le token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, 'votre_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

// Route pour récupérer tous les Pokémon
app.get('/api/pokemons', (req, res) => {
  res.json({ pokemons: pokemonsList });
});

// Route pour récupérer les Pokémon favoris
app.get('/api/pokemons/favorites', authenticateToken, (req, res) => {
  // Pour l'instant, on retourne une liste vide
  // TODO: Implémenter la logique pour récupérer les favoris de l'utilisateur
  res.json({ pokemons: [] });
});

// Route pour ajouter un Pokémon aux favoris
app.post('/api/favorites', authenticateToken, (req, res) => {
  const { pokemonId } = req.body;
  const userId = req.user.id;

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  // Vérifier si le Pokémon existe
  Pokemon.findById(pokemonId).then(pokemon => {
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon non trouvé' });
    }

    if (!user.favorites.includes(pokemonId)) {
      user.favorites.push(pokemonId);
    }

    res.json({ message: 'Pokémon ajouté aux favoris', favorites: user.favorites });
  }).catch(error => {
    res.status(400).json({ message: 'Erreur lors de l\'ajout aux favoris', error: error.message });
  });
});

// Route pour supprimer un Pokémon des favoris
app.delete('/api/favorites/:pokemonId', authenticateToken, (req, res) => {
  const { pokemonId } = req.params;
  const userId = req.user.id;

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  user.favorites = user.favorites.filter(id => id !== pokemonId);
  res.json({ message: 'Pokémon retiré des favoris', favorites: user.favorites });
});

// Route pour obtenir les Pokémon favoris
app.get('/api/favorites', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  // Récupérer les détails des Pokémon favoris
  Pokemon.find({ _id: { $in: user.favorites } }).then(pokemons => {
    res.json({ 
      favorites: user.favorites,
      pokemons: pokemons
    });
  }).catch(error => {
    res.status(400).json({ message: 'Erreur lors de la récupération des favoris', error: error.message });
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
}); 