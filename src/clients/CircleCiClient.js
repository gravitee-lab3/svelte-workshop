// Implementations for all the calls for the pokemon endpoints.
import CircleCiApi from "../services/CircleCiApi";

// Method to get a list of all Pokemon
export const getPokemonList = async () => {
    try {
      const response = await CircleCiApi.get("/pokemon?limit=500");
      return response.results;
    } catch (error) {
      console.error(error);
    }
};

// Get a pokemon details by name
export const getPokemonByName = async(name) => {
    try {
      const response = await CircleCiApi.get(`/pokemon/${name}`);
      return response;
    } catch (error) {
      console.error(error);
    }
};
