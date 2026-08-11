import React from 'react';
import narcyLogoJpg from '../assets/images/narcy_logo.jpg';

interface NarcyDevLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  lightMode?: boolean;
  variant?: 'full_image' | 'icon_and_text';
}

export const NarcyDevLogo: React.FC<NarcyDevLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  lightMode = false,
  variant = 'icon_and_text'
}) => {
  const containerHeights = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  const imageHeights = {
    sm: 'h-8',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14'
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  if (variant === 'full_image') {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={narcyLogoJpg}
          alt="NARCY DEV Logo Official"
          className={`${imageHeights[size]} w-auto object-contain rounded-lg shadow-sm border border-slate-100 bg-white group-hover:scale-105 transition-transform duration-200`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Official NARCY DEV JPG Logo Image Badge */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-white p-0.5 shadow-sm border border-slate-200/90 overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}
      >
        <img
          src={narcyLogoJpg}
          alt="NARCY DEV Emblem"
          className="w-full h-full object-cover rounded-lg"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <span
          className={`${titleSizes[size]} font-black tracking-tight font-sans uppercase flex items-center ${
            lightMode ? 'text-white' : 'text-[#0D47A1]'
          }`}
        >
          <span className={lightMode ? 'text-white' : 'text-[#0D47A1]'}>NARCY</span>
          <span className="text-[#0284C7] ml-1.5">DEV</span>
        </span>
        {showSubtitle && (
          <span
            className={`text-[10px] font-mono tracking-wider uppercase -mt-0.5 ${
              lightMode ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Studio Software & Mobile
          </span>
        )}
      </div>
    </div>
  );
};

