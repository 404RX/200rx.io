import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { config } from '../config/env';

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

// Add request signing
const signRequest = async (request: InternalAxiosRequestConfig) => {
  const timestamp = Date.now();
  const nonce = generateNonce();
  const message = `${timestamp}${nonce}${JSON.stringify(request.data || '')}`;
  const signature = await generateSignature(message, config.apiKey);

  request.headers = {
    ...request.headers,
    'X-Timestamp': timestamp.toString(),
    'X-Nonce': nonce,
    'X-Signature': signature,
    'X-API-Key': config.apiKey,
  };

  return request;
};

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(signRequest);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error('API key validation failed');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
