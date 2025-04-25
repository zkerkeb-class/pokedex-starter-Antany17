import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/screens/home';
import Pokemon from './assets/screens/pokemon'
import Login from './assets/screens/login'
import Register from './assets/screens/register'
import Favorites from './pages/favorites'
import Compare from './assets/screens/compare'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/pokemon/:id" element={<Pokemon />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/register" element={<Register />} />
                <Route path="/compare" element={<Compare />} />
            </Routes>
        </Router>
    );
}

export default App;