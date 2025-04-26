/**
 * PokemonController.js - Contrôleur pour gérer les opérations liées aux Pokémon
 */

import axios from 'axios';
import { API_URL } from '../config';

class PokemonController {
    /**
     * Récupère tous les Pokémon
     * @returns {Promise<Array>} Liste des Pokémon
     */
    static async getAllPokemons() {
        try {
            const response = await axios.get(`${API_URL}/pokemons`);
            return response.data.pokemons;
        } catch (error) {
            console.error('Erreur lors de la récupération des Pokémon:', error);
            throw error;
        }
    }

    /**
     * Récupère un Pokémon par son ID
     * @param {string} id - ID du Pokémon
     * @returns {Promise<Object>} Données du Pokémon
     */
    static async getPokemonById(id) {
        try {
            const response = await axios.get(`${API_URL}/pokemons/${id}`);
            return response.data.pokemon;
        } catch (error) {
            console.error('Erreur lors de la récupération du Pokémon:', error);
            throw error;
        }
    }

    /**
     * Met à jour un Pokémon
     * @param {string} id - ID du Pokémon
     * @param {Object} pokemonData - Nouvelles données du Pokémon
     * @returns {Promise<Object>} Pokémon mis à jour
     */
    static async updatePokemon(id, pokemonData) {
        try {
            const response = await axios.put(`${API_URL}/pokemons/${id}`, pokemonData);
            return response.data.pokemon;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du Pokémon:', error);
            throw error;
        }
    }

    /**
     * Supprime un Pokémon
     * @param {string} id - ID du Pokémon
     * @returns {Promise<void>}
     */
    static async deletePokemon(id) {
        try {
            await axios.delete(`${API_URL}/pokemons/${id}`);
        } catch (error) {
            console.error('Erreur lors de la suppression du Pokémon:', error);
            throw error;
        }
    }
}

export default PokemonController; 