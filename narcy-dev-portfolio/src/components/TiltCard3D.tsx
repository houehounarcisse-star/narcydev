import React, { useState, useRef } from 'react';

interface TiltCard3DProps {
  children: React.ReactNode;
  backContent?: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees
  id?: string;
  onClick?: () => void;
  allowFlipOnClick?: boolean;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  backContent,
  className = '',
  maxTilt = 12,
  id,
  onClick,
  allowFlipOnClick = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const percentX = (mouseX / width) * 100;
    const percentY = (mouseY / height) * 100;

    // Calculate rotation (-maxTilt to +maxTilt)
    const rotateY = ((mouseX - width / 2) / (width / 2)) * maxTilt;
    const rotateX = -((mouseY - height / 2) / (height / 2)) * maxTilt;

    setTilt({ rotateX, rotateY, scale: 1.03 });
    setGlarePos({ x: percentX, y: percentY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlarePos({ x: 50, y: 50, opacity: 0 });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
    if (backContent && allowFlipOnClick) {
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}
      className={`transition-all duration-300 ease-out cursor-pointer h-full ${className}`}
    >
      <div
        style={{
          transform: isFlipped
            ? 'rotateY(180deg)'
            : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})`,
          transformStyle: 'preserve-3d',
          transition: isFlipped ? 'transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)' : 'transform 0.3s ease-out'
        }}
        className="relative h-full w-full rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        {/* Front Side */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(1px)'
          }}
          className="h-full w-full rounded-2xl overflow-hidden"
        >
          {children}
        </div>

        {/* Back Side (if provided) */}
        {backContent && (
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)'
            }}
            className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden bg-[#0D47A1] text-white p-6 flex flex-col items-center justify-center text-center shadow-2xl border border-blue-400/40"
          >
            {backContent}
          </div>
        )}

        {/* 3D Cursor Glare Effect */}
        {!isFlipped && (
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
              opacity: glarePos.opacity
            }}
          />
        )}
      </div>
    </div>
  );
};
