/// <reference types="vite/client" />

/**
 * Environment Variables Type Definitions
 * 
 * These types define the shape of environment variables available in the application.
 * The actual values will be provided by:
 * - Local development: .env file
 * - Production (Netlify): Netlify environment variables
 * 
 * Note: Only variables prefixed with VITE_ are exposed to the client-side code.
 * This is a security feature of Vite to prevent accidental exposure of sensitive variables.
 */

interface ImportMetaEnv {
  /**
   * The URL of the chatbot API
   * Set in Netlify as: VITE_API_URL
   * Example: https://two00rx-io-chatbot.onrender.com
   */
  readonly VITE_API_URL: string

  /**
   * The API key for authentication
   * Set in Netlify as: VITE_API_KEY
   * Note: This is exposed to the client, so it should be a public API key
   * with limited permissions
   */
  readonly VITE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 
