// src/lib/services/health.ts

import { apiFetch } from '@/lib/api';
import type { CropHealthResult } from '@/lib/types';

/**
 * Uploads a crop image to the backend for disease detection via ML model.
 * It targets the /api/crop-health Next.js API Route.
 * * @param imageFile - The File object uploaded by the user.
 * @returns A promise that resolves to the analysis result.
 */
export async function analyzeCropImage(imageFile: File): Promise<CropHealthResult> {
  console.log('Client sending crop image for health analysis...');
  
  // 1. Create FormData payload
  const formData = new FormData();
  formData.append('image', imageFile);

  // 2. Call apiFetch
  const result = await apiFetch<CropHealthResult>('/crop-health', {
    method: 'POST',
    // Important: When body is a FormData object, we MUST OMIT the 'Content-Type' 
    // header from the options. The browser will automatically set it to 
    // 'multipart/form-data' with the correct boundary.
    // If headers were included, they would override this automatic behavior.
    body: formData,
  });

  return result;
}