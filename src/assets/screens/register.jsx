/**
 * Register.jsx - Page d'inscription
 * Permet aux utilisateurs de créer un nouveau compte
 */

import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css'

const Register = () => {
    // États pour gérer le formulaire et l'interface
    const [username, setUsername] = useState("")        // Nom d'utilisateur
    const [password, setPassword] = useState("")        // Mot de passe
    const [error, setError] = useState("")             // Message d'erreur
    const [loading, setLoading] = useState(false)      // État de chargement
    const navigate = useNavigate()

    /**
     * Gère la soumission du formulaire d'inscription
     * @param {Event} e - Événement de soumission du formulaire
     */
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
            navigate('/')
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

                    {/* Bouton d'inscription */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                    </button>

                    {/* Lien vers la page de connexion */}
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