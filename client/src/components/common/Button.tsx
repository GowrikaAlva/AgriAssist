// Button.tsx

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) {
  
  // Base styling for all buttons
  const baseStyle = 'px-4 py-2 rounded-lg font-semibold transition duration-150 ease-in-out shadow-md';
  
  let variantStyle = '';

  switch (variant) {
    case 'primary':
      variantStyle = 'bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-500/50';
      break;
    case 'secondary':
      variantStyle = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-400/50';
      break;
    case 'danger':
      variantStyle = 'bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-500/50';
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}