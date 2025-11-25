'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/common/Button';
import type { CropHealthResult } from '@/lib/types';
import { UploadCloud, Camera, CheckCircle, AlertTriangle, Loader, Leaf } from 'lucide-react';

export function CropHealthCard() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CropHealthResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setResult(null);
      setError(null);
    }
  };

  // ⭐⭐⭐ REAL MODEL BACKEND CALL (ONLY THIS PART CHANGED)
  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select an image to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/health/classify", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      setResult({
        disease: data.disease,
        confidence: data.confidence,
        recommendation: data.recommendation
      });
    } catch (err) {
      setError("Failed to analyze image");
    }

    setIsLoading(false);
  };

  return (
    <div
      className="w-full max-w-2xl mx-auto p-6 rounded-2xl backdrop-blur-lg shadow-lg transition-all duration-300"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(203, 177, 138, 0.4)',
        boxShadow: '0 6px 24px 0 rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.1)',
      }}
    >
      <h3 className="text-2xl font-bold mb-4 text-[#4C7C4C] flex items-center">
        <Leaf className="w-5 h-5 mr-2 text-[#8B5E3C]" /> Upload or Capture Image
      </h3>

      {/* Upload Container */}
      <label
        htmlFor="crop-image-upload"
        className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-all cursor-pointer 
          ${file ? 'border-[#4C7C4C]/60 bg-[#F7FAF5]/50' : 'border-[#CBB18A]/70 hover:border-[#4C7C4C]/90 hover:bg-[#F7FAF5]/40'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        style={{ backdropFilter: 'blur(4px)' }}
      >
        {previewUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg opacity-30"
            style={{ backgroundImage: `url(${previewUrl})` }}
          />
        )}

        <div className="z-10 text-center">
          <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${file ? 'text-[#4C7C4C]' : 'text-[#8B5E3C]'}`} />
          <p className="text-lg font-semibold text-[#5B4636]">
            {file ? file.name : 'Click or Drag & Drop Image Here'}
          </p>
          <p className="text-sm text-[#7D6A58]">
            {file ? `Size: ${(file.size / 1024 / 1024).toFixed(2)} MB` : 'JPEG or PNG under 2MB recommended'}
          </p>
        </div>

        <input
          id="crop-image-upload"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          disabled={isLoading}
          className="sr-only"
        />
      </label>

      {/* Camera Button */}
      <div className="mt-3 flex justify-center">
        <label
          htmlFor="crop-camera-upload"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8B5E3C] hover:bg-[#734B31] text-white font-semibold cursor-pointer transition"
        >
          <Camera className="w-5 h-5" />
          Open Camera
        </label>

        <input
          id="crop-camera-upload"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Analyze Button */}
      <Button
        onClick={handleAnalyze}
        disabled={!file || isLoading}
        className="mt-4 w-full py-2.5 text-lg bg-[#4C7C4C] hover:bg-[#3B623B] text-white font-semibold rounded-lg transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader className="w-5 h-5 mr-2 animate-spin" /> Analyzing...
          </span>
        ) : (
          'Analyze Crop Health'
        )}
      </Button>

      {/* Results */}
      {(error || result || isLoading) && (
        <div className="mt-6 border-t border-[#E2D4BA]/50 pt-4">
          <h4 className="text-xl font-semibold mb-3 text-[#5B4636]">Analysis Summary</h4>

          {/* Error */}
          {error && (
            <div
              className="p-3 rounded-md flex items-start shadow-sm backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(200,80,75,0.2)', borderLeft: '4px solid #C8504B' }}
            >
              <AlertTriangle className="w-5 h-5 mt-1 mr-2 text-[#C8504B]" />
              <div className="text-[#9A3734]">
                <p className="font-bold">Analysis Failed</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Loading */}
          {isLoading && !error && (
            <div
              className="p-3 rounded-md flex items-center shadow-sm backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(255,247,224,0.4)', borderLeft: '4px solid #CBB18A' }}
            >
              <Loader className="w-5 h-5 mr-2 animate-spin text-[#8B5E3C]" />
              <p className="font-semibold text-[#7D6A58]">Processing image with AI model...</p>
            </div>
          )}

          {/* Success Result */}
          {result && !isLoading && (
            <div
              className="p-4 rounded-xl shadow-md backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(242,249,242,0.4)',
                border: '1px solid rgba(161,195,152,0.3)',
              }}
            >
              <p className="font-bold text-xl text-[#4C7C4C] mb-2 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-[#8B5E3C]" /> Diagnosis Complete
              </p>

              <div className="space-y-2">
                <div className="border-b pb-1 border-[#D6C7A1]/50">
                  <p className="text-sm font-medium text-[#7D6A58]">Probable Disease</p>
                  <p className="text-lg font-bold text-[#3B623B] mt-1">{result.disease}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-[#7D6A58]">Confidence Score</p>
                  <span className="text-lg font-bold text-[#4C7C4C]">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#7D6A58] mb-1">Recommended Solution</p>
                  <blockquote
                    className="mt-1 p-2 border-l-4 border-[#CBB18A] text-[#4A3B2E] italic rounded-r-md backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(255,249,237,0.4)' }}
                  >
                    {result.recommendation}
                  </blockquote>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
