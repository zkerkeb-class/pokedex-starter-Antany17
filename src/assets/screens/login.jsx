/**
 * Login.jsx - Page de connexion
 * Gère l'authentification des utilisateurs avec validation des identifiants
 */

import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css'

const Login = () => {
    // États pour gérer le formulaire et l'interface
    const [username, setUsername] = useState("")        // Nom d'utilisateur
    const [password, setPassword] = useState("")        // Mot de passe
    const [error, setError] = useState("")             // Message d'erreur
    const [loading, setLoading] = useState(false)      // État de chargement
    const navigate = useNavigate()

    /**
     * Gère la soumission du formulaire de connexion
     * @param {Event} e - Événement de soumission du formulaire
     */
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
            navigate('/home')
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
                    {/* Champ nom d'utilisateur */}
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

                    {/* Champ mot de passe */}
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

                    {/* Affichage des erreurs */}
                    {error && <div className="error-message">{error}</div>}

                    {/* Bouton de connexion */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>

                    {/* Lien vers la page d'inscription */}
                    <div className="register-link">
                        <p>Pas encore de compte ?</p>
                        <button onClick={() => navigate('/register')}>Créer un compte</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login 