import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { pokemonsList } from './assets/pokemons.js';

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
  // TODO: Implémenter la logique pour ajouter aux favoris
  res.json({ message: 'Pokémon ajouté aux favoris' });
});

// Route pour supprimer un Pokémon des favoris
app.delete('/api/favorites/:pokemonId', authenticateToken, (req, res) => {
  const { pokemonId } = req.params;
  // TODO: Implémenter la logique pour supprimer des favoris
  res.json({ message: 'Pokémon supprimé des favoris' });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
}); 