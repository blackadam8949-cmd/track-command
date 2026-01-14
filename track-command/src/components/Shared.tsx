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
  const baseStyle = "inline-flex items-center justify-center px-5 py-2.5 font-display uppercase tracking-wider font-bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm";
  
  const variants = {
    primary: "bg-track-gold text-track-green hover:bg-white hover:text-track-green shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    secondary: "bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-track-gold/50",
    danger: "bg-red-600/90 text-white hover:bg-red-600",
    ghost: "text-track-gold hover:text-white bg-transparent hover:bg-white/5"
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
  <div className={`bg-track-surface/80 backdrop-blur-md border border-white/5 p-6 rounded-lg shadow-2xl ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-track-gold' }) => (
  <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-track-green rounded-sm ${color}`}>
    {children}
  </span>
);