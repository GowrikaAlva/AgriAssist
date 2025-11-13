// utils.ts

/**
 * Creates a simple delay for mocking network latency in development.
 * @param ms - The number of milliseconds to wait.
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Simple function to format a raw number as currency (example utility).
 * @param amount - The numerical amount.
 * @returns A currency-formatted string (e.g., "$1,234.00").
 */
export function formatCurrency(amount: number): string {
  // Assuming Indian Rupees, as you are located in Dharwad
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
}

/**
 * Formats a timestamp into a readable date string.
 * @param timestamp - The input timestamp (number or Date object).
 * @returns A short, readable date string.
 */
export function formatDate(timestamp: number | Date): string {
    const date = typeof timestamp === 'number' ? new Date(timestamp) : timestamp;
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}