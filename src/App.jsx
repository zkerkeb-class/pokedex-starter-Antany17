import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/screens/home';
import Pokemon from './assets/screens/pokemon'
import Login from './assets/screens/login'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/pokemon/:id" element={<Pokemon />} />
            </Routes>
        </Router>
    );
}

export default App;