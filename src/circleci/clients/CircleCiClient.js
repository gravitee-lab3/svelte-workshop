// Implementations for all the calls for the pokemon endpoints.
import CircleCiApi from "../services/CircleCiApi";

// Method to get a the authenticated user from Circle CI
export const whoami = async(cci_token) => {
    try {
      console.log(`dans [whoami] on a cci_token = [${cci_token}]`);
      const response = await CircleCiApi.get(`me`, `${cci_token}`);
      return response;
    } catch (error) {
      console.error(error);
    }
};
