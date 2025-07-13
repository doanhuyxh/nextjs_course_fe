'use client';
import React, { useState } from 'react';


interface EditTextProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  disabled?: boolean;
  required?: boolean;
  className?: string;
  leftImage?: {
    src: string;
    width: number;
    height: number;
  };
  rightImage?: {
    src: string;
    width: number;
    height: number;
  };
  variant?: 'default' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

const EditText: React.FC<EditTextProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  placeholder = '',
  value,
  onChange,
  type = 'text',
  disabled = false,
  required = false,
  className = '',
  leftImage,
  rightImage,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const variants = {
    default: 'bg-white border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500',
    gradient: 'bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] text-white placeholder-white/70 border-0 focus:ring-purple-500'
  };

  const sizes = {
    sm: 'px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm',
    md: 'px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base',
    lg: 'px-4 py-2.5 text-base sm:px-5 sm:py-3 sm:text-lg'
  };

  return (
    <div className={`relative w-full ${className}`}>
      {leftImage && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img 
            src={leftImage.src} 
            alt="" 
            width={leftImage.width}
            height={leftImage.height}
            className="text-gray-400"
          />
        </div>
      )}
      
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full
          rounded-lg sm:rounded-xl
          transition-all
          duration-200
          ease-in-out
          focus:outline-none
          focus:ring-2
          focus:ring-opacity-50
          ${variants[variant]}
          ${sizes[size]}
          ${leftImage ? 'pl-10 sm:pl-12' : ''}
          ${rightImage ? 'pr-10 sm:pr-12' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          font-medium
          min-h-[44px] sm:min-h-[48px]
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      />
      
      {rightImage && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <img 
            src={rightImage.src} 
            alt="" 
            width={rightImage.width}
            height={rightImage.height}
            className="text-gray-400"
          />
        </div>
      )}
    </div>
  );
};

export default EditText;