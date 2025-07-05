/**
 * Environment Configuration
 * 
 * These values are read from environment variables at runtime.
 * For local development, create a .env file with these variables.
 * For production (Netlify), these values will be read from Netlify's environment variables.
 * 
 * Required Netlify Environment Variables:
 * - VITE_API_URL: The URL of the chatbot API (e.g., https://two00rx-io-chatbot.onrender.com)
 * - VITE_API_KEY: Your API key for authentication (injected at runtime)
 * 
 * To set up in Netlify:
 * 1. Go to Site settings > Build & deploy > Environment
 * 2. Add the environment variables under "Environment variables"
 * 3. Redeploy your site after adding the variables
 * 
 * Note: The API key is handled separately in the API client to prevent
 * exposure in the build output.
 */

export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
} as const;
