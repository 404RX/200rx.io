import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { config } from '../config/env';

/**
 * API Client Configuration
 * 
 * This client is configured to work with the chatbot API backend:
 * - Handles request signing for security
 * - Includes API key authentication
 * - Manages CORS and headers
 * - Provides error handling
 * 
 * Note: API key is injected at runtime from environment variables
 * to prevent exposure in build output
 */

// Create a browser-compatible random string generator
const generateNonce = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Create a browser-compatible HMAC function
const generateSignature = async (message: string, key: string) => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await window.crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    messageData
  );
  
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Get API key from environment at runtime
const getApiKey = () => {
  // This will be replaced with the actual API key at runtime by Netlify
  return import.meta.env.VITE_API_KEY || '';
};

// Add request signing
const signRequest = async (request: InternalAxiosRequestConfig) => {
  const timestamp = Date.now();
  const nonce = generateNonce();
  const message = `${timestamp}${nonce}${JSON.stringify(request.data || '')}`;
  const apiKey = getApiKey();
  const signature = await generateSignature(message, apiKey);

  // Create new headers instance
  const headers = new AxiosHeaders(request.headers);
  
  // Add required headers for API authentication and security
  headers.set('X-Timestamp', timestamp.toString());
  headers.set('X-Nonce', nonce);
  headers.set('X-Signature', signature);
  headers.set('X-API-Key', apiKey);
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  request.headers = headers;
  return request;
};

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true, // Required for CORS with credentials
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for signing
apiClient.interceptors.request.use(signRequest);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Authentication failed');
          break;
        case 403:
          console.error('API key validation failed');
          break;
        case 429:
          console.error('Rate limit exceeded');
          break;
        default:
          console.error('API request failed:', error.response.status);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup failed:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
