import { useState, useEffect } from 'react';
import apiClient from '../lib/api-client';

interface ApiResponse {
  // Define your API response type here
  data: any;
}

export function Example() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get<ApiResponse>('/api/endpoint');
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;
  
  return <div>{/* Render your data */}</div>;
} 