import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 font-display uppercase tracking-wider font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed clip-path-slant";
  
  const variants = {
    primary: "bg-track-gold text-track-green hover:bg-track-goldHover",
    secondary: "bg-track-surface border border-track-gold/30 text-track-light hover:border-track-gold",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-track-gold hover:text-track-goldHover bg-transparent"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-track-surface border border-white/5 p-6 shadow-xl ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-track-gold' }) => (
  <span className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-track-green ${color}`}>
    {children}
  </span>
);
