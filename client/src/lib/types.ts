// types.ts

// --- Data Types for Weather & Crop Prediction ---

/** Defines the structure for location input (e.g., for weather API). */
export interface LocationInput {
  latitude: number;
  longitude: number;
}

/** Defines the structure for current weather forecast data. */
export interface ForecastData {
  temp: number; // Temperature in Celsius
  rainfall_mm: number; // Rainfall prediction
  humidity: number;
  condition: string; // e.g., "Partly Cloudy"
}

/** Defines the output structure from the ML Crop Prediction service. */
export interface CropRecommendation {
  best_crop: string;
  suitability_score: number; // Score from 0 to 1
  reason: string; // Justification for the recommendation
}

// --- Data Types for Market Price Tracker ---

/** Defines the structure for a single commodity's market price. */
export interface MarketPrice {
  commodity: string;
  price_per_quintal: number;
  date: string;
  location: string;
}

/** Defines the input required for the profit calculation. */
export interface ProfitInput {
  area_acres: number;
  expected_yield_kg: number;
  cost_per_acre: number;
}

/** Defines the output structure for the calculated profit. */
export interface ProfitResult {
  expected_profit: number;
  total_revenue: number;
  total_cost: number;
}

// --- Data Types for AI Chatbot ---

/** Defines the sender of a chat message. */
export type ChatSender = 'user' | 'ai';

/** Defines the structure of a single message in the chatbot interface. */
export interface ChatMessage {
  id: string; // Unique message ID
  sender: ChatSender;
  text: string;
  timestamp: number;
}

// 🐛 --- Data Types for Crop Health Analyzer (NEWLY ADDED) --- 🐛

/** Defines the structure for the ML prediction result for crop health. */
export interface CropHealthResult {
  disease: string;
  confidence: number; // The model's confidence score (0 to 1)
  recommendation: string;
}

/** Defines the structure for a chat session. */
export interface ChatSession {
  id: string; // Unique session ID
  title: string; // Auto-generated title from first message
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

/** Defines the structure for user authentication state. */
export interface User {
  id: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
}
