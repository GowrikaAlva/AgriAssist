// api.ts

// The base URL for your main backend API (e.g., your Node.js/Firebase functions endpoint)
// Note: External APIs like OpenWeatherMap should be called separately in their respective services,
// or routed through a Next.js API route to hide the key.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';

/**
 * A centralized function to make authenticated and standardized API calls.
 * @param endpoint - The path relative to the base URL (e.g., '/market/data').
 * @param options - Standard fetch options (method, headers, body, etc.).
 * @returns A promise that resolves to the parsed JSON response.
 */
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 1. Get Authentication Token (if using JWT/Bearer)
  // const token = localStorage.getItem('authToken');
  
  // 2. Set Default Headers (e.g., Content-Type, Authorization)
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // 3. Handle Non-2xx Status Codes
    if (!response.ok) {
      // Attempt to parse the error message from the response body
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: response.statusText };
      }
      
      // Throw a structured error
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
    }

    // 4. Return the parsed JSON data
    // Check for 204 No Content before trying to parse JSON
    if (response.status === 204) {
      return null as T;
    }

    return response.json() as Promise<T>;

  } catch (error) {
    // 5. Log and re-throw network errors or parsing issues
    console.error(`API Fetch failed for ${url}:`, error);
    throw error;
  }
}