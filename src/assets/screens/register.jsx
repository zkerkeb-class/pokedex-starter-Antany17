import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css'

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            // Appel à l'API d'inscription
            await axios.post('http://localhost:3000/api/register', {
                username,
                password
            })

            // Redirection vers la page de connexion après inscription réussie
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Créer un compte</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                    </button>
                    <div className="register-link">
                        <p>Déjà un compte ?</p>
                        <button onClick={() => navigate('/login')}>Se connecter</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register 