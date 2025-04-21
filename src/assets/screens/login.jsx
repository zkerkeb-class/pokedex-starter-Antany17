import { useState } from 'react'
import axios from 'axios'
import './login.css'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        console.log("Requête envoyée :", { username, password });

        try {
            // Appel à l'API de login
            const response = await axios.post('http://localhost:3000/api/login', {
                username,
                password
            })

            // Stockage du token
            const token = response.data.token
            localStorage.setItem('token', token)

            // Configuration d'axios pour les requêtes futures
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            // Récupération du profil
            const profileResponse = await axios.get('http://localhost:3000/api/profile')
            localStorage.setItem('user', JSON.stringify(profileResponse.data.user))

            // Redirection vers la page d'accueil
            window.location.href = '/home'
        } catch (err) {
            setError(err.response?.data?.message || "Une erreur est survenue")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Connexion</h1>
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
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login 