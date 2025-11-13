// useData.ts

import { useState, useEffect, useCallback } from 'react';

// Define a generic type for the data your function returns
interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * A custom hook to fetch data using an async function and manage its state.
 * * @param dataFetcher An async function that returns the data (e.g., a function from lib/services).
 * @param dependencies Dependencies array, similar to useEffect (refetch when dependencies change).
 * @returns An object containing data, isLoading, and error state.
 */
export function useData<T>(
  dataFetcher: () => Promise<T>,
  dependencies: React.DependencyList = []
): FetchState<T> {
  
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  // Memoize the fetch function to ensure it doesn't change on every render
  const fetchData = useCallback(async () => {
    setState(prevState => ({ ...prevState, isLoading: true, error: null }));
    try {
      const result = await dataFetcher();
      setState({ data: result, isLoading: false, error: null });
    } catch (err) {
      // Ensure the error is treated as an Error object
      const error = err instanceof Error ? err : new Error("An unknown error occurred during data fetch.");
      setState({ data: null, isLoading: false, error: error });
      console.error("Data fetching error:", error);
    }
  }, [dataFetcher]); // dataFetcher is the only dependency here

  // useEffect runs the fetching logic when component mounts or dependencies change
  useEffect(() => {
    fetchData();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, ...dependencies]); 
  // dependencies are added here to trigger a refetch when external values change

  return state;
}

// --- Example of how this hook would be used in a component (for reference) ---
/*
import { useData } from '@/lib/hooks/useData';
import { getMarketData } from '@/lib/services/market';

interface MarketData {
  price: number;
  volume: number;
}

export default function MarketPriceDisplay() {
  const { data, isLoading, error } = useData<MarketData[]>(getMarketData, []);

  if (isLoading) {
    return <div>Loading real-time market data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.map((item, index) => (
        <p key={index}>Price: ${item.price}</p>
      ))}
    </div>
  );
}
*/