// CropHealthCard.tsx

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { analyzeCropImage } from '@/lib/services/health'; 
import type { CropHealthResult } from '@/lib/types';

export function CropHealthCard() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CropHealthResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      setError(null);
    } else {
      setFile(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select an image to analyze.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null); // Clear previous results
    
    try {
      // The analyzeCropImage service calls the /api/crop-health route
      const analysisResult = await analyzeCropImage(file);
      setResult(analysisResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred during analysis.";
      setError(`Analysis failed: ${errorMessage}`);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Crop Health Analyzer</h3>
      
      <div className="flex flex-col gap-4">
        {/* File Input */}
        <input 
          type="file" 
          accept="image/jpeg,image/png"
          onChange={handleFileChange} 
          disabled={isLoading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />

        {/* Status and Button */}
        <p className="text-sm text-gray-600">
          {file 
            ? `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` 
            : 'Upload a clear image of your crop leaf for immediate diagnosis.'
          }
        </p>
        
        <Button onClick={handleAnalyze} disabled={!file || isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze Crop Health'}
        </Button>
      </div>

      {/* Results Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-semibold">Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="font-bold text-lg text-green-800 mb-2">
            Diagnosis: <span className="text-gray-900">{result.disease}</span>
          </p>
          <p className="text-sm text-gray-700">
            Confidence: **{(result.confidence * 100).toFixed(1)}%**
          </p>
          <p className="text-sm text-gray-700 mt-2">
            **Recommendation:** {result.recommendation}
          </p>
        </div>
      )}
    </Card>
  );
}