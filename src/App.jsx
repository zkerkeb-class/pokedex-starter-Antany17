/**
 * App.jsx - Composant principal de l'application
 * Gère le routage et la navigation entre les différentes pages
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/screens/home';
import Pokemon from './assets/screens/pokemon'
import Login from './assets/screens/login'
import Register from './assets/screens/register'
import Favorites from './pages/favorites'
import Compare from './assets/screens/compare/compare'

function App() {
    return (
        // Router principal de l'application
        <Router>
            {/* Configuration des routes */}
            <Routes>
                {/* Route par défaut - Page de connexion */}
                <Route path="/" element={<Login />} />
                
                {/* Page d'accueil - Liste des pokémons */}
                <Route path="/home" element={<Home />} />
                
                {/* Page de détail d'un pokémon */}
                <Route path="/pokemon/:id" element={<Pokemon />} />
                
                {/* Page des favoris */}
                <Route path="/favorites" element={<Favorites />} />
                
                {/* Page d'inscription */}
                <Route path="/register" element={<Register />} />
                
                {/* Page de comparaison de pokémons */}
                <Route path="/compare" element={<Compare />} />
            </Routes>
        </Router>
    );
}

export default App;