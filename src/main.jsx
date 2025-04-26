/**
 * main.jsx - Point d'entrée de l'application React
 * Initialise l'application et la rend dans le DOM
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Création de la racine de l'application dans l'élément #root
createRoot(document.getElementById('root')).render(
    // Mode strict désactivé pour éviter les avertissements de développement
    // <StrictMode>
        <App />
    // </StrictMode>,
)

